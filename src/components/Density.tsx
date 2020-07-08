import * as React from 'react';
import {Line, Rect} from 'react-konva';
import {useEngine} from '../hooks/useEngine';
import {useConfig} from '../hooks/useConfig';
import {useData} from '../hooks/useData';
import * as _ from 'underscore';


export const Density = (props: { x: number; y: number }) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const grid: React.ReactFragment[] = [];

  const densityXResolution = config.routeLen / config.densityWidth;
  const densityYResolution = (config.densityMaxY - config.densityMinY) / config.densityHeight;

  // Convert an density y value to its ordinate on the screen
  const fy = (y: number) =>  {
    return (config.densityMaxY - y) / densityYResolution
  }

  _.times(5, (i) =>
    grid.push(
      <Rect key={'line-horiz-' + i}
            x={props.x}
            y={props.y + fy(config.densityMaxY / 5 * (i + 1))}
            width={config.routeLen / densityXResolution}
            height={1}
            fill="green"/>
    )
  )

  _.times(9, (i) =>
    grid.push(
      <Rect key={'line-vert-' + i}
            x={props.x + (config.routeLen / densityXResolution) / 9 * (i + 0.5)}
            y={props.y}
            width={1}
            height={(config.densityMaxY - config.densityMinY) / densityYResolution}
            fill="green"/>
    )
  )

  const curvePoints: number[] = [];
  _.each(
    _.filter(data.cars, (car) => { return car.pos < config.routeLen + config.addCarDist}),
    (car) => {
    const distanceToPrevious = car.precedingCar ? Math.abs(car.pos - car.precedingCar.pos) : Infinity;

    const x = Math.max(
      0,
      Math.min(
        config.routeLen / densityXResolution,
        car.pos / densityXResolution
      )
    );

    curvePoints.push(x,  fy(1 / distanceToPrevious))
  });

  return (
    <React.Fragment>
      {/* Density screen */}
      <Rect
        x={props.x}
        y={props.y}
        width={config.densityWidth}
        height={config.densityHeight}
        fill="black"
      />
      {grid}

      {/* Radar */}
      <Rect
        x={props.x + (data.radar.pos) / densityXResolution}
        y={props.y + fy(2 * 1/16)}
        width={3}
        height={2 * 1/16 / densityYResolution}
        fill="red"
      />

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

      <Line x={props.x}
            y={props.y}
            points={curvePoints}
            stroke="cyan"
            width={5}
      />

    </React.Fragment>
  );
};
