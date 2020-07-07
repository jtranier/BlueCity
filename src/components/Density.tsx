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

  _.times(5, (i) =>
    grid.push(
      <Rect key={'line-horiz-' + i}
            x={props.x}
            y={props.y + (config.densityOrdinate / config.densityOrdinateResolution) / 5 * (i + 1)}
            width={config.routeLen / config.densityResolution}
            height={1}
            fill="green"/>
    )
  )

  _.times(9, (i) =>
    grid.push(
      <Rect key={'line-vert-' + i}
            x={props.x + (config.routeLen / config.densityResolution) / 9 * (i + 0.5)}
            y={props.y}
            width={1}
            height={(config.densityOrdinate + 0.5) / config.densityOrdinateResolution}
            fill="green"/>
    )
  )

  const curvePoints: number[] = [];
  _.each(data.cars, (car, index) => {
    const distanceToPrevious = index > 0 ? Math.abs(car.pos - data.cars[index-1].pos) : Infinity;
    curvePoints.push(car.pos / config.densityResolution, 10 * (1 / distanceToPrevious) / config.densityOrdinateResolution)

  });

  return (
    <React.Fragment>
      <Rect
        x={props.x}
        y={props.y}
        width={config.routeLen / config.densityResolution}
        height={(config.densityOrdinate + 0.5) / config.densityOrdinateResolution}
        fill="black"
      />
      {grid}

      {/* Radar */}
      <Rect
        x={props.x + (data.radar.pos) / config.densityResolution}
        y={props.y + 3 / config.densityOrdinateResolution}
        width={3}
        height={(config.densityOrdinate - 3) / config.densityOrdinateResolution}
        fill="red"
      />

      {/* Traffic light */}
      {/* TODO : the traffic light pos should be a param */}
      <Rect
        x={props.x + 280 / config.densityResolution}
        y={props.y}
        width={3}
        height={(config.densityOrdinate + 0.5) / config.densityOrdinateResolution}
        fill="green"
      />

      {/* Density origin */}
      <Rect
        x={props.x}
        y={props.y + 5 / config.densityOrdinateResolution}
        width={config.routeLen / config.densityResolution}
        height={3}
        fill="green"
      />

      <Line x={props.x}
            y={props.y}
            points={curvePoints}
            stroke="cyan"
            bezier={true}
            width={5}
      />

    </React.Fragment>
  );
};
