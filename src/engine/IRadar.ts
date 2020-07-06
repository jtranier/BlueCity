export interface IRadar {
  // position in meters
  pos: number;

  // speed of the last car flashed by the radar
  lastSpeed: number;

  // nb of cars flashed by the radar
  nbCars: number;
}
