import * as React from 'react';
import { Engine, IEngineProps } from '../engine/engine';

let engine: Engine = null;

export function useEngine(props: IEngineProps): Engine {
  if (engine == null) {
    engine = new Engine(props);
  }
  return engine;
}
