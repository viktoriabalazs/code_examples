import React from 'react';
import CalendarControl from './CalendarControl';
import CalendarDropdown from './CalendarDropdown';
import Expandable from '../hoc/Expandable';
import SelectedWeek from './SelectedWeek';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      date: today,
      selectedDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 7 - 1 : today.getDay() - 1)),
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
    const activeMonth = currentDate.getMonth() - 1;
    const activeYear = currentDate.getFullYear();
    const activeDate = new Date(activeYear, activeMonth, 1);
    this.updateDate(activeDate);
  }

  getNextMonth() {
    // render next month
    const currentDate = this.state.date;
    const activeMonth = currentDate.getMonth() + 1;
    const activeYear = currentDate.getFullYear();
    const activeDate = new Date(activeYear, activeMonth, 1);
    this.updateDate(activeDate);
  }

  updateDate(activeDate) {
    this.setState({
      date: activeDate
    });
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
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + (firstDayOfYear.getDay() === 0 ? 7 : firstDayOfYear.getDay())) / 7);
    return weekNumber === 53 ? 1 : weekNumber;
  }

  render() {
    const { collapsed, expandCollapse, forwardRef } = this.props;
    const { date, selectedDate, selectedWeekNumber } = this.state;
    const dataSet = {
      days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"]
    };

    return (
      <div className="calendar" ref={forwardRef}>
        <SelectedWeek
          dataSet={dataSet}
          selectedDate={selectedDate}
        />
        <CalendarControl
          activeDate={date}
          dataSet={dataSet}
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
          dataSet={dataSet}
          date={date}
          expandCollapse={expandCollapse}
          getNextMonth={this.getNextMonth}
          getPrevMonth={this.getPrevMonth}
          selectedDate={selectedDate}
          selectedWeekNumber={selectedWeekNumber}
          updateSelectedDate={this.updateSelectedDate}
        />
      </div>
    );
  }
}

export default Expandable(Calendar);
