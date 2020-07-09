import * as React from 'react';
import {useConfig} from '../hooks/useConfig';
import {useData} from '../hooks/useData';
import {Line, Rect} from 'react-konva';
import konva from 'konva';
import {useEngine} from '../hooks/useEngine';

export const Radar = (props: {}) => {
  const config = useConfig();
  const data = useData();
  const engine = useEngine();
  const [x, setX] = React.useState<number>(data.radar.pos / config.resolution);
  const yOffset = 290;

  if (data == null) {
    return null;
  }

  const handleDragEnd = () => {
    engine.setRadarPosition(Math.round(x * config.resolution));
  };

  const dragFunc = (pos: konva.Vector2d): konva.Vector2d => {
    setX(pos.x);
    return {
      x: pos.x - config.radarWidth / 2 / config.resolution,
      y: yOffset,
    };
  };

  return (
    <React.Fragment>
      <Rect
        x={x}
        y={255}
        width={2}
        height={yOffset-255}
        fill={'#733'}
      />
      <Line
        x={x - (config.radarWidth / 2) / config.resolution}
        y={yOffset}
        points={[
          0, 0,
          config.radarWidth / config.resolution, 0,
          config.radarWidth / config.resolution, config.radarHeight / config.resolution,
          0, config.radarHeight / config.resolution
        ]}
        closed={true}
        stroke="black"
        strokeWidth={1}
        draggable
        dragBoundFunc={dragFunc}
        onDragEnd={handleDragEnd}
      />
    </React.Fragment>
  );
};
