export interface ICar {
  // id
  id: number;
  // position in meters
  pos: number;
  // speed in meters/sec
  speed: number;
  // has the speed been measured by the radar
  hasSpeedMeasure: boolean;
}
