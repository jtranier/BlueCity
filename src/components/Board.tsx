import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { TrafficLight } from './TrafficLight';

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

  return (
    <React.Fragment>
      <Rect x={0} y={330} width={980} height={210} fill={'#777'} />
      <Text x={30} y={330} text="CONTROLE" fontSize={28} fontFamily="digital" />
      <Text x={10} y={400} text="TEMPS :" fontSize={22} fontFamily="digital" />
      <Text x={30} y={420} text="SECONDES" fontSize={14} fontFamily="digital" />
      <React.Fragment>
        <Rect x={120} y={405} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleZeroClick} />
        <Text x={122} y={408} text="⏱" fontSize={26} onClick={handleZeroClick} />
      </React.Fragment>
      <Text
        x={160}
        y={400}
        text={(Math.round(data.ellapsedTime * 10) / 10).toString()}
        fontSize={22}
        fontFamily="digital"
        onClick={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="PAUSE :" fontSize={22} fontFamily="digital" />
          <Rect x={120} y={460} width={30} height={30} fill="#889" cornerRadius={3} onClick={handlePauseClick} />
          <Text x={124} y={460} text="⏸" fontSize={28} onClick={handlePauseClick} />
        </React.Fragment>
      )}
      {!data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="START :" fontSize={22} fontFamily="digital" />
          <Rect x={120} y={460} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleStartClick} />
          <Text x={125} y={460} text="▶" fontSize={28} onClick={handleStartClick} />
        </React.Fragment>
      )}
      <Text x={10} y={495} text="RECHARGER :" fontSize={22} fontFamily="digital" />
      <Rect x={120} y={500} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleResetClick} />
      <Text x={125} y={503} text="✖" fontSize={28} onClick={handleResetClick} />
      <Text x={270} y={330} text="FEU" fontSize={28} fontFamily="digital" />
      <React.Fragment>
        <Rect x={264} y={405} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleZeroClick} />
        <Text x={268} y={408} text="⇋" fontSize={26} onClick={handleZeroClick} />
      </React.Fragment>
      <TrafficLight x={240} y={428} />

      <Text x={500} y={330} text="DENSITE" fontSize={28} fontFamily="digital" />
      <Text x={750} y={330} text="RADAR" fontSize={28} fontFamily="digital" />
    </React.Fragment>
  );
};
