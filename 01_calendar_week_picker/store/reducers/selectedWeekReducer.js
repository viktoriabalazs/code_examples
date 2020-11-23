import { selectedDate } from '../reducers/selectedDateReducer';

export const selectedWeek = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DATE':
      return selectedDate({}, action)
    default:
      return state
  }
}