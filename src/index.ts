import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

const ReactElement = React.createElement(App);
ReactDOM.render(ReactElement, document.getElementById('root'));
