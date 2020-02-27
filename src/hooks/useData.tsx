import * as React from 'react';
import { appContext } from '../AppContext';
import { IData } from '../engine/IData';

export function useData(): IData {
  const context = React.useContext(appContext);
  return context.data;
}
