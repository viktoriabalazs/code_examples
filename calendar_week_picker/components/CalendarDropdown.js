import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';

const CalendarDropdown = ({
  calcNumberOfWeek = f => f,
  collapsed = false,
  dataSet = {},
  date = new Date(),
  expandCollapse = f => f,
  getNextMonth = f => f,
  getPrevMonth = f => f,
  selectedDate = new Date(),
  selectedWeekNumber = 1,
  updateSelectedDate = f => f
}) =>
  <div className={`calendar__dropdown ${!collapsed ? "show" : "hide"}`}>
    <CalendarHeader
      dataSet={dataSet}
      date={date}
      getNextMonth={getNextMonth}
      getPrevMonth={getPrevMonth}
    />
    <CalendarBody
      activeDate={date}
      calcNumberOfWeek={calcNumberOfWeek}
      dataSet={dataSet}
      selectedDate={selectedDate}
      selectedWeekNumber={selectedWeekNumber}
      updateSelectedDate={updateSelectedDate}
    />
    <CalendarFooter
      handleClick={expandCollapse}
    />
  </div>

CalendarDropdown.propTypes = {
  calcNumberOfWeek: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  dataSet: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  getNextMonth: PropTypes.func.isRequired,
  getPrevMonth: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

export default CalendarDropdown;