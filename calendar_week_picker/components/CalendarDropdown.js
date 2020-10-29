import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import moment from 'moment';

const CalendarDropdown = ({
  calcNumberOfWeek = f => f,
  collapsed = false,
  date = moment(),
  expandCollapse = f => f,
  getNextMonth = f => f,
  getPrevMonth = f => f,
  selectedDate = moment(),
  selectedWeekNumber = 1,
  updateDate = f => f,
  updateSelectedDate = f => f
}) =>
  <div className={`calendar__dropdown ${!collapsed ? "show" : "hide"}`}>
    <CalendarHeader
      date={date}
      getNextMonth={getNextMonth}
      getPrevMonth={getPrevMonth}
    />
    <CalendarBody
      activeDate={date}
      calcNumberOfWeek={calcNumberOfWeek}
      selectedDate={selectedDate}
      selectedWeekNumber={selectedWeekNumber}
      updateSelectedDate={updateSelectedDate}
    />
    <CalendarFooter
      handleClick={expandCollapse}
      updateDate={updateDate}
    />
  </div>

CalendarDropdown.propTypes = {
  calcNumberOfWeek: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  getNextMonth: PropTypes.func.isRequired,
  getPrevMonth: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

export default CalendarDropdown;