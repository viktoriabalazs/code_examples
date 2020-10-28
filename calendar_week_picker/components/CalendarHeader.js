import React from 'react';
import PropTypes from 'prop-types';

const CalendarHeader = ({
    dataSet = {},
    date = new Date(),
    getNextMonth = f => f,
    getPrevMonth = f => f
  }) =>
  <div className="calendar__header">
    <button
      type="button"
      className="button button--control button--icon"
      onClick={getPrevMonth}
    >
      <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
    </button>
    <div>
      {dataSet.months[date.getMonth()]} {date.getFullYear()}
    </div>
    <button
      type="button"
      className="button button--control button--icon"
      onClick={getNextMonth}
    >
      <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
    </button>
  </div>

CalendarHeader.propTypes = {
  dataSet: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  getNextMonth: PropTypes.func.isRequired,
  getPrevMonth: PropTypes.func.isRequired
}

export default CalendarHeader;