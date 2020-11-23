import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { calcNumberOfWeek } from '../utils/utils';

const CalendarControl = ({
  collapsed = false,
  date = moment(),
  expandCollapse = f => f,
  onUpdateDate = f => f,
  onUpdateSelectedDate = f => f,
  selectedWeek
}) => {
  const { selectedDate, selectedWeekNumber } = selectedWeek;
  const endDateOfWeek = moment(selectedDate).endOf('isoWeek');
  const prevWeek = moment(selectedDate).subtract(1, 'weeks');
  const nextWeek = moment(selectedDate).add(1, 'weeks');

  const updateWeek = (week) => {
    onUpdateSelectedDate(week, calcNumberOfWeek(week));
    if(moment(date).startOf('month') !== moment(week).startOf('month')) {
      onUpdateDate(moment(week).startOf('month'));
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
        {`W${selectedWeekNumber}: ${moment(selectedDate).format('MMM')} ${moment(selectedDate).date()} - ${endDateOfWeek.format('MMM')} ${endDateOfWeek.date()}`}
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
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  onUpdateDate: PropTypes.func.isRequired,
  onUpdateSelectedDate: PropTypes.func.isRequired,
  selectedWeek: PropTypes.object.isRequired
}

export default CalendarControl;