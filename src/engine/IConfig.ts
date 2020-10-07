export interface IConfig {
  // Engine refresh in milliseconds
  refresh: number;
  // Notify refresh in milliseconds (for performance only)
  refreshNotify: number;
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
  // Default obstacle distance
  defautObstacleDistance: number;
  // Add car dist in meters
  addCarDist: number;
  // Traffic light position in meters
  trafficLightPosition: number;
  // Set if the traffic light mode is manual or auto by default
  trafficLightDefaultMode: 'manual' | 'auto';
  // Traffic light color at the beginning of the simulation
  trafficLightInitialColor: 'green' | 'red';
  // Default duration in second for each state of the traffic light
  trafficLightGreenAutoTime: number;
  trafficLightRedAutoTime: number;
  // Time factor
  timeFactor: number;
  // Radar initial position
  radarInitialPosition: number;
  // Radar width in meters
  radarWidth: number;
  // Radar height in meters
  radarHeight: number;
  densityWidth: number;
  densityHeight: number;
  densityMinY: number;
  densityMaxY: number;
}
