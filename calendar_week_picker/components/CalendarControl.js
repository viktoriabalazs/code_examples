import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CalendarControl = ({
  activeDate = moment(),
  collapsed = false,
  expandCollapse = f => f,
  selectedDate = moment(),
  selectedWeekNumber = 0,
  updateDate = f => f,
  updateSelectedDate = f => f
}) => {
  const endDateOfWeek = moment(selectedDate).endOf('isoWeek');
  const prevWeek = moment(selectedDate).subtract(1, 'weeks');
  const nextWeek = moment(selectedDate).add(1, 'weeks');

  const updateWeek = (week) => {
    updateSelectedDate(week)
    if(moment(activeDate).startOf('month') !== moment(week).startOf('month')) {
      updateDate(moment(week).startOf('month'));
    }
  }

  return (
  <div className="calendar__control button-group">
    <div>
      <button
        type="button"
        className="button button--control button--icon"
        onClick={() => updateWeek(prevWeek)}
      >
        <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
      </button>
      <button
        type="button"
        className={`button button--center ${!collapsed ? " active" : ""}`}
        onClick={expandCollapse}
      >
        {`W${selectedWeekNumber}: ${selectedDate.format('MMM')} ${selectedDate.date()} - ${endDateOfWeek.format('MMM')} ${endDateOfWeek.date()}`}
      </button>
      <button
        type="button"
        className="button button--control button--icon"
        onClick={() => updateWeek(nextWeek)}
      >
        <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
      </button>
    </div>
  </div>
  )
}

CalendarControl.propTypes = {
  activeDate: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

export default CalendarControl;