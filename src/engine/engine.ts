import { ICar } from './ICar';
import { IData } from './IData';
import { IConfig } from './IConfig';

let globalId = 1;

export type EngineSubscriber = (data: IData) => void;

export class Engine {
  private conf: IConfig;

  private cars: ICar[] = [];

  private subscribers: EngineSubscriber[] = [];

  private ellapsedTime: number = 0;

  private startTime: number = 0;

  private stopTime: number = 0;

  private previousTime: number = 0;

  private nextTime: number = 0;

  private lastAddCarTime: number = 0;

  constructor(conf: IConfig) {
    this.conf = conf;
    setInterval(this.cycle, this.conf.refresh);
  }

  public on(subscriber: EngineSubscriber) {
    this.subscribers.push(subscriber);
  }

  public un(subscriber: EngineSubscriber) {
    var index = this.subscribers.indexOf(subscriber);
    if (index >= 0) {
      this.subscribers = this.subscribers.splice(index, 1);
    }
  }

  public start() {
    this.startTime = Date.now();
    const stopDelay = this.stopTime > 0 ? this.startTime - this.stopTime : 0;
    this.lastAddCarTime += stopDelay;
    this.stopTime = 0;
    this.notify();
  }

  public stop() {
    this.stopTime = Date.now();
    this.startTime = 0;
    this.notify();
  }

  private cycle = () => {
    this.previousTime = this.nextTime;
    this.nextTime = Date.now();

    if (this.previousTime === 0) {
      return;
    }

    if (this.lastAddCarTime === 0) {
      this.lastAddCarTime = this.nextTime;
    }

    if (this.startTime > 0) {
      const diffTime = (this.conf.timeFactor * (this.nextTime - this.previousTime)) / 1000.0;

      this.ellapsedTime += diffTime;

      // Move cars
      this.cars.forEach((car: ICar) => (car.pos += car.speed * diffTime));

      // Add car ?
      if (this.conf.timeFactor * (this.nextTime - this.lastAddCarTime) >= this.conf.addCarDelay) {
        this.addCar();
        this.lastAddCarTime = this.nextTime;
      }

      // Remove old car
      this.cars = this.cars.filter(
        (car: ICar) => car.pos < this.conf.windowWidth * this.conf.resolution + this.conf.carWidth
      );

      // Notify
      this.notify();
    }
  };

  private addCar() {
    this.cars.push({
      id: globalId++,
      pos: 0,
      speed: this.conf.carMaxSpeed
    });
  }

  private notify() {
    for (const subscriber of this.subscribers) {
      subscriber({
        started: this.startTime > 0,
        ellapsedTime: this.ellapsedTime,
        cars: this.cars
      });
    }
  }
}
