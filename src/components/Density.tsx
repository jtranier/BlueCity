import * as React from 'react';
import { Line, Rect } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import * as _ from 'underscore';

export const Density = (props: { x: number; y: number }) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const grid: React.ReactFragment[] = [];

  const densityXResolution = config.routeLen / config.densityWidth;
  const densityYResolution = (config.densityMaxY - config.densityMinY) / config.densityHeight;

  // Convert an density y value to its ordinate on the screen
  const fy = (y: number) => {
    return (config.densityMaxY - y) / densityYResolution;
  };

  _.times(5, (i) =>
    grid.push(
      <Rect
        key={'line-horiz-' + i}
        x={props.x}
        y={props.y + fy((config.densityMaxY / 5) * (i + 1))}
        width={config.routeLen / densityXResolution}
        height={1}
        fill="green"
      />
    )
  );

  _.times(10, (i) =>
    grid.push(
      <Rect
        key={'line-vert-' + i}
        x={props.x + (config.routeLen / densityXResolution / 10) * i}
        y={props.y}
        width={1}
        height={(config.densityMaxY - config.densityMinY) / densityYResolution}
        fill="green"
      />
    )
  );

  const curvePointsBeforeTrafficLight: number[] = [];
  const curvePointsAfterTrafficLight: number[] = [];

  _.each(
    _.filter(data.cars, (car) => {
      return (
        car.pos < config.routeLen * 2 &&
        (data.trafficLightColor === 'green' || (car.precedingCar && engine.convertPos(car.precedingCar.pos) <= 0))
      );
    }),
    (car) => {
      // Distance to next car
      let dNextCar = car.precedingCar ? car.precedingCar.pos - car.pos : Infinity;
      if (dNextCar < 0) {
        dNextCar = 0;
      }

      const x = car.pos / densityXResolution;

      curvePointsBeforeTrafficLight.push(x, fy(1 / dNextCar));
    }
  );

  _.each(
    _.filter(data.cars, (car) => {
      return (
        car.pos < config.routeLen + config.addCarDist &&
        data.trafficLightColor === 'red' &&
        engine.convertPos(car.pos) > 0
      );
    }),
    (car) => {
      // Distance to next car
      let dNextCar = car.precedingCar ? car.precedingCar.pos - car.pos : Infinity;
      if (dNextCar < 0) {
        // TODO It should not happen, no?
        dNextCar = 0;
      }

      const x = Math.max(0, car.pos / densityXResolution);

      curvePointsAfterTrafficLight.push(x, fy(1 / dNextCar));
    }
  );

  return (
    <React.Fragment>
      {/* Density screen */}
      <Rect x={props.x} y={props.y} width={config.densityWidth} height={config.densityHeight} fill="black" />
      {grid}

      {/* Traffic light */}
      <Rect
        x={props.x + config.trafficLightPosition / densityXResolution}
        y={props.y}
        width={3}
        height={(config.densityMaxY - config.densityMinY) / densityYResolution}
        fill="green"
      />

      {/* Density origin */}
      <Rect
        x={props.x}
        y={props.y + config.densityMaxY / densityYResolution}
        width={config.routeLen / densityXResolution}
        height={3}
        fill="green"
      />

      <Line x={props.x} y={props.y} points={curvePointsBeforeTrafficLight} stroke="cyan" width={5} />
      <Line x={props.x} y={props.y} points={curvePointsAfterTrafficLight} stroke="cyan" width={5} />

      {/* Radar */}
      <Rect
        x={props.x + data.radar.pos / densityXResolution}
        y={props.y + fy(2 / 16)}
        width={3}
        height={2 / 16 / densityYResolution}
        fill="red"
      />

      {/* Density curve mask */}
      <Rect
        x={props.x + config.routeLen / densityXResolution}
        y={props.y + fy(5 / 16)}
        width={200}
        height={config.densityHeight}
        fill="#777"
      />

      <Rect x={props.x - 28} y={props.y + fy(5 / 16)} width={28} height={config.densityHeight} fill="#777" />
    </React.Fragment>
  );
};
