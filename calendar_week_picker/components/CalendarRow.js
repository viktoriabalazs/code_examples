import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';
import moment from 'moment';

class CalendarRow extends React.Component {

  shouldComponentUpdate(nextProps) {
    const { activeDate, isActive } = this.props;
    return isActive !== nextProps.isActive || activeDate !== nextProps.activeDate
  }

  render() {
    const {
      activeDate = moment(), 
      id = 1,
      isActive = false,
      isLastWeek = false,
      isNotCurrentMonth = false,
      nextMonthDays = [],
      prevMonthDays = [],
      updateSelectedDate = f => f,
      week = []
    } = this.props;

    return (
      <div
        id={id}
        className={`calendar__body-row ${isActive ? "active" : ""}`}
        onClick={() => updateSelectedDate(week[0])}
      >
        {week.map((day, i) =>
          <CalendarDay
            activeDate={activeDate}
            day={day.date()}
            isNextMonth={
              isNotCurrentMonth &&
              (isLastWeek && i > 7 - nextMonthDays.length - 1)
            }
            isPrevMonth={
              isNotCurrentMonth &&
              (!isLastWeek && i < prevMonthDays.length)
            }
            key={i}
          />
        )}
      </div>
    )
  }
}

CalendarRow.propTypes ={
  activeDate: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLastWeek: PropTypes.bool.isRequired,
  isNotCurrentMonth: PropTypes.bool.isRequired,
  nextMonthDays: PropTypes.array.isRequired,
  prevMonthDays: PropTypes.array.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  week: PropTypes.array.isRequired
}

export default CalendarRow;