import * as React from 'react';
import { Rect, Circle } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';

export const TrafficLight = (props: {x: number, y: number}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleClick = () => {
    if (data.trafficLightColor === 'green') {
      engine.red();
    } else {
      engine.green();
    }
  };

  return (
    <React.Fragment>
      <Rect
        x={props.x - 6}
        y={props.y - 30}
        width={16}
        height={30}
        fill={'#222'}
        onClick={handleClick}
      />
      <Rect
        x={props.x}
        y={props.y}
        width={4}
        height={14}
        fill={'#222'}
        onClick={handleClick}
      />
      <Circle
        x={props.x + 2}
        y={props.y - 22}
        radius={6}
        fill={data.trafficLightColor === 'red' ? '#F44' : '#533'}
        onClick={handleClick}
      />
      <Circle
        x={props.x + 2}
        y={props.y - 8}
        radius={6}
        fill={data.trafficLightColor === 'green' ? '#4F4' : '#353'}
        onClick={handleClick}
      />
    </React.Fragment>
  );
};
