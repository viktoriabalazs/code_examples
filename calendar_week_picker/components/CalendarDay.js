import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

const CalendarDay = ({
  activeDate = new Date(),
  day = 1,
  isNextMonth = false,
  isPrevMonth = false
}) => {
    const currentMonth = !isPrevMonth && !isNextMonth;
    const today = new Date();

    const isToday =
      currentMonth &&
      today.getFullYear() === activeDate.getFullYear() &&
      today.getMonth() === activeDate.getMonth() &&
      today.getDate() === day;

    const classNameDay = classNames(
      {
        'calendar__body-item--curr': currentMonth,
         'calendar__body-item--prev': isPrevMonth,
         'calendar__body-item--next': isNextMonth,
         'today': isToday
      }
    );

    return (
      <div
        className={classNameDay}
        id={
          isPrevMonth ? `prevD${day}`
          : isNextMonth ? `nextD${day}`
          : `currD${day}`
        }
      >
        <span></span>
        {day}
      </div>    
    )
}

CalendarDay.propTypes = {
  activeDate: PropTypes.object.isRequired,
  day: PropTypes.number.isRequired,
  isNextMonth: PropTypes.bool.isRequired,
  isPrevMonth: PropTypes.bool.isRequired
}

export default CalendarDay;
