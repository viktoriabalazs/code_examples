import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/store';
import './index.scss';
import Calendar from './components/Calendar';
import * as serviceWorker from './serviceWorker';

const ref = React.createRef();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <Calendar ref={ref} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
