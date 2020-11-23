import moment from 'moment';
import { calcNumberOfWeek } from '../utils/utils';

export const stateData = {
  date: moment(),
  selectedWeek: {
    selectedDate: moment(),
    selectedWeekNumber: calcNumberOfWeek(moment())
  }
};