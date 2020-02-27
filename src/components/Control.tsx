import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';

export const Control = (props: {}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleStartClick = () => {
    engine.play();
  };

  const handlePauseClick = () => {
    engine.pause();
  };

  return (
    <React.Fragment>
      <Rect
        x={500}
        y={400}
        width={20}
        height={20}
        fill="black"
        onClick={handleStartClick}
      />
      <Rect
        x={500}
        y={500}
        width={20}
        height={20}
        fill="gray"
        onClick={handlePauseClick}
      />
      <Text
        x={50}
        y={500}
        text={((Math.round(data.ellapsedTime * 10)) / 10).toString()}
      />
    </React.Fragment>
  );
};
