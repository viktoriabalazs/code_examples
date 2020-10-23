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
    let date = new Date(year, month, 32);
    let daysNumber = 32 - date.getDate();
    return daysNumber;
  };

  const getStartDayOfMonth = (year, month) => {
    let day = new Date(year,month,1).getDay();
    return day === 0 ? 7 : day;
  };

  const getDaysInMonth = (iteration, day) => {
    let days = [];
    for(let i = 0; i < iteration; i++) {
      days.push(!day ? i + 1 : day + i + 1);
    }
    return days;
  };

  const weeksWithDays = () => {
    let weeks = [];
    for(let i = 0; i < days.length; i += 7) {
      let week = days.slice(i, i + 7);
      weeks.push(week);
    }
    return weeks;
  };

  let currentMonthStartDay = getStartDayOfMonth(activeDate.getFullYear(),activeDate.getMonth());
  let nextMonthStartDay = getStartDayOfMonth(activeDate.getFullYear(),activeDate.getMonth() + 1);
  let currentMonthNumberOfDays = getNumberOfDaysInMonth(activeDate.getFullYear(), activeDate.getMonth());
  let previousMonthNumberOfDays = getNumberOfDaysInMonth(activeDate.getFullYear(), activeDate.getMonth() - 1);

  let prevMonthDays = getDaysInMonth(currentMonthStartDay - 1, previousMonthNumberOfDays - currentMonthStartDay + 1).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, day));
  let currentMonthDays = getDaysInMonth(currentMonthNumberOfDays).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth(), day));
  let nextMonthDays = nextMonthStartDay === 1 ? [] : getDaysInMonth(7 - nextMonthStartDay + 1).map(day => new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, day));

  let days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  let id = calcNumberOfWeek(new Date(activeDate.getFullYear(), activeDate.getMonth(), 1));

  const calendarRows = weeksWithDays().map((week, i) =>
      <CalendarRow
        activeDate={activeDate}
        id={id + i === 53 ? 1 : id + i}
        isLastWeek={i === weeksWithDays().length - 1}
        isNotCurrentMonth={
          (prevMonthDays.length && i === 0) ||
          (nextMonthDays.length && i === weeksWithDays().length - 1)
        }
        week={week}
        key={i}
        prev={prevMonthDays}
        next={nextMonthDays}
        selectedDate={selectedDate}
        selectedWeekNumber={selectedWeekNumber}
        updateSelectedDate={updateSelectedDate}
      />
  );

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
