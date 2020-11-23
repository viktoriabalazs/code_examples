import { connect } from 'react-redux';
import CalendarFooter from './CalendarFooter';
import { updateDate } from '../store/actions/updateDate';

const mapDispatchToProps = dispatch => ({
  onUpdateDate: (date) => {dispatch(updateDate(date))}
})

const CalendarFooterContainer = connect(null, mapDispatchToProps)(CalendarFooter);

export default CalendarFooterContainer;