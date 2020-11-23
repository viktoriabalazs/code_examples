export const selectedDate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_DATE':
      return {
        selectedDate: action.selectedDate,
        selectedWeekNumber: action.selectedWeekNumber
      }
    default:
      return state
  }
}