import { connect } from 'react-redux';
import CalendarRow from './CalendarRow';
import { updateSelectedDate } from '../store/actions/updateSelectedDate';

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
});

const mapDispatchToProps = dispatch => ({
  onUpdateSelectedDate: (selectedDate, selectedWeek) => {dispatch(updateSelectedDate(selectedDate, selectedWeek))}
});

const CalendarRowContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarRow);

export default CalendarRowContainer;