import React from 'react';
import PropTypes from 'prop-types';

const CalendarControl = ({
  activeDate = new Date(),
  dataSet = [],
  handleClick = f => f,
  show = true,
  selectedDate = new Date(),
  selectedWeekNumber = 0,
  updateDate = f => f,
  updateSelectedDate = f => f
}) => {
  let endDateOfWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 6);
  let prevWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7);
  let nextWeek = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7);

  const updateWeek = (week) => {
    updateSelectedDate(week)
    if(activeDate.getFullYear() !== week.getFullYear() || activeDate.getMonth() !== week.getMonth()) {
      updateDate(new Date(week.getFullYear(), week.getMonth(), 1))
    }
  }

  return (
  <div className="calendar__control button-group">
    <div>
      <button
        type="button"
        className="button button--control button--icon"
        onClick={() => updateWeek(prevWeek)}
      >
        <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
      </button>
      <button
        type="button"
        className={`button button--center ${show ? " active" : ""}`}
        onClick={handleClick}
      >
        {`W${selectedWeekNumber}: ${dataSet[0].months[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getDate()} - ${dataSet[0].months[endDateOfWeek.getMonth()].slice(0, 3)} ${endDateOfWeek.getDate()}`}
      </button>
      <button
        type="button"
        className="button button--control button--icon"
        onClick={() => updateWeek(nextWeek)}
      >
        <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
      </button>
    </div>
  </div>
  )
}

CalendarControl.propTypes = {
  activeDate: PropTypes.object.isRequired,
  dataSet: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  selectedDate: PropTypes.object.isRequired,
  selectedWeekNumber: PropTypes.number.isRequired,
  updateDate: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired
}

export default CalendarControl;