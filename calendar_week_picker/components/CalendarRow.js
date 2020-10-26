import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';

class CalendarRow extends React.Component {

  shouldComponentUpdate(nextProps) {
    const { activeDate, isActive } = this.props;
    return isActive !== nextProps.isActive || activeDate !== nextProps.activeDate
  }

  render() {
    const {
      activeDate = new Date(), 
      id = 1,
      isActive = false,
      isLastWeek = false,
      isNotCurrentMonth = false,
      next = [],
      prev = [],
      updateSelectedDate = f => f,
      week = []
    } = this.props;

    return (
      <div
        id={id}
        className={`calendar__body-row ${isActive ? "active" : ""}`}
        onClick={() => updateSelectedDate(new Date(week[0]))}
      >
        {week.map((day, i) =>
          <CalendarDay
            activeDate={activeDate}
            day={day.getDate()}
            isNextMonth={
              isNotCurrentMonth &&
              (isLastWeek && i > 7 - next.length - 1)
            }
            isPrevMonth={
              isNotCurrentMonth &&
              (!isLastWeek && i < prev.length)
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
  next: PropTypes.array.isRequired,
  prev: PropTypes.array.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  week: PropTypes.array.isRequired
}

export default CalendarRow;