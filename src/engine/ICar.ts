export interface ICar {
  // id
  id: number;
  // position in meters
  pos: number;
  // record of the previous pos (at current time - dt)
  previousPos: number;
  // speed in meters/sec
  speed: number;
  // reference to the car before me
  precedingCar?: ICar;
  // reference to the car after me
  followingCar?: ICar;
}
