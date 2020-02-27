import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { useEngine } from './hooks/useEngine';
import { IData } from './engine/IData';
import { Route } from './components/Route';
import { IConfig } from './engine/IConfig';

const conf: IConfig = {
  refresh: 20,
  resolution: 0.4,
  windowWidth: 980,
  windowHeight: 540,
  carWidth: 4.0,
  carHeight: 2.8,
  carMaxSpeed: 15.0,
  addCarDelay: 1000,
  timeFactor: 2,
  routePosition: 274
}

export const App = (props: {}) => {
  const engine = useEngine(conf);
  const [data, setData] = React.useState<IData>({ started: false, ellapsedTime: 0, cars: [] });

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
      engine.start();
    }
  };

  return (
    <Stage width={conf.windowWidth} height={conf.windowHeight}>
      <Layer>
        <Route data={data} conf={conf} />
        <Rect
          x={conf.windowWidth - 60}
          y={conf.windowHeight - 60}
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
