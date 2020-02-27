import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { IData } from './engine/IData';
import { Route } from './components/Route';
import { IConfig } from './engine/IConfig';
import { Control } from './components/Control';
import { Engine } from './engine/Engine';
import { appContext } from './AppContext';
import { TrafficLight } from './components/TrafficLight';
import { City } from './components/City';

const config: IConfig = {
  refresh: 50,
  resolution: 0.4,
  routeLen: 0.4 * 980,
  carWidth: 4.0,
  carHeight: 2.8,
  carMaxSpeed: 15.0,
  carAcceleration: 8,
  carDeceleration: 10,
  stopDistance: 1.0,
  addCarDelay: 1000,
  trafficLightPosition: 280,
  timeFactor: 2
};

const engine = new Engine(config);

export const App = (props: {}) => {
  const [data, setData] = React.useState<IData>({
    playing: false,
    ellapsedTime: 0,
    cars: [],
    trafficLightColor: 'green',
    trafficLightGreenEllapsedTime: 0,
    trafficLightRedEllapsedTime: 0
  });

  React.useEffect(() => {
    const refresh = (data: IData) => {
      setData(data);
    };
    engine.on(refresh);
  }, []); // ✅ OK - This effect never re-runs

  return (
    <Stage width={980} height={540}>
      <appContext.Provider value={{ engine, config, data }}>
        <Layer>
          <City />
          <Route />
          <TrafficLight />
          <Control />
        </Layer>
      </appContext.Provider>
    </Stage>
  );
};
