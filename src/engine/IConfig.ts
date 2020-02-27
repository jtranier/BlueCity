export interface IConfig {
  // Engine refresh in milliseconds
  refresh: number;
  // Pixel resolution in meters
  resolution: number;
  // Route len in meters
  routeLen: number;
  // Car width in meters
  carWidth: number;
  // Car height in meters
  carHeight: number;
  // Car max speed in meters/seconds
  carMaxSpeed: number;
  // Car acceleration in meters/seconds²
  carAcceleration: number;
  // Car deceleration in meters/seconds²
  carDeceleration: number;
  // Stop distance between two cars
  stopDistance: number;
  // Add car delay in milliseconds
  addCarDelay: 1000;
  // Traffic light position in meters
  trafficLightPosition: number;
  // Time factor
  timeFactor: number;
}
