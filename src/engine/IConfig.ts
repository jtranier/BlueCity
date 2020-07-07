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
  // Add car dist in meters
  addCarDist: number;
  // Traffic light position in meters
  trafficLightPosition: number;
  // Time factor
  timeFactor: number;
  // Radar initial position
  radarInitialPosition: number;
  // Radar width in meters
  radarWidth: number;
  // Radar height in meters
  radarHeight: number;
  // Density resolution
  densityResolution: number;
  // Density ordinate
  densityOrdinate: number;
  // Density ordinate resolution
  densityOrdinateResolution: number;
  // Radar sensibility
  radarSensibility: number;
}
