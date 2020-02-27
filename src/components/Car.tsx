import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

export const Car = (props: {x: number, y: number}) => {
  return (
    <Rect
      x={props.x}
      y={props.y}
      width={50}
      height={50}
      fill={'red'}
      shadowBlur={5}
    />
  );
}