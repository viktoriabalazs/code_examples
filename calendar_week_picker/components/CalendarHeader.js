import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CalendarHeader = ({
    date = moment(),
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
      {date.format('MMMM')} {date.year()}
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
  date: PropTypes.object.isRequired,
  getNextMonth: PropTypes.func.isRequired,
  getPrevMonth: PropTypes.func.isRequired
}

export default CalendarHeader;