export const updateSelectedDate = (selectedDate, selectedWeek) => dispatch => {
  dispatch({
    type: 'UPDATE_SELECTED_DATE',
    selectedDate: selectedDate,
    selectedWeekNumber: selectedWeek
  })
 }