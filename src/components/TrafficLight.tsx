import * as React from 'react';
import { Rect, Circle } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';

export const TrafficLight = (props: { x: number; y: number; state: 'active' | 'display-only' | 'disabled' }) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleClick = () => {
    if (props.state !== 'active') {
      return;
    }

    if (data.trafficLightColor === 'green') {
      engine.red();
    } else {
      engine.green();
    }
  };

  const redLightColor = props.state === 'disabled' ? '#ccc' : data.trafficLightColor === 'red' ? '#F44' : '#533';
  const greenLightColor = props.state === 'disabled' ? 'black' : data.trafficLightColor === 'green' ? '#4F4' : '#353';

  return (
    <React.Fragment>
      <Rect x={props.x - 8} y={props.y - 30} width={16} height={30} fill={'#222'} onClick={handleClick} />
      <Rect x={props.x - 2} y={props.y} width={4} height={20} fill={'#222'} onClick={handleClick} />
      <Circle x={props.x} y={props.y - 22} radius={6} fill={redLightColor} onClick={handleClick} />
      <Circle x={props.x} y={props.y - 8} radius={6} fill={greenLightColor} onClick={handleClick} />
    </React.Fragment>
  );
};
