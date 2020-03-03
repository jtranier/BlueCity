import * as React from 'react';
import { Rect, Text } from 'react-konva';
import konva from 'konva';


export const RectBtn = (props: { x: number; y: number; width: number; height: number, text: string, fontSize: number, textOffsetX: number, textOffsetY: number, onClick: (evt: konva.KonvaEventObject<MouseEvent>) => void }) => {
  const [overRect, setOverRect] = React.useState<boolean>(false);
  const [overText, setOverText] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill="#889"
        cornerRadius={3}
        shadowBlur={overRect || overText ? 3 : 0}
        onClick={props.onClick}
        onMouseOver={() => setOverRect(true)}
        onMouseLeave={() => setOverRect(false)}
      />
      <Text
        x={props.x + props.textOffsetX}
        y={props.y + props.textOffsetY}
        text={props.text}
        fontSize={props.fontSize}
        onClick={props.onClick}
        onMouseOver={() => setOverText(true)}
        onMouseLeave={() => setOverText(false)}
      />
    </React.Fragment>
  );
};
