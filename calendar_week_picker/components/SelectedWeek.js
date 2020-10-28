import React from 'react';
import PropTypes from 'prop-types';

const SelectedWeek = ({ dataSet = {}, selectedDate = new Date() }) => {
  const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 6);
  const startDateOfWeek = `${selectedDate.getDate()} ${dataSet.months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  const endDateOfWeek = `${endDate.getDate()} ${dataSet.months[endDate.getMonth()]} ${endDate.getFullYear()}`;

  const text = `${startDateOfWeek} - ${endDateOfWeek}`;

  return <div className="calendar__selected-week">
      <strong>Week selected:</strong><br />
      {text}
    </div>
}

SelectedWeek.propTypes = {
  dataSet: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired
}

export default SelectedWeek;