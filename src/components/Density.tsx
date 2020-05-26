import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { TrafficLight } from './TrafficLight';
import { RectBtn } from './RectBtn';
import { EditableNumber } from './EditableNumber';

export const Density = (props: {
  x: number;
  y: number;
}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  return (
    <React.Fragment>
      <Rect x={props.x} y={props.y} width={config.routeLen / config.densityResolution} height={(config.densityOrdinate + 0.5) / config.densityOrdinateResolution} fill="black" />
    </React.Fragment>
  );
};
