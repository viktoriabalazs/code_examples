import React from 'react';
import PropTypes from 'prop-types';
import CalendarControlContainer from './CalendarControlContainer';
import CalendarDropdown from './CalendarDropdown';
import Expandable from './hoc/Expandable';
import SelectedWeekContainer from './SelectedWeekContainer';

const Calendar = ({
  collapsed = false,
  expandCollapse = f => f,
  forwardRef
}) => {
  return (
    <div className="calendar" ref={forwardRef}>
      <SelectedWeekContainer />
      <CalendarControlContainer
        collapsed={collapsed}
        expandCollapse={expandCollapse}
      />
      <CalendarDropdown
        collapsed={collapsed}
        expandCollapse={expandCollapse}
      />
    </div>
  );
}

CalendarDropdown.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  expandCollapse: PropTypes.func.isRequired,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}

export default Expandable(Calendar);
