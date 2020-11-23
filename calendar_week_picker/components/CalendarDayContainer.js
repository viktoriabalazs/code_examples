import { connect } from 'react-redux';
import CalendarDay from './CalendarDay';

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
});

const CalendarDayContainer = connect(mapStateToProps)(CalendarDay);

export default CalendarDayContainer;