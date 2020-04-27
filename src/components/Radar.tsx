import * as React from 'react';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { Rect } from 'react-konva';
import konva from 'konva';
import { useEngine } from '../hooks/useEngine';

export const Radar = (props: {}) => {
  const config = useConfig();
  const data = useData();
  const engine = useEngine();
  const [x, setX] = React.useState<number>(data.radar.pos / config.resolution);

  if (data == null) {
    return null;
  }

  const handleDragEnd = () => {
    engine.setRadarPosition(Math.round(x * config.resolution));
  };

  const dragFunc = (pos: konva.Vector2d): konva.Vector2d => {
    setX(pos.x);
    return {
      x: pos.x,
      y: 280 - config.radarHeight / config.resolution,
    };
  };

  return (
    <React.Fragment>
      <Rect
        x={x}
        y={280 - config.radarHeight / config.resolution}
        width={config.radarWidth / config.resolution}
        height={config.radarHeight / config.resolution}
        fill={'#733'}
        draggable
        dragBoundFunc={dragFunc}
        onDragEnd={handleDragEnd}
      />
    </React.Fragment>
  );
};
