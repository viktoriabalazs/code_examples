import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { stateData } from '../data/initialState';

export default function configureStore(initialState = stateData) {
 return createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
 );
}