export interface ICar {
  // id
  id: number;
  // position in meters
  pos: number;
  // speed in meters/sec
  speed: number;
  // has the speed been measured by the radar
  hasSpeedMeasure: boolean;
  // reference to the car before me
  precedingCar?: ICar;
  // reference to the car after me
  followingCar?: ICar;
}
