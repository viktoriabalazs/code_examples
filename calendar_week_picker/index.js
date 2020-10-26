import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Calendar from './components/Calendar';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
