import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const CalendarFooter = ({ handleClick = f => f, updateDate = f => f }) => 
  <div className="calendar__footer">
    <button type="button" className="button button--primary" onClick={() => updateDate(moment())}>
      Today
    </button>
    <button type="button" className="button" onClick={handleClick}>
      Close
    </button>
  </div>

CalendarFooter.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default CalendarFooter;