import React from 'react';
import PropTypes from 'prop-types';
import CalendarRow from './CalendarRow';
import moment from 'moment';
import { calcNumberOfWeek } from '../../utils/utils';
import { stateData } from '../../data/initialState';

const DayNames = ({ weekArray }) =>
  <div className="calendar__days">
    {weekArray.map((day, i) =>
      <div className="calendar__days-item" key={i}>{day}</div>
    )}
  </div>

const CalendarBody = ({
  onUpdateSelectedDate = f => f,
  store = stateData
}) => {
  const { selectedDate, selectedWeekNumber } = store.selectedWeek;
  const { date } = store;
  const getStartDayOfMonth = (date) => {
    const day = date.startOf('month').day();
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

  const currentMonthStartDay = getStartDayOfMonth(date);
  const nextMonthStartDay = getStartDayOfMonth(moment(date).add(1, 'months'));
  const currentMonthNumberOfDays = date.daysInMonth();
  const prevMonthNumberOfDays = moment(date).subtract(1, 'months').daysInMonth();
  const prevMonthDays = getDaysInMonth(currentMonthStartDay - 1, prevMonthNumberOfDays - currentMonthStartDay + 1)
    .map(day => moment(date).subtract(1, 'months').set('date', day));
  const currentMonthDays = getDaysInMonth(currentMonthNumberOfDays)
    .map(day => moment(date).set('date', day));
  const nextMonthDays = nextMonthStartDay !== 1
    ? getDaysInMonth(7 - nextMonthStartDay + 1)
      .map(day => moment(date).add(1, 'months').set('date', day))
    : [];

  const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const calendarRows = weeksWithDays().map((week, i) => {
    const currentMonthStartDate = moment(date).startOf('month');
    const id = calcNumberOfWeek(moment(currentMonthStartDate).add(i, 'weeks'));
    
    const isActive = () => {
      let date = moment(currentMonthStartDate);

      if(date.day() !== 1 && calcNumberOfWeek(selectedDate) > calcNumberOfWeek(moment(selectedDate).add(1, 'weeks'))) {
        date = moment(date).subtract(1, 'days');
      }

      return (
        date.year() === selectedDate.year() &&
        selectedWeekNumber === id
      )
    }

    return (
      <CalendarRow
        date={date}
        id={id}
        isActive={isActive()}
        isLastWeek={i === weeksWithDays().length - 1}
        isNotCurrentMonth={
          (prevMonthDays.length !== 0 && i === 0) ||
          (nextMonthDays.length !== 0 && i === weeksWithDays().length - 1)
        }
        key={i}
        nextMonthDays={nextMonthDays}
        onUpdateSelectedDate={onUpdateSelectedDate}
        prevMonthDays={prevMonthDays}
        week={week}
      />
    )
  });

  const weekArray = moment.weekdaysShort();
  const weekArrayFirstItem = weekArray.shift();
  const weekArrayStartWithMonday = [...weekArray, weekArrayFirstItem];

  return (
    <React.Fragment>
      <DayNames weekArray={weekArrayStartWithMonday} />
      <div className="calendar__body">
        {calendarRows}
      </div>
    </React.Fragment> 
  )
}

CalendarBody.propTypes = {
  onUpdateSelectedDate: PropTypes.func.isRequired,
  store: PropTypes.shape({
    date: PropTypes.object.isRequired,
    selectedWeek: PropTypes.shape({
      selectedDate: PropTypes.object.isRequired,
      selectedWeekNumber: PropTypes.number.isRequired,
    })
  })
}

export default CalendarBody;
