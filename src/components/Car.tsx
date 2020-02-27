import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

export const Car = (props: { x: number; y: number; width: number; height: number }) => {
  return (
    <Rect
      x={props.x - props.width}
      y={props.y - props.height}
      width={props.width}
      height={props.height}
      fill={'grey'}
    />
  );
};
