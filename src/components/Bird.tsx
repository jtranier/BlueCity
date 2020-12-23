import {Sprite} from 'react-konva/lib/ReactKonvaCore'
import * as React from 'react'
import Konva from "konva"

export const Bird = (props: {}) => {

  const birdImg = new Image();

  birdImg.src = require('../assets/bird-sprite.png').default;

  const spriteRef = React.useRef<Konva.Sprite>(null);
  React.useEffect(() => {
    spriteRef.current.start();

    const animateBird = () => {
      spriteRef.current.x(1200);
      spriteRef.current.to({
        x: -500,
        duration: 20,
        onFinish: animateBird
      })
    }

    animateBird();
  })

  // return birdImg;
  const sprite = <Sprite ref={spriteRef}
                         x={1200}
                         y={30}
                         animation="fly"
                         animations={{
                           fly: [
                             81 * 0, 0, 81, 31,
                             81 * 1, 0, 81, 31,
                             81 * 2, 0, 81, 31,
                             81 * 3, 0, 81, 31,
                             81 * 4, 0, 81, 31,
                             81 * 5, 0, 81, 31,
                             81 * 6, 0, 81, 31,
                             81 * 8, 0, 81, 31,
                             81 * 9, 0, 81, 31,
                             81 * 10, 0, 81, 31,
                             81 * 11, 0, 81, 31,
                             81 * 12, 0, 81, 31,
                             81 * 13, 0, 81, 31,
                             81 * 14, 0, 81, 31,
                             81 * 15, 0, 81, 31,
                             81 * 16, 0, 81, 31,
                             81 * 17, 0, 81, 31,
                             81 * 18, 0, 81, 31
                           ]
                         }}
                         image={birdImg}
                         frameRate={18}
                         frameIndex={0}
                         scaleX={0.5}
                         scaleY={0.5}
  />

  return sprite;
}