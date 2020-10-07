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

  const yOffset = 350;

  const handleZeroClick = () => {
    engine.zero();
  };

  const handleResetRadar = () => {
    engine.resetRadar();
  };

  const handleStartRecordingRadar = () => {
    engine.startRecordingRadar();
  };

  const handleStopRecordingRadar = () => {
    engine.stopRecordingRadar();
    handleDownloadRadarClick();
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

  const handleChangeTrafficLightMode = () => {
    if (data.trafficLightMode === 'auto') {
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
    for (const car of data.cars.slice().reverse()) {
      lines.push(
        engine.convertPos(car.pos).toString().replace('.', ',') + ';' + car.speed.toString().replace('.', ',')
      );
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

  const handleDownloadRadarClick = () => {
    const lines: string[] = [];
    lines.push('time;speed');
    for (const d of data.radar.data) {
      lines.push(truncFixed(d[0] / 1000, 1).replace('.', ',') + ';' + truncFixed(d[1], 2).replace('.', ','));
    }
    const csv = lines.join('\n');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'radar.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <React.Fragment>
      <Rect x={0} y={yOffset} width={980} height={210} fill={'#777'} />

      <Density x={440} y={yOffset + 30} />

      <Text x={30} y={yOffset} text="CONTROLE" fontSize={28} fontFamily="digital" />
      <Text x={10} y={yOffset + 70} text="   TEMPS :" fontSize={22} fontFamily="digital" />
      <Text x={50} y={yOffset + 90} text="SECONDES" fontSize={14} fontFamily="digital" />
      <RectBtn
        x={110}
        y={yOffset + 65}
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
        y={yOffset + 65}
        width={60}
        height={30}
        num={
          data.elapsedTime < 1000 * 1000 ? Math.round(data.elapsedTime / 100) / 10 : Math.round(data.elapsedTime / 1000)
        }
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
        onChange={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={yOffset + 125} text="    PAUSE" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={110}
            y={yOffset + 120}
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
          <Text x={10} y={yOffset + 125} text="    START" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={110}
            y={yOffset + 120}
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
      <Text x={10} y={yOffset + 165} text="RECHARGER" fontSize={22} fontFamily="digital" />
      <RectBtn
        x={110}
        y={yOffset + 160}
        width={30}
        height={30}
        text="✖"
        fontSize={26}
        textOffsetX={5}
        textOffsetY={3}
        onClick={handleResetClick}
      />

      <Text x={290} y={yOffset} text="FEU" fontSize={28} fontFamily="digital" />
      <Text
        x={291}
        y={yOffset + 50}
        width={65}
        text="MANUEL"
        fontSize={14}
        fontFamily="digital"
        fill={data.trafficLightMode === 'manual' ? 'cyan' : 'lightgrey'}
      />
      <RectBtn
        x={294}
        y={yOffset + 65}
        width={30}
        height={30}
        text="⇋"
        fontSize={26}
        textOffsetX={4}
        textOffsetY={3}
        onClick={handleChangeTrafficLightMode}
      />
      <Text
        x={296}
        y={yOffset + 98}
        width={60}
        text="AUTO"
        fontSize={14}
        fontFamily="digital"
        fill={data.trafficLightMode === 'auto' ? 'cyan' : 'lightgrey'}
      />
      <TrafficLight x={270} y={yOffset + 98} state={data.trafficLightMode === 'auto' ? 'disabled' : 'active'} />

      <Text x={230} y={yOffset + 125} width={200} text=" TEMPS VERT :" fontSize={22} fontFamily="digital" />
      <Text x={300} y={yOffset + 145} width={130} text="SECONDES" fontSize={14} fontFamily="digital" />
      <EditableNumber
        x={360}
        y={yOffset + 120}
        width={50}
        height={30}
        editLabel="TEMPS VERT EN SECONDES :"
        num={data.trafficLightGreenAutoTime}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill={data.trafficLightMode === 'auto' ? 'cyan' : 'darkgrey'}
        editable={true}
        onChange={handleChangeGreenTime}
      />

      <Text x={230} y={yOffset + 165} width={200} text="TEMPS ROUGE :" fontSize={22} fontFamily="digital" />
      <Text x={300} y={yOffset + 185} width={130} text="SECONDES" fontSize={14} fontFamily="digital" />
      <EditableNumber
        x={360}
        y={yOffset + 160}
        width={50}
        height={30}
        editLabel="TEMPS ROUGE EN SECONDES :"
        num={data.trafficLightRedAutoTime}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill={data.trafficLightMode === 'auto' ? 'cyan' : 'darkgrey'}
        editable={true}
        onChange={handleChangeRedTime}
      />

      <RectBtn
        x={380}
        y={yOffset + 65}
        width={30}
        height={30}
        text="🗎"
        fontSize={28}
        textOffsetX={5}
        textOffsetY={5}
        onClick={handleDownloadClick}
      />

      <Text x={580} y={yOffset} text="DENSITE" fontSize={28} fontFamily="digital" />
      {/* Density is here */}

      <Text x={850} y={yOffset} text="RADAR" fontSize={28} fontFamily="digital" />
      <Text x={810} y={yOffset + 70} width={200} text="VITESSE :" fontSize={22} fontFamily="digital" />
      <EditableNumber
        x={900}
        y={yOffset + 65}
        width={60}
        height={30}
        num={Math.round(data.radar.lastSpeed * 100) / 100}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
      />
      <Text x={810} y={yOffset + 125} width={200} text="NOMBRE :" fontSize={22} fontFamily="digital" />
      <EditableNumber
        x={900}
        y={yOffset + 120}
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
          y={yOffset + 155}
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
          y={yOffset + 155}
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
        y={yOffset + 155}
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
