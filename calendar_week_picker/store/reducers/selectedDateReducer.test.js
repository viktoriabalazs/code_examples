import { selectedDate as reducer } from './selectedDateReducer'; 
import moment from 'moment';

describe('Selected date reducer', () => {
  it('UPDATE_SELECTED_DATE', () => {
    const state = {};
    const action = {
      type: 'UPDATE_SELECTED_DATE',
      selectedDate: moment('2016-03-06').toString(),
      selectedWeekNumber: 3
    };
    const result = reducer(state, action);
    expect(result)
      .toEqual({
        selectedDate: action.selectedDate,
        selectedWeekNumber: 3
      });
  });
});