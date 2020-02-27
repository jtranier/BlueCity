import * as React from 'react';
import { Engine } from './engine/Engine';
import { IConfig } from './engine/IConfig';
import { IData } from './engine/IData';

// App context interface
export interface IAppContext {
  engine: Engine;
  config: IConfig;
  data: IData;
}

// App context
export const appContext = React.createContext<IAppContext>({
  engine: null,
  config: null,
  data: null
});
