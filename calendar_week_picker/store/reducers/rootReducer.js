import { combineReducers } from 'redux';
import { date } from './dateReducer';
import { selectedWeek } from './selectedWeekReducer';

export default combineReducers({
  date,
  selectedWeek
})