import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { IData } from './engine/IData';
import { Route } from './components/Route';
import { IConfig } from './engine/IConfig';
import { Control } from './components/Control';
import { Engine } from './engine/engine';
import { appContext } from './AppContext';

const config: IConfig = {
  refresh: 20,
  resolution: 0.4,
  routeLen: 0.4 * 980,
  carWidth: 4.0,
  carHeight: 2.8,
  carMaxSpeed: 15.0,
  addCarDelay: 1000,
  timeFactor: 2,
  routePosition: 274
};

const engine = new Engine(config);

export const App = (props: {}) => {
  const [data, setData] = React.useState<IData>({ playing: false, ellapsedTime: 0, cars: [] });

  React.useEffect(() => {
    const refresh = (data: IData) => {
      setData(data);
    };
    engine.on(refresh);
  }, []); // ✅ OK - This effect never re-runs

  console.log(engine, config);
  return (
    <Stage width={980} height={540}>
      <appContext.Provider value={{ engine, config, data }}>
        <Layer>
          <Route />
          <Control />
        </Layer>
      </appContext.Provider>
    </Stage>
  );
};
