import * as React from 'react';
import { IData } from '../engine/IData';
import { Car } from './Car';
import { IConfig } from '../engine/IConfig';

export const Route = (props: { data: IData; conf: IConfig }) => {
  if (props.data == null) {
    return null;
  }
  const cars = [];
  if (props.data.cars != null) {
    for (const car of props.data.cars) {
      cars.push(
        <Car
          key={car.id}
          x={car.pos / props.conf.resolution}
          y={props.conf.routePosition}
          width={props.conf.carWidth / props.conf.resolution}
          height={props.conf.carHeight / props.conf.resolution}
        />
      );
    }
  }
  return <React.Fragment>{cars}</React.Fragment>;
};
