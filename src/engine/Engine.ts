import {ICar} from './ICar';
import {IData} from './IData';
import {IConfig} from './IConfig';
import {IRadar} from './IRadar';
import * as R from 'ramda';
import * as _ from 'underscore'

let globalId = 1;

export type EngineSubscriber = (data: IData) => void;

export class Engine {
  private config: IConfig;

  private cars: ICar[] = [];

  private radar: IRadar = {
    pos: 0,
    lastSpeed: 0,
    nbCars: 0,
    data: [],
    isRecording: false
  };

  private subscribers: EngineSubscriber[] = [];

  private elapsedTime: number = 0;

  private playTime: number = 0;

  private pauseTime: number = 0;

  private previousTime: number = 0;

  private nextTime: number = 0;

  private trafficLightColor: 'green' | 'red' = 'green';

  private trafficLightGreenElapsedTime: number = 0;

  private trafficLightRedElapsedTime: number = 0;

  private trafficLightState: 'manual' | 'auto' = 'manual';

  private trafficLightGreenAutoTime: number = 10.0;

  private trafficLightRedAutoTime: number = 10.0;

  constructor(config: IConfig) {
    this.config = config;
    this.radar.pos = config.radarInitialPosition;
    this.generateCars();
    setInterval(this.cycle, this.config.refresh);
  }

  public on(subscriber: EngineSubscriber) {
    this.subscribers.push(subscriber);
    this.notifySubscriber(subscriber);
  }

  public un(subscriber: EngineSubscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index >= 0) {
      this.subscribers = this.subscribers.splice(index, 1);
    }
  }

  public zero() {
    this.elapsedTime = 0;
    this.notify();
  }

  public resetRadar() {
    const radar = this.radar
    radar.data = [];
    radar.nbCars = 0;
    radar.lastSpeed = 0;
  }

  public recordRadar() {
    this.radar.isRecording = true;
  }

  public play() {
    if (this.playTime > 0) {
      return;
    }
    this.playTime = Date.now();
    this.pauseTime = 0;
    this.notify();
  }

  public pause() {
    if (this.pauseTime > 0) {
      return;
    }
    this.pauseTime = Date.now();
    this.playTime = 0;
    this.notify();
  }

  public generateCars() {
    globalId = 1;
    this.cars = [];
    let previousCar: ICar;
    for (let pos = this.config.routeLen - 5; pos >= 0; pos -= this.config.addCarDist) {
      previousCar = this.addCar(pos, previousCar);
    }
    this.elapsedTime = 0;
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.trafficLightColor = 'green';
    this.pauseTime = Date.now();
    this.playTime = 0;
    this.notify();
  }

  public green() {
    if (this.trafficLightColor === 'green') {
      return;
    }
    this.trafficLightColor = 'green';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.notify();
  }

  public red() {
    if (this.trafficLightColor === 'red') {
      return;
    }
    this.trafficLightColor = 'red';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.notify();
  }

  public manual() {
    if (this.trafficLightState === 'manual') {
      return;
    }
    this.trafficLightState = 'manual';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.notify();
  }

  public auto() {
    if (this.trafficLightState === 'auto') {
      return;
    }
    this.trafficLightState = 'auto';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.notify();
  }

  public setRadarPosition(x: number) {
    this.radar.pos = Math.round(x);
    this.resetRadar();
    this.notify();
  }

  public setTrafficLightGreenAutoTime(time: number) {
    this.trafficLightGreenAutoTime = time;
    this.notify();
  }

  public setTrafficLightRedAutoTime(time: number) {
    this.trafficLightRedAutoTime = time;
    this.notify();
  }

  private isAuto() {
    return this.trafficLightState === 'auto';
  }

  private cycle = () => {
    this.previousTime = this.nextTime;
    this.nextTime = Date.now();

    if (this.previousTime === 0) {
      return;
    }

    if (this.playTime > 0) {
      const dt = (this.config.timeFactor * (this.nextTime - this.previousTime)) / 1000.0;
      this.elapsedTime += dt;

      // TODO Extract traffic light handling
      if (this.trafficLightColor === 'green') {
        this.trafficLightGreenElapsedTime += dt;
        if (this.isAuto() && this.trafficLightGreenElapsedTime >= this.trafficLightGreenAutoTime) {
          this.red();
        }
      }
      else {
        this.trafficLightRedElapsedTime += dt;
        if (this.isAuto() && this.trafficLightRedElapsedTime >= this.trafficLightRedAutoTime) {
          this.green();
        }
      }

      // Move cars
      _.each(this.cars, (car) => {
        // Distance to red traffic light
        const dRed = (this.trafficLightColor === 'red' && car.pos < this.config.trafficLightPosition) ?
          Math.abs(car.pos - this.config.trafficLightPosition) :
          Infinity


        // Distance to next car
        const dNextCar = car.precedingCar ? Math.abs(car.pos - car.precedingCar.pos) : Infinity

        // Compute distance to next obstacle
        const dObstacle = Math.min(dRed, dNextCar)

        // Compute new speed
        car.speed = this.config.carMaxSpeed * (1 - this.config.carWidth / dObstacle)

        // Move car
        car.pos += car.speed * dt

        // Handle Radar
        if (!car.hasSpeedMeasure && Math.abs(this.radar.pos - car.pos) < this.config.radarSensibility) {
          this.radar.lastSpeed = car.speed;
          this.radar.nbCars++;
          car.hasSpeedMeasure = true;

          if (this.radar.isRecording) {
            this.radar.data.push([this.elapsedTime, car.speed]);
          }
        }
      })

      // Add car ?
      if (this.cars.length === 0) {
        this.addCar(0, undefined);
      }
      else if (this.cars[this.cars.length - 1].pos > this.config.addCarDist) {
        this.addCar(this.cars[this.cars.length - 1].pos - this.config.addCarDist, this.cars[this.cars.length - 1]);
      }

      // Remove old car
      const maxPos = this.config.routeLen + 2 * this.config.carWidth;
      _.map(this.cars, (car) => {
        if (car.pos >= maxPos) car.pos = Infinity
      })
      this.cars = this.cars.filter((car: ICar) => car.pos < maxPos);

      // Notify
      this.notify();
    }
  };

  private addCar(pos: number, precedingCar: ICar) {
    const car = {
      id: globalId++,
      pos,
      speed: this.config.carMaxSpeed,
      hasSpeedMeasure: false,
      precedingCar
    }

    this.cars.push(car);

    return car;
  }

  private notify() {
    for (const subscriber of this.subscribers) {
      this.notifySubscriber(subscriber);
    }
  }

  private notifySubscriber(subscriber: EngineSubscriber) {
    subscriber({
      playing: this.playTime > 0,
      elapsedTime: this.elapsedTime,
      trafficLightColor: this.trafficLightColor,
      trafficLightGreenElapsedTime: this.trafficLightGreenElapsedTime,
      trafficLightRedElapsedTime: this.trafficLightRedElapsedTime,
      trafficLightState: this.trafficLightState,
      cars: this.cars,
      radar: this.radar,
      trafficLightGreenAutoTime: this.trafficLightGreenAutoTime,
      trafficLightRedAutoTime: this.trafficLightRedAutoTime,
    });
  }
}
