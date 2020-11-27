import React from 'react';
import PropTypes from 'prop-types';
import CalendarControl from './CalendarControl';
import CalendarDropdown from './CalendarDropdown';
import SelectedWeek from './SelectedWeek';
import { stateData } from '../../data/initialState';

const Calendar = ({
  collapsed = false,
  expandCollapse = f => f,
  forwardRef,
  onUpdateDate = f => f,
  onUpdateSelectedDate = f => f,
  store = stateData
}) => {
  return (
    <div className="calendar" ref={forwardRef}>
      <SelectedWeek
        selectedDate={store.selectedWeek.selectedDate}
      />
      <CalendarControl
        collapsed={collapsed}
        expandCollapse={expandCollapse}
        onUpdateDate={onUpdateDate}
        onUpdateSelectedDate={onUpdateSelectedDate}
        store={store}
      />
      <CalendarDropdown
        collapsed={collapsed}
        expandCollapse={expandCollapse}
        onUpdateDate={onUpdateDate}
        onUpdateSelectedDate={onUpdateSelectedDate}
        store={store}
      />
    </div>
  );
}

Calendar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  onUpdateDate: PropTypes.func.isRequired,
  onUpdateSelectedDate: PropTypes.func.isRequired,
  store: PropTypes.shape({
    date: PropTypes.object.isRequired,
    selectedWeek: PropTypes.shape({
      selectedDate: PropTypes.object.isRequired,
      selectedWeekNumber: PropTypes.number.isRequired,
    })
  })
}

export default Calendar;
