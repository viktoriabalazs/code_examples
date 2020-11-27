import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button/Button';

const CalendarFooter = ({
  handleClick = f => f,
  onUpdateDate = f => f
}) => 
  <div className="calendar__footer">
    <Button
      onClick={() => onUpdateDate(moment())}
    >
      Today
    </Button>
    <Button
      appearance="secondary"
      onClick={handleClick}
    >
      Close
    </Button>
  </div>

CalendarFooter.propTypes = {
  handleClick: PropTypes.func.isRequired,
  onUpdateDate: PropTypes.func.isRequired
}

export default CalendarFooter;