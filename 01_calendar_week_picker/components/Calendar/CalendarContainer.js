import { connect } from 'react-redux';
import Calendar from './Calendar';
import { updateDate } from '../../store/actions/updateDate';
import { updateSelectedDate } from '../../store/actions/updateSelectedDate';
import Expandable from '../hoc/Expandable';

const mapStateToProps = (state, props) => ({
  store: state,
  ...props
});

const mapDispatchToProps = dispatch => ({
  onUpdateDate: (date) => {dispatch(updateDate(date))},
  onUpdateSelectedDate: (selectedDate, selectedWeek) => {dispatch(updateSelectedDate(selectedDate, selectedWeek))},
});

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Expandable(CalendarContainer);