export interface IConfig {
  // Engine refresh in milliseconds
  refresh: number
  // Pixel resolution in meters
  resolution: number;
  // Window width
  windowWidth: number;
  // Window height
  windowHeight: number;
  // Car width in meters
  carWidth: number;
  // Car height in meters
  carHeight: number;
  // Car max speed in meters/sec
  carMaxSpeed: number;
  // Add car delay in milliseconds
  addCarDelay: 1000;
  // Time factor
  timeFactor: number;
  // Route position
  routePosition: number;
}
