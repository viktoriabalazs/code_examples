import React from 'react';
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from 'enzyme';
import moment from 'moment';
import CalendarControl from './CalendarControl';
import Button from '../Button/Button';

configure({ adapter: new Adapter() });

const props = {
  collapsed: false,
  expandCollapse: jest.fn(),
  onUpdateDate: jest.fn(),
  onUpdateSelectedDate: jest.fn(),
  store: {
    date: moment('2020-11-19'),
    selectedWeek: { selectedDate: moment('2020-11-19'), selectedWeekNumber: 47 }
  },
};
const text = 'W47: Nov 19 - Nov 22';

describe('<CalendarControl /> UI component', () => {
  it('renders text for selected date', () => {
    expect(
      mount(<CalendarControl {...props} />)
        .find(Button).at(1)
        .text()
    ).toEqual(text);
  });

  it('invokes expandCollapse on click', () => {
    const click = jest.fn();
    mount(<CalendarControl {...props} expandCollapse={click} />)
      .find(Button).at(1)
      .simulate('click');
    expect(click).toBeCalled();
  });

  it('invokes onUpdateSelectedDate on click', () => {
    const click = jest.fn();
    mount(<CalendarControl {...props} onUpdateSelectedDate={click} />)
      .find(Button).first()
      .simulate('click');
    expect(click).toBeCalled();
  });
});