import React from 'react';
import PropTypes from 'prop-types';
import CalendarDayContainer from './CalendarDayContainer';
import { calcNumberOfWeek } from '../utils/utils';

class CalendarRow extends React.Component {

  shouldComponentUpdate(nextProps) {
    const { date, isActive } = this.props;
    return isActive !== nextProps.isActive || date !== nextProps.date
  }

  render() {
    const {
      id = 1,
      isActive = false,
      isLastWeek = false,
      isNotCurrentMonth = false,
      nextMonthDays = [],
      prevMonthDays = [],
      onUpdateSelectedDate = f => f,
      week = []
    } = this.props;

    const updateSelectedDate = () => {
      onUpdateSelectedDate(week[0], calcNumberOfWeek(week[0]));
    };

    return (
      <div
        id={id}
        className={`calendar__body-row ${isActive ? "active" : ""}`}
        onClick={() => updateSelectedDate()}
      >
        {week.map((day, i) =>
          <CalendarDayContainer
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

CalendarRow.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLastWeek: PropTypes.bool.isRequired,
  isNotCurrentMonth: PropTypes.bool.isRequired,
  nextMonthDays: PropTypes.array.isRequired,
  prevMonthDays: PropTypes.array.isRequired,
  onUpdateSelectedDate: PropTypes.func.isRequired,
  week: PropTypes.array.isRequired
}

export default CalendarRow;