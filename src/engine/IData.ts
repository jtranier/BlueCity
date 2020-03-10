import { ICar } from './ICar';

export interface IData {
  // Is playing ?
  playing: boolean;
  // Ellapsed time in seconds
  elapsedTime: number;
  // Traffic light color
  trafficLightColor: 'green' | 'red';
  // Traffic light Green elapsed time in seconds
  trafficLightGreenElapsedTime: number;
  // Traffic light Red elapsed time in seconds
  trafficLightRedElapsedTime: number;
  // Traffic light state
  trafficLightState: 'manual' | 'auto';
  // Traffic light Green duration in auto mode
  trafficLightGreenAutoTime: number;
  // Traffic light Red duration in auto mode
  trafficLightRedAutoTime: number;
  // Cars
  cars: ICar[];
}
