import React from 'react';
import CalendarControl from './CalendarControl';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';

const today = new Date();
const dataSet = [{
  "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  "months": ["January","February","March","April","May","June","July","August","September","October","November","December"]
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: today,
      selectedDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() === 0 ? 7 - 1 : today.getDay() - 1)),
      selectedWeekNumber: this.calcNumberOfWeek(today),
      show: true
    };

    this.calendar = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateSelectedDate = this.updateSelectedDate.bind(this);
    this.calcNumberOfWeek = this.calcNumberOfWeek.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  handleClick() {
    if (!this.state.show) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState(state => ({
      show: !state.show
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (
      this.calendar.current.contains(e.target)
    ) {
      return;
    }
    this.handleClick();
  }

  getPrevMonth() {
    // render previous month
    let currentDate = this.state.date;
    let activeMonth = currentDate.getMonth() - 1;
    let activeYear = currentDate.getFullYear();
    let activeDate = new Date(activeYear, activeMonth, 1);
    this.updateDate(activeDate);
  }

  getNextMonth() {
    // render next month
    let currentDate = this.state.date;
    let activeMonth = currentDate.getMonth() + 1;
    let activeYear = currentDate.getFullYear();
    let activeDate = new Date(activeYear, activeMonth, 1);
    this.updateDate(activeDate);
  }

  updateDate(activeDate) {
    this.setState({
      date: activeDate
    });
  }

  updateSelectedDate(date) {
    let week = this.calcNumberOfWeek(date);
    this.setState({
      selectedDate: date,
      selectedWeekNumber: week
    });
  }

  calcNumberOfWeek(date) {
    let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    let pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    let weekNumber = Math.ceil((pastDaysOfYear + (firstDayOfYear.getDay() === 0 ? 7 : firstDayOfYear.getDay())) / 7);
    return weekNumber === 53 ? 1 : weekNumber;
  }

  render() {
    const { date, show, selectedDate, selectedWeekNumber } = this.state;

    return (
      <div className="calendar" ref={this.calendar}>
        <CalendarControl
          activeDate={date}
          dataSet={dataSet}
          handleClick={this.handleClick}
          show={show}
          selectedDate={selectedDate}
          selectedWeekNumber={selectedWeekNumber}
          updateDate={this.updateDate}
          updateSelectedDate={this.updateSelectedDate}
        />
        <div 
          
          className={`calendar__dropdown ${!show ? "hide" : "show"}`}
        >
          <CalendarHeader
            dataSet={dataSet}
            date={date}
            getNextMonth={this.getNextMonth}
            getPrevMonth={this.getPrevMonth}
          />
          <CalendarBody
            activeDate={date}
            calcNumberOfWeek={this.calcNumberOfWeek}
            dataSet={dataSet}
            selectedDate={selectedDate}
            selectedWeekNumber={selectedWeekNumber}
            updateSelectedDate={this.updateSelectedDate}
          />
          <CalendarFooter
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
