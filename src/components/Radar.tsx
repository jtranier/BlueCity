import * as React from 'react';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { Rect } from 'react-konva';


export const Radar = (props: {}) => {
  const config = useConfig();
  const data = useData();
  if (data == null) {
    return null;
  }
  console.log('rada');
  return (
    <React.Fragment>
      <Rect
        x={data.radar.pos / config.resolution}
        y={280 - config.radarHeight / config.resolution}
        width={config.radarWidth / config.resolution}
        height={config.radarHeight / config.resolution}
        fill={'#733'}
      />
    </React.Fragment>
  );
};
