import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Car } from './components/Car';
import { useEngine } from './hooks/useEngine';
import { IData } from './engine/IData';
import { Route } from './components/Route';

// Pixel resolution in meters
const resolution = 10;

const width = window.innerWidth - 20;

const height = window.innerHeight - 20;

export const App = (props: {}) => {
  const engine = useEngine({ len: window.innerWidth * resolution });
  const [data, setData] = React.useState<IData>({ started: false });

  React.useEffect(() => {
    const refresh = (data: IData) => {
      setData(data);
    };
    engine.on(refresh);
  }, []); // ✅ OK - This effect never re-runs

  const handleClick = () => {
    if (data.started) {
      engine.stop();
    } else {
      engine.start(20);
    }
  };

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Route data={data} resolution={resolution} y={height - 100} />
        <Rect
          x={width - 60}
          y={height - 60}
          width={20}
          height={20}
          fill={data.started ? 'red' : 'grey'}
          shadowBlur={5}
          onClick={handleClick}
        />
      </Layer>
    </Stage>
  );
};
