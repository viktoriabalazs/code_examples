import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';

const CalendarRow = ({
  activeDate = new Date(),
  id = 1,
  isLastWeek = false,
  isNotCurrentMonth = false,
  next = [],
  prev = [],
  week = [],
  selectedDate = new Date(),
  selectedWeekNumber = 1,
  updateSelectedDate = f => f
}) => {
  const isActive = () => {
    let date = activeDate;
    if(activeDate.getMonth() === 0 && activeDate.getDay() !== 1 && selectedWeekNumber === 1) {
      date = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() - 1);
    }
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      selectedWeekNumber === id ? 'active' : ''
    )
  }

  return (
  <div
    id={id}
    className={`calendar__body-row ${isActive()}`}
    onClick={() => updateSelectedDate(new Date(week[0]))}
  >
    {week.map((day, i) =>
      <CalendarDay
        activeDate={activeDate}
        day={day.getDate()}
        isPrevMonth={
          isNotCurrentMonth &&
          (!isLastWeek && i < prev.length)
        }
        isNextMonth={
          isNotCurrentMonth &&
          (isLastWeek && i > 7 - next.length - 1)
        }
        key={i}
      />
    )}
  </div>
  )
}

CalendarRow.propTypes ={
  activeDate: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isLastWeek: PropTypes.bool.isRequired,
  isNotCurrentMonth: PropTypes.bool.isRequired,
  next: PropTypes.array.isRequired,
  prev: PropTypes.array.isRequired,
  week: PropTypes.array.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired
}

export default CalendarRow;