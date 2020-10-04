import { ICar } from './ICar';
import { IData } from './IData';
import { IConfig } from './IConfig';
import { IRadar } from './IRadar';
import * as _ from 'underscore';
import { IMeasuringTape } from './IMeasuringTape';

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
    isRecording: false,
  };

  private measuringTape: IMeasuringTape = {
    x1: 200, // TODO ***
    x2: 300, // TODO ***
  };

  private subscribers: EngineSubscriber[] = [];

  private elapsedTime: number = 0;

  private playing: boolean = false;

  private playTime: number = 0;

  private pauseTime: number = 0;

  private lastNotifyTime: number = 0;

  private trafficLightColor: 'green' | 'red' = 'green';

  private trafficLightGreenElapsedTime: number = 0;

  private trafficLightRedElapsedTime: number = 0;

  private trafficLightState: 'manual' | 'auto' = 'manual';

  private trafficLightGreenAutoTime: number = 10.0;

  private trafficLightRedAutoTime: number = 10.0;

  private cycling = false;

  constructor(config: IConfig) {
    this.config = config;
    this.radar.pos = config.radarInitialPosition;
    this.generateCars();
    setInterval(this.cycle, this.config.refresh / 2.25);
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
    const radar = this.radar;
    radar.data = [];
    radar.nbCars = 0;
    radar.lastSpeed = 0;
    this.notify();
  }

  public startRecordingRadar() {
    this.radar.data = [];
    this.radar.isRecording = true;
    this.notify();
  }

  public stopRecordingRadar() {
    this.radar.isRecording = false;
    this.pause();
  }

  public play() {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.playTime = this.elapsedTime;
    this.pauseTime = 0;
    this.computeSpeeds();
    this.notify();
  }

  public pause() {
    if (!this.playing) {
      return;
    }
    this.playing = false;
    this.pauseTime = this.elapsedTime;
    this.playTime = 0;
    this.computeSpeeds();
    this.notify();
  }

  public generateCars() {
    globalId = 1;
    this.cars = [];
    let previousCar: ICar;
    // Condition pour "augmentationBouchon"
    // for (let pos = this.config.trafficLightPosition; pos >= - this.config.addCarDist; pos -= this.config.addCarDist) {
    // Condition pour "detente"
    // for (let pos = this.config.trafficLightPosition; pos >= - this.config.addCarDist; pos -= this.config.carWidth) {
    // Condition standard
    for (let pos = this.config.routeLen; pos >= -this.config.addCarDist; pos -= this.config.addCarDist) {
      previousCar = this.addCar(pos, previousCar);
    }
    this.elapsedTime = 0;
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.trafficLightColor = 'green';
    this.pauseTime = 0;
    this.playTime = 0;
    this.computeSpeeds();
    this.notify();
  }

  public green() {
    if (this.trafficLightColor === 'green') {
      return;
    }
    this.trafficLightColor = 'green';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.computeSpeeds();
    this.notify();
  }

  public red() {
    if (this.trafficLightColor === 'red') {
      return;
    }
    this.trafficLightColor = 'red';
    this.trafficLightGreenElapsedTime = 0;
    this.trafficLightRedElapsedTime = 0;
    this.computeSpeeds();
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
    this.radar.pos = Math.round(x * 10) / 10;
    this.resetRadar();
    this.notify();
  }

  public setMeasuringTapeX1(x1: number) {
    this.measuringTape.x1 = Math.round(x1);
    this.notify();
  }

  public setMeasuringTapeX2(x2: number) {
    this.measuringTape.x2 = Math.round(x2);
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
    if (this.cycling) {
      return;
    }
    try {
      this.cycling = true;
      if (this.playing) {
        const dt = this.config.refresh;
        this.elapsedTime += dt;

        // TODO Extract traffic light handling
        if (this.trafficLightColor === 'green') {
          this.trafficLightGreenElapsedTime += dt;
          if (this.isAuto() && this.trafficLightGreenElapsedTime > this.trafficLightGreenAutoTime * 1000) {
            this.red();
          }
        } else {
          this.trafficLightRedElapsedTime += dt;
          if (this.isAuto() && this.trafficLightRedElapsedTime > this.trafficLightRedAutoTime * 1000) {
            this.green();
          }
        }

        this.moveCars(dt);

        this.computeSpeeds();

        // Add car ?
        if (this.cars.length === 0) {
          this.addCar(0, undefined);
        } else if (this.cars[this.cars.length - 1].pos > -this.config.addCarDist) {
          this.addCar(this.cars[this.cars.length - 1].pos - this.config.addCarDist, this.cars[this.cars.length - 1]);
        }

        // Remove old car
        const maxPos = 2 * this.config.routeLen;
        this.cars = this.cars.filter((car: ICar) => {
          return car.pos <= maxPos;
        });

        /*if (this.elapsedTime >= 40 * 1000) {
          this.pause();
        }*/

        if (this.elapsedTime - this.lastNotifyTime >= this.config.refreshNotify) {
          // Notify
          this.notify();
        }
      }
    } finally {
      this.cycling = false;
    }
  };

  private addCar(pos: number, precedingCar: ICar) {
    const car = {
      id: globalId++,
      pos,
      speed: 0,
      hasSpeedMeasure: false,
      precedingCar,
    };
    car.speed = precedingCar
      ? this.config.carMaxSpeed * (1 - this.config.carWidth / this.computeDistObs(car))
      : this.config.carMaxSpeed;

    this.cars.push(car);

    return car;
  }

  private computeSpeeds() {
    // Update cars speed
    for (const car of this.cars) {
      if (car.pos <= this.config.routeLen) {
        // Compute new speed
        car.speed = this.config.carMaxSpeed * (1 - this.config.carWidth / this.computeDistObs(car));
      }
    }
  }

  private moveCars(dt: number) {
    // Move car
    for (const car of this.cars) {
      car.pos = car.pos + 0.001 * car.speed * dt;

      // Handle Radar
      if (!car.hasSpeedMeasure && Math.abs(this.radar.pos - car.pos) < this.config.radarSensibility) {
        this.radar.lastSpeed = car.speed;
        this.radar.nbCars++;
        car.hasSpeedMeasure = true;

        if (this.radar.isRecording) {
          this.radar.data.push([this.elapsedTime, car.speed]);
        }
      }
    }
  }

  private computeDistObs(car: ICar) {
    // Distance to red traffic light
    const dRed =
      this.trafficLightColor === 'red' && car.pos <= this.config.trafficLightPosition
        ? Math.abs(car.pos - this.config.carWidth - this.config.trafficLightPosition)
        : Infinity;

    // Distance to next car
    let dNextCar = car.precedingCar ? car.precedingCar.pos - car.pos : Infinity;
    if (dNextCar < 0) {
      dNextCar = 0;
    }

    // Compute distance to next obstacle
    return Math.min(dRed, dNextCar);
  }

  private notify() {
    for (const subscriber of this.subscribers) {
      this.notifySubscriber(subscriber);
    }
    this.lastNotifyTime = this.elapsedTime;
  }

  private notifySubscriber(subscriber: EngineSubscriber) {
    subscriber({
      playing: this.playing,
      elapsedTime: this.elapsedTime,
      trafficLightColor: this.trafficLightColor,
      trafficLightGreenElapsedTime: this.trafficLightGreenElapsedTime,
      trafficLightRedElapsedTime: this.trafficLightRedElapsedTime,
      trafficLightState: this.trafficLightState,
      cars: this.cars,
      radar: this.radar,
      trafficLightGreenAutoTime: this.trafficLightGreenAutoTime,
      trafficLightRedAutoTime: this.trafficLightRedAutoTime,
      measuringTape: this.measuringTape,
    });
  }

  public convertPos(x: number) {
    return x - 280;
  }
}
