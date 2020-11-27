import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { calcNumberOfWeek } from '../../utils/utils';
import { stateData } from '../../data/initialState';
import Button from '../Button/Button';

const CalendarControl = ({
  collapsed = false,
  expandCollapse = f => f,
  onUpdateDate = f => f,
  onUpdateSelectedDate = f => f,
  store = stateData
}) => {
  const { date, selectedWeek } = store;
  const endDateOfWeek = moment(selectedWeek.selectedDate).endOf('isoWeek');
  const prevWeek = moment(selectedWeek.selectedDate).subtract(1, 'weeks');
  const nextWeek = moment(selectedWeek.selectedDate).add(1, 'weeks');

  const updateWeek = (week) => {
    onUpdateSelectedDate(week, calcNumberOfWeek(week));
    if(moment(date).startOf('month') !== moment(week).startOf('month')) {
      onUpdateDate(moment(week).startOf('month'));
    }
  }

  return (
  <div className="calendar__control button-group">
    <div>
      <Button
        appearance="secondary"
        control={true}
        icon={true}
        onClick={() => updateWeek(prevWeek)}
      >
        <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
      </Button>
      <Button
        active={!collapsed}
        appearance="secondary"
        center={true}
        onClick={expandCollapse}
      >
        {`W${selectedWeek.selectedWeekNumber}: ${moment(selectedWeek.selectedDate).format('MMM')} ${moment(selectedWeek.selectedDate).date()} - ${endDateOfWeek.format('MMM')} ${endDateOfWeek.date()}`}
      </Button>
      <Button
        appearance="secondary"
        control={true}
        icon={true}
        onClick={() => updateWeek(nextWeek)}
      >
        <img src="images/icon_arrow_right.png" alt="Prev" height="14" width="8" />
      </Button>
    </div>
  </div>
  )
}

CalendarControl.propTypes = {
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

export default CalendarControl;