import * as React from 'react';
import { Image as KonvaImage } from 'react-konva';

export const City = (props: {}) => {
  const [image, setImage] = React.useState<HTMLImageElement>(null);

  React.useEffect(() => {
    var imageElement = new Image();
    imageElement.onload = () => {
      setImage(imageElement);
    };
    imageElement.src = require('../assets/city.png').default;
  }, []); // ✅ OK - This effect never re-runs

  return <KonvaImage x={0} y={0} image={image} width={1200} height={315} />;
};
