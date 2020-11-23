import { connect } from 'react-redux';
import CalendarBody from './CalendarBody';

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
});

const CalendarBodyContainer = connect(mapStateToProps)(CalendarBody);

export default CalendarBodyContainer;