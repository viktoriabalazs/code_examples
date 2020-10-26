import React from 'react';
import PropTypes from 'prop-types';
import CalendarRow from './CalendarRow';

const DayNames = ({ days }) =>
  <div className="calendar__days">
    {days.map((day, i) =>
      <div className="calendar__days-item" key={i}>{day}</div>
    )}
  </div>

const CalendarBody = ({
  activeDate = new Date(),
  calcNumberOfWeek = f => f,
  dataSet = [],
  selectedDate = new Date(),
  selectedWeekNumber = 1,
  updateSelectedDate = f => f
}) => {
  const getNumberOfDaysInMonth = (year, month) => {
    const date = new Date(year, month, 32);
    const daysNumber = 32 - date.getDate();
    return daysNumber;
  };

  const getStartDayOfMonth = (year, month) => {
    const day = new Date(year,month,1).getDay();
    return day === 0 ? 7 : day;
  };

  const getDaysInMonth = (iteration, day) => {
    const days = [];
    for(let i = 0; i < iteration; i++) {
      days.push(!day ? i + 1 : day + i + 1);
    }
    return days;
  };

  const weeksWithDays = () => {
    const weeks = [];
    for(let i = 0; i < days.length; i += 7) {
      let week = days.slice(i, i + 7);
      weeks.push(week);
    }
    return weeks;
  };

  const currentMonthStartDay = getStartDayOfMonth(activeDate.getFullYear(),activeDate.getMonth());
  const nextMonthStartDay = getStartDayOfMonth(activeDate.getFullYear(),activeDate.getMonth() + 1);
  const currentMonthNumberOfDays = getNumberOfDaysInMonth(activeDate.getFullYear(), activeDate.getMonth());
  const previousMonthNumberOfDays = getNumberOfDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() - 1);

  const prevMonthDays = getDaysInMonth(currentMonthStartDay - 1, previousMonthNumberOfDays - currentMonthStartDay + 1).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, day));
  const currentMonthDays = getDaysInMonth(currentMonthNumberOfDays).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth(), day));
  const nextMonthDays = nextMonthStartDay === 1 ? [] : getDaysInMonth(7 - nextMonthStartDay + 1).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, day));

  const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const id = calcNumberOfWeek(new Date(activeDate.getFullYear(), activeDate.getMonth(), 1));

  const calendarRows = weeksWithDays().map((week, i) => {
    const currentId = id + i === 53 ? 1 : id + i;
    
    const isActive = () => {
      let date = activeDate;

      if(activeDate.getMonth() === 0 && activeDate.getDay() !== 1 && selectedWeekNumber === 1) {
        date = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate() - 1);
      }
      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        selectedWeekNumber === currentId
      )
    }

    return (
      <CalendarRow
        activeDate={activeDate}
        id={currentId}
        isActive={isActive()}
        isLastWeek={i === weeksWithDays().length - 1}
        isNotCurrentMonth={
          (prevMonthDays.length !== 0 && i === 0) ||
          (nextMonthDays.length !== 0 && i === weeksWithDays().length - 1)
        }
        key={i}
        next={nextMonthDays}
        prev={prevMonthDays}
        updateSelectedDate={updateSelectedDate}
        week={week}
      />
    )
  });

  return (
    <React.Fragment>
      {dataSet.map((data, i) =>
        <DayNames key={i} {...data} />
      )}
      <div className="calendar__body">
        {calendarRows}
      </div>
    </React.Fragment> 
  )
}

CalendarBody.propTypes = {
  activeDate: PropTypes.object.isRequired,
  calcNumberOfWeek: PropTypes.func.isRequired,
  dataSet: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

export default CalendarBody;
