import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import { stateData } from '../../data/initialState';

const CalendarDropdown = ({
  collapsed = false,
  expandCollapse = f => f,
  onUpdateDate = f => f,
  onUpdateSelectedDate = f => f,
  store = stateData
}) =>
  <div className={`calendar__dropdown ${!collapsed ? "show" : "hide"}`}>
    <CalendarHeader
      date={store.date}
      onUpdateDate={onUpdateDate}
    />
    <CalendarBody
      onUpdateSelectedDate={onUpdateSelectedDate}
      store={store}
    />
    <CalendarFooter
      handleClick={expandCollapse}
      onUpdateDate={onUpdateDate}
    />
  </div>

CalendarDropdown.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  onUpdateDate: PropTypes.func.isRequired,
  onUpdateSelectedDate: PropTypes.func.isRequired,
  store: PropTypes.shape({
    date: PropTypes.object.isRequired,
    selectedWeek: PropTypes.shape({
      selectedDate: PropTypes.object.isRequired,
      selectedWeekNumber: PropTypes.number.isRequired,
    })
  })
}

export default CalendarDropdown;