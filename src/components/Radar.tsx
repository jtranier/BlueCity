import * as React from 'react';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { Line, Rect, Text } from 'react-konva';
import konva from 'konva';
import { useEngine } from '../hooks/useEngine';

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
    engine.setRadarPosition(Math.round(x * config.resolution * 10) / 10);
  };

  const dragFunc = (pos: konva.Vector2d): konva.Vector2d => {
    setX(pos.x);
    engine.setRadarPosition(Math.round(x * config.resolution * 10) / 10);
    return {
      x: pos.x - config.radarWidth / 2 / config.resolution,
      y: yOffset,
    };
  };

  return (
    <React.Fragment>
      <Rect x={x - 1} y={yOffset - 38} width={2} height={38} fill={'red'} />
      <Line
        x={x - config.radarWidth / 2 / config.resolution}
        y={yOffset}
        points={[
          0,
          config.radarHeight / config.resolution,

          0,
          (config.radarHeight * 0.35) / config.resolution,

          (config.radarWidth * 0.4) / config.resolution,
          (config.radarHeight * 0.35) / config.resolution,

          (config.radarWidth * 0.4) / config.resolution,
          0,

          (config.radarWidth * 0.6) / config.resolution,
          0,

          (config.radarWidth * 0.6) / config.resolution,
          (config.radarHeight * 0.35) / config.resolution,

          config.radarWidth / config.resolution,
          (config.radarHeight * 0.35) / config.resolution,

          config.radarWidth / config.resolution,
          config.radarHeight / config.resolution,
        ]}
        closed={true}
        stroke="black"
        strokeWidth={1}
        draggable
        dragBoundFunc={dragFunc}
        onDragEnd={handleDragEnd}
      />
      <Text
        x={x + 5 / config.resolution}
        y={yOffset + (config.radarHeight - 6) / config.resolution}
        text={(Math.round(engine.convertPos(data.radar.pos) * 10) / 10).toString()}
        fontSize={16}
        fontFamily="digital"
      />
    </React.Fragment>
  );
};
