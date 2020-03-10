import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { TrafficLight } from './TrafficLight';
import { RectBtn } from './RectBtn';

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

  return (
    <React.Fragment>
      <Rect x={0} y={330} width={980} height={210} fill={'#777'} />
      <Text x={30} y={330} text="CONTROLE" fontSize={28} fontFamily="digital" />
      <Text x={10} y={400} text="TEMPS :" fontSize={22} fontFamily="digital" />
      <Text x={30} y={420} text="SECONDES" fontSize={14} fontFamily="digital" />
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
      <Text
        x={160}
        y={400}
        text={(Math.round(data.elapsedTime * 10) / 10).toString()}
        fontSize={22}
        fontFamily="digital"
        onClick={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="PAUSE :" fontSize={22} fontFamily="digital" />
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
          <Text x={10} y={455} text="START :" fontSize={22} fontFamily="digital" />
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
      <Text x={270} y={330} text="FEU" fontSize={28} fontFamily="digital" />
      <Text
          x={261}
          y={380}
          width={60}
          align="center"
          text="MANUEL"
          fontSize={14}
          fontFamily="digital"
          fill={data.trafficLightState === 'manual' ? 'black' : 'lightgrey'} />
      <RectBtn
        x={264}
        y={395}
        width={30}
        height={30}
        text="⇋"
        fontSize={26}
        textOffsetX={4}
        textOffsetY={3}
        onClick={handleChangeTrafficLightState}
      />
      <Text x={266}
            y={428}
            width={60}
            align="left"
            text="AUTO"
            fontSize={14}
            fontFamily="digital"
            fill={data.trafficLightState === 'auto' ? 'black' : 'lightgrey'} />
      <TrafficLight x={240} y={428} state={data.trafficLightState === 'auto' ? 'disabled' : 'active'} />
      <Text x={500} y={330} text="DENSITE" fontSize={28} fontFamily="digital" />
      <Text x={750} y={330} text="RADAR" fontSize={28} fontFamily="digital" />

      <Text x={200}
            y={455}
            width={150}
            align="right"
            text="TEMPS VERT :"
            fontSize={22}
            fontFamily="digital" />
      <Text x={200}
            y={475}
            width={130}
            align="right"
            text="SECONDES"
            fontSize={14}
            fontFamily="digital" />
      <Rect x={330} y={450} width={50} height={30} fill="black" />
      <Text x={335}
            y={455}
            fontSize={22}
            fontFamily="digital"
            text={data.trafficLightGreenAutoTime?.toString()}
            fill={data.trafficLightState === 'auto' ? 'cyan' : 'darkgrey'}
            align="right"
            width={40} />

      <Text x={150}
            y={495}
            width={200}
            align="right"
            text="TEMPS ROUGE :"
            fontSize={22}
            fontFamily="digital" />
      <Text x={200}
            y={515}
            width={130}
            align="right"
            text="SECONDES"
            fontSize={14}
            fontFamily="digital" />
            <Rect x={330} y={490} width={50} height={30} fill="black" />
      <Text x={335}
            y={495}
            fontSize={22}
            fontFamily="digital"
            text={data.trafficLightRedAutoTime?.toString()}
            fill={data.trafficLightState === 'auto' ? 'cyan' : 'darkgrey'}
            align="right"
            width={40} />
    </React.Fragment>
  );


};
