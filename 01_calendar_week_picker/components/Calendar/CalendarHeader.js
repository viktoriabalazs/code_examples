import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button/Button';

const CalendarHeader = ({
    date = moment(),
    onUpdateDate = f => f
  }) => {
    const getPrevMonth = (date) => {
      const currentDate = date;
      const activeDate = moment(currentDate).subtract(1, 'months');
      onUpdateDate(activeDate);
    }
    const getNextMonth = (date) => {
      const currentDate = date;
      const activeDate = moment(currentDate).add(1, 'months');
      onUpdateDate(activeDate);
    }
    
    return (
      <div className="calendar__header">
        <Button
          appearance="secondary"
          control={true}
          icon={true}
          onClick={() => getPrevMonth(date)}
        >
          <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
        </Button>
        <div>
          {date.format('MMMM')} {date.year()}
        </div>
        <Button
          appearance="secondary"
          control={true}
          icon={true}
          onClick={() => getNextMonth(date)}
        >
          <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
        </Button>
      </div>
    )
  }

CalendarHeader.propTypes = {
  date: PropTypes.object.isRequired,
  onUpdateDate: PropTypes.func.isRequired
}

export default CalendarHeader;