import * as React from 'react';
import { appContext } from '../AppContext';
import { Engine } from '../engine/Engine';

export function useEngine(): Engine {
  const context = React.useContext(appContext);
  return context.engine;
}
