import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Stage, Layer } from 'react-konva';
import { IData } from './engine/IData';
import { Route } from './components/Route';
import { IConfig } from './engine/IConfig';
import { Engine } from './engine/Engine';
import { appContext } from './AppContext';
import { TrafficLight } from './components/TrafficLight';
import { City } from './components/City';
import { Board } from './components/Board';
import { Radar } from './components/Radar';

const config: IConfig = {
  refresh: 50,
  resolution: 0.4,
  routeLen: 0.4 * 980,
  carWidth: 3.6,
  carHeight: 2.7,
  carMaxSpeed: 15.0,
  carAcceleration: 12,
  carDeceleration: 10,
  stopDistance: 1.0,
  brakeCarDist: 12,
  addCarDist: 16,
  trafficLightPosition: 280,
  timeFactor: 2,
  radarInitialPosition: 200,
  radarWidth: 3,
  radarHeight: 6
};

const engine = new Engine(config);

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'digital';
  src: url(${require('./assets/digital-7__mono_.ttf').default}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

export const App = (props: {}) => {
  const [data, setData] = React.useState<IData>({
    playing: false,
    elapsedTime: 0,
    cars: [],
    trafficLightColor: 'green',
    trafficLightGreenElapsedTime: 0,
    trafficLightRedElapsedTime: 0,
    trafficLightState: 'manual',
    trafficLightGreenAutoTime: 10.0,
    trafficLightRedAutoTime: 10.0,
    radar: { pos: config.radarInitialPosition }
  });
  const [fontLoaded, setFontLoaded] = React.useState<Boolean>(false);

  React.useEffect(() => {
    // Add refresh handler
    const refresh = (data: IData) => {
      setData(data);
    };
    engine.on(refresh);
    // Wait for loaind fonts
    setTimeout(() => {
      setFontLoaded(true);
    }, 1000);
  }, []); // ✅ OK - This effect never re-runs

  return (
    <React.Fragment>
      <GlobalStyle />
      {fontLoaded && (
        <Stage width={980} height={540}>
          <appContext.Provider value={{ engine, config, data }}>
            <Layer>
              <City />
              <Board />
              <TrafficLight x={config.trafficLightPosition / config.resolution}
                            y={256}
                            state={data.trafficLightState === 'auto' ? 'display-only' : 'active'} />
              <Route />
              <Radar />
            </Layer>
          </appContext.Provider>
        </Stage>
      )}
    </React.Fragment>
  );
};
