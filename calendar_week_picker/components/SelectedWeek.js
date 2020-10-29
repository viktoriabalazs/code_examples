import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SelectedWeek = ({ selectedDate = moment() }) => {
  const startDateOfWeek = moment(selectedDate).startOf('isoWeek').format('DD MMMM YYYY');
  const endDateOfWeek = moment(selectedDate).endOf('isoWeek').format('DD MMMM YYYY');

  return <div className="calendar__selected-week">
      <strong>Week selected:</strong><br />
      {`${startDateOfWeek} - ${endDateOfWeek}`}
    </div>
}

SelectedWeek.propTypes = {
  selectedDate: PropTypes.object.isRequired
}

export default SelectedWeek;