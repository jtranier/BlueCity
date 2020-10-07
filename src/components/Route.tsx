import * as React from 'react';
import { Car } from './Car';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';
import { MeasuringTape } from './MeasuringTape';

export const Route = (props: {}) => {
  const config = useConfig();
  const data = useData();
  if (data == null) {
    return null;
  }
  const cars = [];
  const routeY = 274+58;

  if (data.cars != null) {
    for (const car of data.cars) {
      cars.push(
        <Car
          key={car.id}
          x={car.pos / config.resolution}
          y={routeY}
          width={config.carWidth / config.resolution}
          height={config.carHeight / config.resolution}
        />
      );
    }
  }
  return (
    <React.Fragment>
      <MeasuringTape y={routeY} />
      {cars}
    </React.Fragment>
  );
};
