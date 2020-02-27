import * as React from 'react';
import { Engine } from '../engine/engine';
import { IConfig } from '../engine/IConfig';

let engine: Engine = null;

export function useEngine(conf: IConfig): Engine {
  if (engine == null) {
    engine = new Engine(conf);
  }
  return engine;
}
