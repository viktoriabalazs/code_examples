import React from 'react';
import CalendarControl from './CalendarControl';
import CalendarDropdown from './CalendarDropdown';
import Expandable from '../hoc/Expandable';
import SelectedWeek from './SelectedWeek';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const today = moment();
    this.state = {
      date: moment(today),
      selectedDate: moment(today).startOf('isoWeek'),
      selectedWeekNumber: this.calcNumberOfWeek(today)
    };
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateSelectedDate = this.updateSelectedDate.bind(this);
    this.calcNumberOfWeek = this.calcNumberOfWeek.bind(this);
  }

  getPrevMonth() {
    // render previous month
    const currentDate = this.state.date;
    const activeDate = moment(currentDate).subtract(1, 'months');
    this.updateDate(activeDate);
  }

  getNextMonth() {
    // render next month
    const currentDate = this.state.date;
    const activeDate = moment(currentDate).add(1, 'months');
    this.updateDate(activeDate);
  }

  updateDate(activeDate) {
    const currentDate = this.state.date;
    const prevDate = moment(currentDate).startOf('month');
    const newDate = moment(activeDate).startOf('month');
    if(prevDate !== newDate) {
      this.setState({
        date: activeDate
      });
    }
  }

  updateSelectedDate(date) {
    const week = this.calcNumberOfWeek(date);

    if(week !== this.state.selectedWeekNumber) {
      this.setState({
        selectedDate: date,
        selectedWeekNumber: week
      }); 
    }
  }

  calcNumberOfWeek(date) {
    const tdt = moment(date.valueOf());
    const dayn = (date.day() + 6) % 7;
    tdt.set('date', tdt.date() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.set({'month': 0, 'date': 1});
    if (tdt.day() !== 4) {
      tdt.set({'month': 0, 'date': 1 + ((4 - tdt.day()) + 7) % 7});
    }
    const weekNumber = 1 + Math.ceil((firstThursday - tdt) / 604800000);
    return weekNumber;
  }

  render() {
    const { collapsed, expandCollapse, forwardRef } = this.props;
    const { date, selectedDate, selectedWeekNumber } = this.state;

    return (
      <div className="calendar" ref={forwardRef}>
        <SelectedWeek
          selectedDate={selectedDate}
        />
        <CalendarControl
          activeDate={date}
          expandCollapse={expandCollapse}
          selectedDate={selectedDate}
          selectedWeekNumber={selectedWeekNumber}
          collapsed={collapsed}
          updateDate={this.updateDate}
          updateSelectedDate={this.updateSelectedDate}
        />
        <CalendarDropdown
          activeDate={date}
          calcNumberOfWeek={this.calcNumberOfWeek}
          collapsed={collapsed}
          date={date}
          expandCollapse={expandCollapse}
          getNextMonth={this.getNextMonth}
          getPrevMonth={this.getPrevMonth}
          selectedDate={selectedDate}
          selectedWeekNumber={selectedWeekNumber}
          updateDate={this.updateDate}
          updateSelectedDate={this.updateSelectedDate}
        />
      </div>
    );
  }
}

export default Expandable(Calendar);
