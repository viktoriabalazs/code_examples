export const date = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_DATE':
      return action.date
    default:
      return state
  }
}