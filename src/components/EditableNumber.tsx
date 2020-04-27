import * as React from 'react';
import { Rect, Text } from 'react-konva';
import konva from 'konva';
import { appContext } from '../AppContext';

export const EditableNumber = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  num: number;
  fontSize: number;
  textOffsetX: number;
  textOffsetY: number;
  fill: string;
  editable?: boolean;
  editLabel?: string;
  onClick?: (evt: konva.KonvaEventObject<MouseEvent>) => void;
  onChange?: (num: number) => void;
}) => {
  const context = React.useContext(appContext);
  const handleClick = (evt: konva.KonvaEventObject<MouseEvent>) => {
    if (props.editable !== true) {
      return;
    }
    if (props.onClick) {
      props.onClick(evt);
    }
    context.openNumberModal(props.editLabel, props.num, props.onChange);
  };
  return (
    <React.Fragment>
      <Rect x={props.x} y={props.y} width={props.width} height={props.height} fill="black" onClick={handleClick} />
      <Text
        x={props.x + props.textOffsetX}
        y={props.y + props.textOffsetY}
        text={props.num.toString()}
        fontSize={props.fontSize}
        fontFamily="digital"
        fill={props.fill}
        onClick={handleClick}
      />
    </React.Fragment>
  );
};
