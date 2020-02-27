import * as React from 'react';
import { appContext } from '../AppContext';
import { IConfig } from '../engine/IConfig';

export function useConfig(): IConfig {
  const context = React.useContext(appContext);
  return context.config;
}
