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

import './assets/main.css';

const config: IConfig = {
  refresh: 20, // 20 pour Condition pour "augmentationBouchon" et "detente", 200 en condiftion standard
  refreshNotify: 50, // Do not change (only for perfomance)
  resolution: 0.4,
  routeLen: 400,
  carWidth: 4,
  carHeight: 2.7,
  carMaxSpeed: 20.0,
  defautObstacleDistance: 16,
  addCarDist: 16,
  trafficLightPosition: 400 - 120,
  trafficLightDefaultMode: 'manual',
  trafficLightInitialColor: 'green',
  trafficLightGreenAutoTime: 10.0,
  trafficLightRedAutoTime: 10.0,
  timeFactor: 1,
  radarInitialPosition: 160,
  radarWidth: 8,
  radarHeight: 23,
  densityWidth: 320,
  densityHeight: 160,
  densityMinY: -(1 / 16) / 2,
  densityMaxY: 5 * (1 / 16)
};

const engine = new Engine(config);

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'digital';
  src: url(${require('./assets/digital-7__mono_.ttf').default}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'LCDMono';
  src: url(${require('./assets/2_LCDMono.ttf').default}) format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

export const App = (props: {}) => {
  const [data, setData] = React.useState<IData>({
    playing: false,
    elapsedTime: 0,
    cars: [],
    trafficLightColor: config.trafficLightInitialColor,
    trafficLightGreenElapsedTime: 0,
    trafficLightRedElapsedTime: 0,
    trafficLightMode: config.trafficLightDefaultMode,
    trafficLightGreenAutoTime: config.trafficLightGreenAutoTime,
    trafficLightRedAutoTime: config.trafficLightRedAutoTime,
    radar: {
      pos: config.radarInitialPosition,
      lastSpeed: 0,
      nbCars: 0,
      data: [],
      isRecording: false,
    },
    measuringTape: {
      x1: 200,
      x2: 300,
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
        <Stage width={980} height={640}>
          <appContext.Provider value={{ engine, config, data, openNumberModal }}>
            <Layer>
              <City />
              <Board />
              <TrafficLight
                x={config.trafficLightPosition / config.resolution}
                y={245}
                state={data.trafficLightMode === 'auto' ? 'display-only' : 'active'}
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
        className='modal'
      >
        <form
          onSubmit={handleValidate}
        >
          <h3>{numberModalData.label}</h3>
          <div>
            <input
              type="number"
              value={numberModalData.num}
              onChange={handleChangeModalNum}
              autoFocus
            />
          </div>
          <div className="btns">
            <button type="submit" onClick={handleValidate}>
              VALIDER
            </button>
            <button onClick={handleCancel}>ANNULER</button>
          </div>
        </form>
      </ReactModal>
    </React.Fragment>
  );
};
