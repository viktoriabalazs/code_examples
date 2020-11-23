import { connect } from 'react-redux';
import CalendarControl from './CalendarControl';
import { updateDate } from '../store/actions/updateDate';
import { updateSelectedDate } from '../store/actions/updateSelectedDate';

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
});

const mapDispatchToProps = dispatch => ({
  onUpdateDate: (date) => {dispatch(updateDate(date))},
  onUpdateSelectedDate: (selectedDate, selectedWeek) => {dispatch(updateSelectedDate(selectedDate, selectedWeek))},
});

const CalendarControlContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarControl);

export default CalendarControlContainer;