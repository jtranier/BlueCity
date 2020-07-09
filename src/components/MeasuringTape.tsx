import * as React from 'react';
import {Line, Rect, Text} from 'react-konva';
import {useData} from '../hooks/useData'
import {useConfig} from '../hooks/useConfig'
import {useEngine} from '../hooks/useEngine'
import konva from "konva"

export const MeasuringTape = (props: { y: number }) => {

  const topRule = 20;
  const bottomRule = 70;
  const markSize = 15;
  const markOffset = 30;

  const config = useConfig();
  const data = useData();
  const engine = useEngine();
  const [x1, setX1] = React.useState<number>(data.measuringTape.x1 / config.resolution);
  const [x2, setX2] = React.useState<number>(data.measuringTape.x2 / config.resolution);

  const handleDragEndX1 = () => {
    engine.setMeasuringTapeX1(Math.round(x1 * config.resolution));
  };
  const handleDragEndX2 = () => {
    engine.setMeasuringTapeX2(Math.round(x2 * config.resolution));
  };

  const dragFuncX1 = (pos: konva.Vector2d): konva.Vector2d => {
    setX1(pos.x);
    return {
      x: pos.x,
      y: props.y,
    };
  };

  const dragFuncX2 = (pos: konva.Vector2d): konva.Vector2d => {
    setX2(pos.x);
    return {
      x: pos.x,
      y: props.y,
    };
  };


  return (
    <React.Fragment>
      {/* Left marker */}
      <Rect
        x={x1}
        y={props.y - topRule}
        width={1}
        height={bottomRule - topRule}
        fill="grey"
      />
      <Line
        x={x1}
        y={props.y}
        points={[
        - 1, - topRule + bottomRule - markOffset,
        - markSize - 1,  - topRule + bottomRule - 0.5 * markSize - markOffset,
        - markSize - 1,  - topRule + bottomRule + 0.5 * markSize - markOffset
      ]}
            closed={true}
            stroke="black"
            draggable={true}
            dragBoundFunc={dragFuncX1}
            onDragEnd={handleDragEndX1}
      />
      <Text x={x1+2}
            y={props.y+15}
            text={(Math.round(10*(x2 - x1) * config.resolution)/10).toString()}
            fontSize={28}
            fontFamily="digital" />

      {/* Right marker */}
      <Rect
        x={x2}
        y={props.y - topRule}
        width={1}
        height={bottomRule - topRule}
        fill="grey"
      />
      <Line
        x={x2}
        y={props.y}
        points={[
          1, - topRule + bottomRule - markOffset,
          markSize + 1,  - topRule + bottomRule - 0.5 * markSize - markOffset,
          markSize + 1,  - topRule + bottomRule + 0.5 * markSize - markOffset
        ]}
        closed={true}
        stroke="black"
        draggable={true}
        dragBoundFunc={dragFuncX2}
        onDragEnd={handleDragEndX2}
      />
    </React.Fragment>
  )
}