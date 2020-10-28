import React from 'react';
import PropTypes from 'prop-types';

const CalendarFooter = ({ handleClick = f => f }) => 
  <div className="calendar__footer">
    <button type="button" className="button" onClick={handleClick}>Close</button>
  </div>

CalendarFooter.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default CalendarFooter;