import React from 'react';
import PropTypes from 'prop-types';
import CalendarHeaderContainer from './CalendarHeaderContainer';
import CalendarBodyContainer from './CalendarBodyContainer';
import CalendarFooterContainer from './CalendarFooterContainer';

const CalendarDropdown = ({
  collapsed = false,
  expandCollapse = f => f
}) =>
  <div className={`calendar__dropdown ${!collapsed ? "show" : "hide"}`}>
    <CalendarHeaderContainer />
    <CalendarBodyContainer />
    <CalendarFooterContainer
      handleClick={expandCollapse}
    />
  </div>

CalendarDropdown.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  expandCollapse: PropTypes.func.isRequired
}

export default CalendarDropdown;