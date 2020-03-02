import * as React from 'react';
import { Line, Rect } from 'react-konva';

export const Car = (props: { x: number; y: number; width: number; height: number }) => {
  return (
    <React.Fragment>
      <Line
        points={[
          props.x,
          props.y - 0.18 * props.height,
          props.x - props.width,
          props.y - 0.18 * props.height,
          props.x - props.width,
          props.y - props.height,
          props.x - 0.5 * props.width,
          props.y - props.height,
          props.x,
          props.y - 0.6 * props.height
        ]}
        closed
        fill={'#44C'}
      />
      <Line
        points={[
          props.x - 0.05 * props.width,
          props.y - 0.6 * props.height,
          props.x - 0.7 * props.width,
          props.y - 0.6 * props.height,
          props.x - 0.7 * props.width,
          props.y - 0.95 * props.height,
          props.x - 0.45 * props.width,
          props.y - 0.95 * props.height
        ]}
        closed
        fill={'#BBF'}
      />
      <Rect
        x={props.x - 0.25 * props.width}
        y={props.y - 0.2 * props.height}
        width={0.2 * props.width}
        height={0.2 * props.height}
        fill={'#333'}
      />
      <Rect
        x={props.x - 0.95 * props.width}
        y={props.y - 0.2 * props.height}
        width={0.2 * props.width}
        height={0.2 * props.height}
        fill={'#333'}
      />
    </React.Fragment>
  );
};
