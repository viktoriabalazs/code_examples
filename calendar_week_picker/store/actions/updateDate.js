export const updateDate = (date) => dispatch => {
  dispatch({
   type: 'UPDATE_DATE',
   date: date
  })
 }