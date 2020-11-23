import { connect } from 'react-redux';
import SelectedWeek from './SelectedWeek';

const mapStateToProps = state => ({
  selectedDate: state.selectedWeek.selectedDate
 });

const SelectedWeekContainer = connect(mapStateToProps)(SelectedWeek);

export default SelectedWeekContainer;