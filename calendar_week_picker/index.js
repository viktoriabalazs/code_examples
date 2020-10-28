import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Calendar from './components/Calendar';
import * as serviceWorker from './serviceWorker';

const ref = React.createRef();

ReactDOM.render(
  <React.StrictMode>
    <Calendar ref={ref} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
