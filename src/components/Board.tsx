import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { TrafficLight } from './TrafficLight';
import { RectBtn } from './RectBtn';
import { EditableNumber } from './EditableNumber';
import { Density } from './Density';
import { truncFixed } from '../utils';

export const Board = (props: {}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleZeroClick = () => {
    engine.zero();
  };

  const handleResetRadar = () => {
    engine.resetRadar();
  };

  const handleStartRecordingRadar = () => {
    engine.startRecordingRadar()
  };

  const handleStopRecordingRadar = () => {
    engine.stopRecordingRadar()
  };

  const handleStartClick = () => {
    engine.play();
  };

  const handlePauseClick = () => {
    engine.pause();
  };

  const handleResetClick = () => {
    engine.generateCars();
  };

  const handleChangeTrafficLightState = () => {
    if (data.trafficLightState === 'auto') {
      engine.manual();
    } else {
      engine.auto();
    }
  };

  const handleChangeGreenTime = (num: number) => {
    engine.setTrafficLightGreenAutoTime(num);
  };

  const handleChangeRedTime = (num: number) => {
    engine.setTrafficLightRedAutoTime(num);
  };

  const handleDownloadClick = () => {
    const lines: string[] = [];
    lines.push('pos;speed');
    for (const car of data.cars) {
      if (car.pos >= 0 && car.pos < config.routeLen + config.carWidth) {
        lines.push(truncFixed(car.pos, 1).replace(',', '.') + ';' + truncFixed(car.speed, 1).replace(',', '.'));
      }
    }
    const csv = lines.join('\n');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'positions.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <React.Fragment>
      <Rect x={0} y={330} width={980} height={210} fill={'#777'} />

      <Text x={30} y={330} text="CONTROLE" fontSize={28} fontFamily="digital" />
      <Text x={10} y={400} text="   TEMPS :" fontSize={22} fontFamily="digital" />
      <Text x={50} y={420} text="SECONDES" fontSize={14} fontFamily="digital" />
      <RectBtn
        x={110}
        y={395}
        width={30}
        height={30}
        text="⭯"
        fontSize={26}
        textOffsetX={3}
        textOffsetY={3}
        onClick={handleZeroClick}
      />
      <EditableNumber
        x={140}
        y={395}
        width={60}
        height={30}
        num={data.elapsedTime < 1000 ? Math.round(data.elapsedTime * 10) / 10 : Math.round(data.elapsedTime)}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
        onChange={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="    PAUSE" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={110}
            y={450}
            width={30}
            height={30}
            text="&#10074;&#10074;"
            fontSize={28}
            textOffsetX={3}
            textOffsetY={3}
            onClick={handlePauseClick}
          />
        </React.Fragment>
      )}
      {!data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="    START" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={110}
            y={450}
            width={30}
            height={30}
            text="▶"
            fontSize={28}
            textOffsetX={5}
            textOffsetY={2}
            onClick={handleStartClick}
          />
        </React.Fragment>
      )}
      <Text x={10} y={495} text="RECHARGER" fontSize={22} fontFamily="digital" />
      <RectBtn
        x={110}
        y={490}
        width={30}
        height={30}
        text="✖"
        fontSize={26}
        textOffsetX={5}
        textOffsetY={3}
        onClick={handleResetClick}
      />

      <Text x={290} y={330} text="FEU" fontSize={28} fontFamily="digital" />
      <Text
        x={291}
        y={380}
        width={65}
        text="MANUEL"
        fontSize={14}
        fontFamily="digital"
        fill={data.trafficLightState === 'manual' ? 'cyan' : 'lightgrey'}
      />
      <RectBtn
        x={294}
        y={395}
        width={30}
        height={30}
        text="⇋"
        fontSize={26}
        textOffsetX={4}
        textOffsetY={3}
        onClick={handleChangeTrafficLightState}
      />
      <Text
        x={296}
        y={428}
        width={60}
        text="AUTO"
        fontSize={14}
        fontFamily="digital"
        fill={data.trafficLightState === 'auto' ? 'cyan' : 'lightgrey'}
      />
      <TrafficLight x={270} y={428} state={data.trafficLightState === 'auto' ? 'disabled' : 'active'} />

      <Text x={230} y={455} width={200} text=" TEMPS VERT :" fontSize={22} fontFamily="digital" />
      <Text x={300} y={475} width={130} text="SECONDES" fontSize={14} fontFamily="digital" />
      <EditableNumber
        x={360}
        y={450}
        width={50}
        height={30}
        editLabel="TEMPS VERT EN SECONDES :"
        num={data.trafficLightGreenAutoTime}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill={data.trafficLightState === 'auto' ? 'cyan' : 'darkgrey'}
        editable={true}
        onChange={handleChangeGreenTime}
      />

      <Text x={230} y={495} width={200} text="TEMPS ROUGE :" fontSize={22} fontFamily="digital" />
      <Text x={300} y={515} width={130} text="SECONDES" fontSize={14} fontFamily="digital" />
      <EditableNumber
        x={360}
        y={490}
        width={50}
        height={30}
        editLabel="TEMPS ROUGE EN SECONDES :"
        num={data.trafficLightRedAutoTime}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill={data.trafficLightState === 'auto' ? 'cyan' : 'darkgrey'}
        editable={true}
        onChange={handleChangeRedTime}
      />

      <RectBtn
        x={405}
        y={395}
        width={30}
        height={30}
        text="🗎"
        fontSize={28}
        textOffsetX={5}
        textOffsetY={5}
        onClick={handleDownloadClick}
      />

      <Text x={580} y={330} text="DENSITE" fontSize={28} fontFamily="digital" />
      <Density x={440} y={360} />

      <Text x={850} y={330} text="RADAR" fontSize={28} fontFamily="digital" />
      <Text x={810} y={400} width={200} text="VITESSE :" fontSize={22} fontFamily="digital" />
      <EditableNumber
        x={900}
        y={395}
        width={60}
        height={30}
        num={Math.round(data.radar.lastSpeed * 100) / 100}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
      />
      <Text x={810} y={455} width={200} text="NOMBRE :" fontSize={22} fontFamily="digital" />
      <EditableNumber
        x={900}
        y={450}
        width={60}
        height={30}
        num={data.radar.nbCars}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
      />
      {data.radar.isRecording && (
        <RectBtn
          x={850}
          y={485}
          width={30}
          height={30}
          text="&#9635;"
          fontSize={26}
          textOffsetX={4}
          textOffsetY={3}
          onClick={handleStopRecordingRadar}
        />
      )}
      {!data.radar.isRecording && (
        <RectBtn
          x={850}
          y={485}
          width={30}
          height={30}
          text="&#9673;"
          fontSize={26}
          textOffsetX={4}
          textOffsetY={3}
          onClick={handleStartRecordingRadar}
        />
      )}
      <RectBtn
        x={900}
        y={485}
        width={30}
        height={30}
        text="⭯"
        fontSize={26}
        textOffsetX={3}
        textOffsetY={3}
        onClick={handleResetRadar}
      />
    </React.Fragment>
  );
};
