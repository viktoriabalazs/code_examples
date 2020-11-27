import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import './scss/main.scss';
import CalendarContainer from './components/Calendar/CalendarContainer';

const ref = React.createRef();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <CalendarContainer ref={ref} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);