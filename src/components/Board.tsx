import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { TrafficLight } from './TrafficLight';
import { RectBtn } from './RectBtn';
import { EditableNumber } from './EditableNumber';

export const Board = (props: {}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleZeroClick = () => {
    engine.zero();
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
    engine.zero(); // TODO Sure we need that ?
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

  return (
    <React.Fragment>
      <Rect x={0} y={330} width={980} height={210} fill={'#777'} />

      <Text x={30} y={330} text="CONTROLE" fontSize={28} fontFamily="digital" />
      <Text x={10} y={400} text="    TEMPS :" fontSize={22} fontFamily="digital" />
      <Text x={60} y={420} text="SECONDES" fontSize={14} fontFamily="digital" />
      <RectBtn
        x={120}
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
        x={160}
        y={395}
        width={60}
        height={30}
        num={data.elapsedTime < 1000 ? (Math.round(data.elapsedTime * 10) / 10) : Math.round(data.elapsedTime)}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill="lightgrey"
        onChange={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="    PAUSE :" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={120}
            y={450}
            width={30}
            height={30}
            text="⏸"
            fontSize={28}
            textOffsetX={5}
            textOffsetY={-2}
            onClick={handlePauseClick}
          />
        </React.Fragment>
      )}
      {!data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="    START :" fontSize={22} fontFamily="digital" />
          <RectBtn
            x={120}
            y={450}
            width={30}
            height={30}
            text="▶"
            fontSize={28}
            textOffsetX={5}
            textOffsetY={0}
            onClick={handleStartClick}
          />
        </React.Fragment>
      )}
      <Text x={10} y={495} text="RECHARGER :" fontSize={22} fontFamily="digital" />
      <RectBtn
        x={120}
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
        width={60}
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
      <Text x={500} y={330} text="DENSITE" fontSize={28} fontFamily="digital" />
      <Text x={750} y={330} text="RADAR" fontSize={28} fontFamily="digital" />

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
        editLabel="TEMPS ROUGER EN SECONDES :"
        num={data.trafficLightRedAutoTime}
        textOffsetX={5}
        textOffsetY={5}
        fontSize={22}
        fill={data.trafficLightState === 'auto' ? 'cyan' : 'darkgrey'}
        editable={true}
        onChange={handleChangeRedTime}
      />
    </React.Fragment>
  );
};
