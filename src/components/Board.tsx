import * as React from 'react';
import { Rect, Text } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';

export const Board = (props: {}) => {
  const engine = useEngine();
  const config = useConfig();
  const data = useData();

  const handleStartClick = () => {
    console.log('handleStartClick');
    engine.play();
  };

  const handlePauseClick = () => {
    console.log('handlePauseClick');
    engine.pause();
  };

  const handleResetClick = () => {
    console.log('handleResetClick');
    // engine.pause();
  };

  return (
    <React.Fragment>
      <Rect x={0} y={330} width={980} height={210} fill={"#777"} />
      <Text x={30} y={330} text="CONTROLE"
        fontSize={28}
        fontFamily="digital"
      />
      <Text x={10} y={400} text="TEMPS :"
        fontSize={22}
        fontFamily="digital"
      />
      <Text x={30} y={420} text="SECONDES"
        fontSize={14}
        fontFamily="digital"
      />
      <Text x={120} y={400} text={(Math.round(data.ellapsedTime * 10) / 10).toString()}
        fontSize={22}
        fontFamily="digital"
        onClick={handleStartClick}
      />
      {data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="PAUSE :"
            fontSize={22}
            fontFamily="digital"
          />
          <Rect x={120} y={460} width={30} height={30} fill="#889" cornerRadius={3} onClick={handlePauseClick} />
          <Text x={124} y={460} text="⏸"
            fontSize={28}
            onClick={handlePauseClick}
          />
        </React.Fragment>
      )}
      {!data.playing && (
        <React.Fragment>
          <Text x={10} y={455} text="START :"
            fontSize={22}
            fontFamily="digital"
          />
          <Rect x={120} y={460} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleStartClick} />
          <Text x={125} y={460} text="▶"
            fontSize={28}
            onClick={handleStartClick}
          />
        </React.Fragment>
      )}
      <Text x={10} y={495} text="RECHARGER :"
        fontSize={22}
        fontFamily="digital"
      />
      <Rect x={120} y={500} width={30} height={30} fill="#889" cornerRadius={3} onClick={handleResetClick} />
      <Text x={125} y={503} text="✖"
        fontSize={28}
        onClick={handleResetClick}
      />
      <Text x={250} y={330} text="FEU"
        fontSize={28}
        fontFamily="digital"
      />
      <Text x={500} y={330} text="DENSITE"
        fontSize={28}
        fontFamily="digital"
      />
      <Text x={750} y={330} text="RADAR"
        fontSize={28}
        fontFamily="digital"
      />
    </React.Fragment>
  );
};
