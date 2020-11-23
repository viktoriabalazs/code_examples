import { date } from './dateReducer'; 
import moment from 'moment';

describe('Date reducer', () => {
  it('UPDATE_DATE', () => {
    const state = {};
    const action = {
      type: 'UPDATE_DATE',
      date: moment('2016-03-06').toString()
    };
    const result = date(state, action);
    expect(result)
      .toEqual(action.date);
  });
});