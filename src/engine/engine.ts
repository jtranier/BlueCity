import { ICar } from './ICar';
import { IData } from './IData';

export type EngineSubscriber = (data: IData) => void;

export interface IEngineProps {
  // Route length in meters;
  len: number;
}

export class Engine {
  private props: IEngineProps;

  private intervalId: number;

  private cars: ICar[] = [];

  private subscribers: EngineSubscriber[] = [];

  private previousTime: number;

  private nextTime: number;

  private lastAddCarTime: number;

  constructor(props: { len: number }) {
    this.props = props;
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

  public start(refresh: number) {
    this.previousTime = 0;
    this.nextTime = 0;
    this.lastAddCarTime = 0;
    this.intervalId = setInterval(this.cycle, refresh);
    this.notify();
  }

  public stop() {
    this.previousTime = 0;
    this.nextTime = 0;
    this.lastAddCarTime = 0;
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
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
    const ellapsed = this.nextTime - this.previousTime;
    // Move cars
    this.cars.forEach((car: ICar) => (car.pos += (car.speed * ellapsed) / 1000));
    // Add car ?
    if (this.nextTime - this.lastAddCarTime >= 2000) {
      this.addCar();
      this.lastAddCarTime = this.nextTime;
    }
    // Remove old car
    this.cars = this.cars.filter((car: ICar) => car.pos < this.props.len);
    this.notify();
  };

  private addCar() {
    this.cars.push({
      pos: 0,
      speed: 60 * 60
    });
  }

  private notify() {
    for (const subscriber of this.subscribers) {
      subscriber({
        started: this.intervalId != null,
        cars: this.cars
      });
    }
  }
}
