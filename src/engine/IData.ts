import { ICar } from './ICar';

export interface IData {
  // Is playing ?
  playing: boolean;
  // Ellapsed time in seconds
  ellapsedTime: number;
  // Traffic light color
  trafficLightColor: 'green' | 'red';
  // Traffic light Green ellapsed time in seconds
  trafficLightGreenEllapsedTime: number;
  // Traffic light Red ellapsed time in seconds
  trafficLightRedEllapsedTime: number;
  // Cars
  cars: ICar[];
}
