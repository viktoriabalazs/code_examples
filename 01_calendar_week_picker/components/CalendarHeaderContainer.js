import { connect } from 'react-redux';
import CalendarHeader from './CalendarHeader';
import { updateDate } from '../store/actions/updateDate';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  onUpdateDate: (date) => {dispatch(updateDate(date))}
});

const CalendarHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarHeader);

export default CalendarHeaderContainer;