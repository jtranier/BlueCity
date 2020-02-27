import * as React from 'react';
import { IData } from '../engine/IData';
import { Car } from './Car';

export const Route = (props: {data: IData, resolution: number, y: number}) => {
  if (props.data == null) {
    return null;
  }
  const cars = [];
  if (props.data.cars != null) {
  for (const car of props.data.cars) {
    cars.push(<Car 
      x={car.pos / props.resolution}
      y={props.y}
    />)
  }
}
  return (
    <React.Fragment>{cars}</React.Fragment>
  );
}