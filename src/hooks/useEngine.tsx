import * as React from 'react';
import { appContext } from '../AppContext';
import { Engine } from '../engine/engine';

export function useEngine(): Engine {
  const context = React.useContext(appContext);
  console.log(context);
  return context.engine;
}
