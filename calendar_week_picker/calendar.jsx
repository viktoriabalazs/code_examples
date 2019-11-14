'use strict';

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const today = new Date();

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDaysInMonth = this.getDaysInMonth.bind(this);
  }

  componentDidMount() {
    let activeDate = this.props.activeDate;
    this.handleChange(activeDate);
  }

  handleClick(id, e) {
    this.props.updateSelectedWeekText(id, e);
  }

  handleChange(date) {
    this.props.updateDate(date);
  }

  getDaysInMonth(year, month) {
    // calculate the number of days in a month
    let date = new Date(year, month, 32);
    let daysNumber = 32 - date.getDate();
    return daysNumber;
  }

  render() {
    let items = [];
    let week = this.props.week;

    let activeDate = this.props.activeDate;
    let activeYear = activeDate.getFullYear();
    let activeMonth = activeDate.getMonth();

    let currentMonthDays = this.getDaysInMonth(activeYear,activeMonth);
    let prevMonthDays = this.getDaysInMonth(activeYear,activeMonth - 1);

    let currentMonthStartDay = new Date(activeYear,activeMonth,1).getDay();
    let currentMonthEndDay = new Date(activeYear,activeMonth,currentMonthDays).getDay();

    let prevMonthStartDay = new Date(activeYear,activeMonth - 1,1).getDay();

    // fixes for using Monday as start day of week
    if(currentMonthStartDay == 0) {
      currentMonthStartDay = 7;
    }
    if(prevMonthStartDay == 0) {
      prevMonthStartDay = 7;
    }
    if(currentMonthEndDay == 0) {
      currentMonthEndDay = 7;
    }

    // calculate number of days on first week of next month
    let nextMonthDays = 7 - currentMonthEndDay;

    // current month ends on Sunday (last day of week) - remove days of next month
    if(currentMonthEndDay == 0) {
      nextMonthDays = 0;
    }

    // current month starts on Monday (first day of week) - remove days of previous month
    if(currentMonthStartDay == 1) {
      prevMonthDays = 0;
    }

    // calculate start day of previous month
    let monthDays = prevMonthDays - currentMonthStartDay + 1;

    // current and next month start days
    let monthDays2 = 0;
    let monthDays3 = 0;

    // add class name to highlight current day (today)
    let checkCurrentDay = (date) => {
      if(today.getFullYear() == activeYear && today.getMonth() == activeMonth && today.getDate() == (date + 1)) {
        return " today";
      } else {
        return "";
      }
    }

    // outer loop to create calendar rows
    for (let i = 0; i < 6; i++) {
      let children = [];
      // inner loop to create calendar days
      for (let j = 0; j < 7; j++) {
        if(monthDays < prevMonthDays) {
          children.push(<div className="calendar__body-item--prev" id={"preD" + (monthDays + 1)}>{monthDays + 1}</div>)
          monthDays++
        } else if(monthDays2 < currentMonthDays) {
          children.push(<div className={`calendar__body-item--curr ${checkCurrentDay(monthDays2)}`} id={"curD" + (monthDays2 + 1)}><span></span>{monthDays2 + 1}</div>)
          monthDays2++
        } else if(monthDays3 < nextMonthDays) {
          children.push(<div className="calendar__body-item--next" id={"nxtD" + (monthDays3 + 1)}>{monthDays3 + 1}</div>)
          monthDays3++
        }
      }
      // create the parent and add the children
      let id = week + i;
      let lastDayOfYear = new Date(activeYear, 11, 31);
      let lastWeekOfYear = this.props.updateNumberOfWeek(lastDayOfYear, "current");
      // last week of year is the same than first week of next year
      if(lastDayOfYear.getDay() != 0 && activeMonth == 11 && id == lastWeekOfYear) {
        id = 1;
      }
      items.push(<div className={`calendar__body-row ${this.props.selectedWeek == id ? ' active' : ''}`} id={id} onClick={(e) => this.handleClick(id, e)}>{children}</div>)
    }
  return items;
}}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: true, week: 0, date: today, selectedWeekDate: today, selectedWeek: 0, buttonText: "" };
    this.weekButton = React.createRef();
    this.weekButton2 = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.updateWeek = this.updateWeek.bind(this);
    this.updateSelectedWeek = this.updateSelectedWeek.bind(this);
    this.getPrevMonth = this.getPrevMonth.bind(this);
    this.getNextMonth = this.getNextMonth.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.changeButtonText = this.changeButtonText.bind(this);
    this.updateSelectedWeekText = this.updateSelectedWeekText.bind(this);
    this.confirmSelectedDate = this.confirmSelectedDate.bind(this);
  }

  componentDidMount() {
    let weekNumber = this.updateNumberOfWeek(this.state.date);
    let selectedWeekNumber = this.updateNumberOfWeek(this.state.date, "current");
    this.updateWeek(weekNumber);
    this.updateSelectedWeekText(weekNumber, 0);
    this.updateSelectedWeek(selectedWeekNumber);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentDidUpdate() {
    let buttonText = this.state.buttonText;
    let weekOnButton = parseInt(buttonText.slice(1,3));
    if(weekOnButton != this.state.selectedWeek) {
      console.log("updating");
      this.updateSelectedWeekText(this.state.selectedWeek, 0);
    }
    if(document.getElementsByClassName("calendar__body-row  active").length == 0 || !this.state.show) {
      this.weekButton.current.disabled = true;
      this.weekButton2.current.disabled = true;
    } else {
      this.weekButton.current.disabled = false;
      this.weekButton2.current.disabled = false;
    }
  }

  handleClick() {
    if (!this.state.show) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(state => ({
      show: !state.show
    }));
    // set the selected week back if the new selection wasn't confirmed
    this.updateDate(this.state.selectedWeekDate);
    let newWeekNumber = this.updateNumberOfWeek(this.state.selectedWeekDate);
    let newSelectedWeekNumber = this.updateNumberOfWeek(this.state.selectedWeekDate, "current");
    let lastDayOfYear = new Date(this.state.selectedWeekDate.getFullYear(), 11, 31);
    let lastWeekOfYear = this.updateNumberOfWeek(lastDayOfYear, "current");
    if(lastDayOfYear.getDay() != 0 && this.state.selectedWeekDate.getMonth() == 11 && newSelectedWeekNumber == lastWeekOfYear) {
      newSelectedWeekNumber = 1;
    }
    this.updateWeek(newWeekNumber);
    this.updateSelectedWeek(newSelectedWeekNumber);
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target) || e.target == this.weekButton.current || e.target == this.weekButton2.current || e.target == this.weekButton.current.firstChild || e.target == this.weekButton2.current.firstChild) {
      return;
    }
    this.handleClick();
  }

  updateNumberOfWeek(date, week) {
    // calculate number of week based on actual date
    let activeDate;
    if(week == "current") {
      activeDate = new Date(date);
    } else {
      activeDate = new Date(date.getFullYear(), date.getMonth(), 1);
    }
    const firstDayOfYear = new Date(activeDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (activeDate - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + (firstDayOfYear.getDay() == 0 ? 7 : firstDayOfYear.getDay())) / 7);
    return weekNumber;
  }

  updateDate(activeDate) {
    this.setState({
      date: activeDate
    });
  }

  updateWeek(id) {
    this.setState({
      week: id
    });
  }

  updateSelectedWeek(id) {
    this.setState({
      selectedWeek: id
    });
  }

  updateSelectedDate(selectedWeekDate) {
    this.setState({
      selectedWeekDate: selectedWeekDate
    });
  }

  changeButtonText(buttonText) {
    this.setState({
      buttonText: buttonText
    });
  }

  getPrevMonth() {
    // render previous month
    let currentDate = this.state.date;
    let activeMonth = currentDate.getMonth() - 1;
    let activeYear = currentDate.getFullYear();
    let activeDate = new Date(activeYear, activeMonth, 1);
    let weekNumber = this.updateNumberOfWeek(activeDate);
    this.updateWeek(weekNumber);
    this.updateDate(activeDate);
  }

  getNextMonth() {
    // render next month
    let currentDate = this.state.date;
    let activeMonth = currentDate.getMonth() + 1;
    let activeYear = currentDate.getFullYear();
    let activeDate = new Date(activeYear, activeMonth, 1);
    let weekNumber = this.updateNumberOfWeek(activeDate);
    this.updateWeek(weekNumber);
    this.updateDate(activeDate);
  }

  confirmSelectedDate() {
    // save new selected week
    let selectedWeekEndDay = document.getElementsByClassName("calendar__body-row  active")[0].lastChild.getAttribute("id").slice(4);
    let newSelectedDate;
    if(selectedWeekEndDay < 7) {
      if(document.getElementsByClassName("calendar__body-row  active")[0].previousElementSibling == "undefined" || document.getElementsByClassName("calendar__body-row  active")[0].previousElementSibling == null || !document.getElementsByClassName("calendar__body-row  active")[0].previousElementSibling.hasChildNodes()) {
        newSelectedDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth() == 0 ? 0 : this.state.date.getMonth(), this.state.date.getMonth() == 0 ? 1 : selectedWeekEndDay);
      } else if(document.getElementsByClassName("calendar__body-row  active")[0].nextElementSibling == "undefined" || document.getElementsByClassName("calendar__body-row  active")[0].nextElementSibling == null || !document.getElementsByClassName("calendar__body-row  active")[0].nextElementSibling.hasChildNodes()) {
        newSelectedDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth() == 11 ? 11 : this.state.date.getMonth() + 1, this.state.date.getMonth() == 11 ? 31 : selectedWeekEndDay);
      }
    } else {
      newSelectedDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), selectedWeekEndDay);
    }
    this.updateSelectedDate(newSelectedDate);
    this.setState(state => ({
      show: !state.show
    }));
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  updateSelectedWeekText(id, e) {
    // update text on week picker button
    let startMonth = 0;
    let endMonth = 0;
    let currentYear = this.state.date.getFullYear();
    let currentMonth = this.state.date.getMonth();
    let currentElement;
    let lastDayOfYear = new Date(currentYear, 11, 31);
    let lastWeekOfYear = this.updateNumberOfWeek(lastDayOfYear, "current");

    // week number fix if next year does not start with a new week
    if(lastDayOfYear.getDay() != 0) {
      lastWeekOfYear -= 1;
    }

    // update selected week
    if(this.state.selectedWeek != id && id != 0) {
      this.updateSelectedWeek(id);
    }

    // jump to previous year
    if(id == 0) {
      let newDate = new Date(currentYear - 1, 11, 31);
      let weekNumber = this.updateNumberOfWeek(newDate, "current");
      if(newDate != 0) {
        weekNumber -= 1;
      }
      if(newDate.getDay() == 0 && currentMonth != 11) {
        console.log("new prev week");
        this.updateSelectedWeek(weekNumber + 1);
        this.getPrevMonth();
      } else if(currentMonth == 11) {
        console.log("prev week dec");
        this.updateSelectedWeek(weekNumber);
      } else {
        console.log("prev week");
        this.getPrevMonth();
        this.updateSelectedWeek(weekNumber);
      }
    }
    // jump to next year
    if(id == lastWeekOfYear + 1) {
      let newDate = new Date(currentYear + 1, 0, 1);
      let weekNumber = this.updateNumberOfWeek(newDate, "current");
      if(newDate.getDay() == 1) {
        console.log("new next week");
        this.updateSelectedWeek(weekNumber);
        this.getNextMonth();
      } else if(this.state.selectedWeek == 1) {
        console.log("next week");
        this.updateSelectedWeek(weekNumber + 1);
        this.getNextMonth();
      } else {
        console.log("next week dec");
        this.updateSelectedWeek(weekNumber);
      }
    }

    // get calendar row with current selected week
    if(e != 0) {
      // week was clicked
      currentElement = e.target;
    } else {
      // control button was clicked
      currentElement = document.getElementsByClassName("calendar__body-row  active")[0].firstChild;
      if(id < this.state.selectedWeek && id != 0) {
        // "go to previous week" control button was clicked
        console.log("prev");
        if(currentElement.parentNode.previousElementSibling == "undefined" || currentElement.parentNode.previousElementSibling == null || !currentElement.parentNode.previousElementSibling.hasChildNodes()) {
        // jump to previous month
          this.getPrevMonth();
        }
        currentElement = document.getElementsByClassName("calendar__body-row  active")[0].previousElementSibling.firstChild;
      } else if(id > this.state.selectedWeek && id != 0) {
        // "go to next week" control button was clicked
        console.log("next");
        if(currentElement.parentNode.nextElementSibling == "undefined" || currentElement.parentNode.nextElementSibling == null || !currentElement.parentNode.nextElementSibling.hasChildNodes()) {
        // jump to next month
          this.getNextMonth();
        }
        currentElement = document.getElementsByClassName("calendar__body-row  active")[0].nextElementSibling.firstChild;
      }
    }
    // get start and end date for week picker button
    let startDate = currentElement.parentNode.firstChild.getAttribute("id");
    let startDateNumber = startDate.slice(4);
    let endDate = currentElement.parentNode.lastChild.getAttribute("id");
    let endDateNumber = endDate.slice(4);
    if(parseInt(endDateNumber) < 7) {
      if(currentElement.parentNode.nextElementSibling == "undefined" || currentElement.parentNode.nextElementSibling == null || !currentElement.parentNode.nextElementSibling.hasChildNodes()) {
        startMonth = currentMonth;
        endMonth = currentMonth == 11 ? 0 : currentMonth + 1;
      } else {
        startMonth = currentMonth == 0 ? 11 : currentMonth - 1;
        endMonth = currentMonth;
      }
    } else {
      startMonth = currentMonth;
      endMonth = currentMonth;
    }
    let buttonText = "W" + id + ": " + this.props.months[startMonth].slice(0, 3) + " " + startDateNumber + " - " + this.props.months[endMonth].slice(0, 3) + " " + endDateNumber;
    this.changeButtonText(buttonText);
  }

  render() {
    let week = this.state.week;
    let selectedWeek = this.state.selectedWeek;
    let date = this.state.date;
    let show = this.state.show;

    return (
      <div className="calendar">
        <div className="calendar__control button-group">
          <div>
            <button type="button" ref={this.weekButton2} className="button button--control button--icon" onClick={(e) => this.updateSelectedWeekText(selectedWeek - 1, 0)}>
              <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
            </button>
            <button type="button" className={`button button--center ${show ? ' active' : ''}`} onClick={this.handleClick}>{this.state.buttonText}</button>
            <button type="button" ref={this.weekButton} className="button button--control button--icon" onClick={(e) => this.updateSelectedWeekText(selectedWeek + 1, 0)}>
              <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
            </button>
          </div>
        </div>
        <div ref={node => { this.node = node; }} className={"calendar__dropdown " + (!show ? "hide" : "show")}>
          <div className="calendar__header">
            <button type="button" className="button button--control button--icon" onClick={this.getPrevMonth}>
              <img src="images/icon_arrow_left.png" alt="Prev" height="14" width="8" />
            </button>
            <div>{this.props.months[date.getMonth()]} {date.getFullYear()}</div>
            <button type="button" type="button" className="button button--control button--icon" onClick={this.getNextMonth}>
              <img src="images/icon_arrow_right.png" alt="Next" height="14" width="8" />
            </button>
          </div>
          <div className="calendar__days">
            {this.props.daynames.map((day, id) =>
              <div className="calendar__days-item" key={"header" + id}>{day}</div>
            )}
          </div>
          <div className="calendar__body">
            <Items week={week} updateSelectedWeekText={this.updateSelectedWeekText} selectedWeek={selectedWeek} updateDate={this.updateDate} activeDate={date} updateNumberOfWeek={this.updateNumberOfWeek} />
          </div>
          <div className="calendar__footer">
            <button type="button" className="button button--primary" onClick={this.confirmSelectedDate}>Done</button>
            <button type="button" className="button" onClick={this.handleClick}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.getElementById('calendar-container');
ReactDOM.render(<Calendar daynames={days} months={months} />, domContainer);
