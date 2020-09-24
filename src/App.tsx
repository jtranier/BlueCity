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

import ReactModal = require('react-modal');

const config: IConfig = {
  refresh: 50,
  resolution: 0.4,
  routeLen: 400,
  carWidth: 4,
  carHeight: 2.7,
  carMaxSpeed: 20.0,
  addCarDist: 16,
  trafficLightPosition: 400 - 120,
  timeFactor: 1,
  radarInitialPosition: 120,
  radarWidth: 8,
  radarHeight: 15,
  densityWidth: 350,
  densityHeight: 175,
  densityMinY: -(1 / 16) / 2,
  densityMaxY: 5 * (1 / 16),
  radarSensibility: 2,
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
    radar: {
      pos: config.radarInitialPosition,
      lastSpeed: 0,
      nbCars: 0,
      data: [],
      isRecording: false,
    },
    measuringTape: {
      x1: 200, // TODO ***
      x2: 300, // TODO ***
    },
  });
  const [fontLoaded, setFontLoaded] = React.useState<boolean>(false);
  const [numberModalOpen, setNumberModalOpen] = React.useState<boolean>(false);
  const [numberModalData, setNumberModalData] = React.useState<{
    label: string;
    num: number;
    onChange: (num: number) => void;
  }>({ label: '', num: 0, onChange: null });

  const openNumberModal = (label: string, num: number, onChange: (num: number) => void) => {
    setNumberModalData({ label, num, onChange: onChange });
    setNumberModalOpen(true);
  };

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

  const handleChangeModalNum = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNumberModalData({ ...numberModalData, num: +evt.target.value });
  };

  const handleValidate = (evt: any) => {
    evt.preventDefault();
    numberModalData.onChange(numberModalData.num);
    setNumberModalOpen(false);
  };

  const handleCancel = () => {
    setNumberModalOpen(false);
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      {fontLoaded && (
        <Stage width={980} height={540}>
          <appContext.Provider value={{ engine, config, data, openNumberModal }}>
            <Layer>
              <City />
              <Board />
              <TrafficLight
                x={config.trafficLightPosition / config.resolution}
                y={256}
                state={data.trafficLightState === 'auto' ? 'display-only' : 'active'}
              />
              <Route />
              <Radar />
            </Layer>
          </appContext.Provider>
        </Stage>
      )}
      <ReactModal
        isOpen={numberModalOpen}
        onRequestClose={() => {
          handleCancel();
        }}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <form onSubmit={handleValidate}>
          <h3>{numberModalData.label}</h3>
          <div>
            <input type="number" value={numberModalData.num} onChange={handleChangeModalNum} autoFocus />
          </div>
          <div>
            <button type="submit" onClick={handleValidate}>
              Valider
            </button>
            <button onClick={handleCancel}>Annuler</button>
          </div>
        </form>
      </ReactModal>
    </React.Fragment>
  );
};
