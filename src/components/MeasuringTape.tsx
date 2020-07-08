import * as React from 'react';
import {Line, Rect} from 'react-konva';
import {useData} from '../hooks/useData'
import {useConfig} from '../hooks/useConfig'
import {useEngine} from '../hooks/useEngine'
import konva from "konva"

export const MeasuringTape = (props: {y: number }) => {

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
    setX1(x1 + pos.x * config.resolution);
    return {
      x: x1 + pos.x * config.resolution,
      y: 0,
    };
  };


  return (
    <React.Fragment>
      <Rect
        x={x1}
        y={props.y - topRule}
        width={1}
        height={bottomRule - topRule}
        fill="grey"
      />
      <Line points={[
        x1 - 1,
        props.y - topRule + bottomRule - markOffset,
        x1 - markSize - 1,
        props.y - topRule + bottomRule - 0.5 * markSize - markOffset,
        x1 - markSize - 1,
        props.y - topRule + bottomRule + 0.5 * markSize - markOffset
      ]}
            closed={true}
            stroke="black"
            draggable={true}
            dragBoundFunc={dragFuncX1}
            onDragEnd={handleDragEndX1}
      />
    </React.Fragment>
  )
}