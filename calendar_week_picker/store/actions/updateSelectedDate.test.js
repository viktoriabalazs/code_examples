import configureStore from '../store';
import moment from 'moment';
import { updateSelectedDate } from './updateSelectedDate';

describe('updateSelectedDate', () => {
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
    store.dispatch(updateSelectedDate(newDate, 30));
  });

  it('should update selectedDate', () => {
    const selectedDate = store.getState().selectedWeek.selectedDate;
    expect(selectedDate).toEqual(newDate);
  });

  it('schould update selectedWeekNumber', () => {
    const selectedWeekNumber = store.getState().selectedWeek.selectedWeekNumber;
    expect(selectedWeekNumber).toBe(30);
  });
});