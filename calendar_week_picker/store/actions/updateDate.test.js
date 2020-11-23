import configureStore from '../store';
import moment from 'moment';
import { updateDate } from './updateDate';

describe('updateDate', () => {
  let store;
  const data = {
    date: moment('2016-02-01'),
    selectedWeek: {
      selectedDate: moment('2016-02-01'),
      selectedWeekNumber: 7
    }
  };
  const newDate = moment('2020-05-08').toString();

  beforeAll(() => {
    store = configureStore(data);
    store.dispatch(updateDate(newDate));
  });

  it('should update date', () => {
    const date = store.getState().date;
    expect(date).toEqual(newDate);
  });
});