import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Expandable from './Expandable';

configure({ adapter: new Adapter() });

describe('Expandable HOC', () => {
  let props, wrapper, ComposedComponent;
  let MockComponent = ({ collapsed, expandCollapse }) =>
    <div onClick={expandCollapse}>
      {(collapsed) ? 'collapsed' : 'expanded'}
    </div>

  describe('Rendering UI', () => {
    beforeAll(() => {
      ComposedComponent = Expandable(MockComponent);
      wrapper = mount(<ComposedComponent foo='foo' gnar='gnar' />);
      props = wrapper.find(MockComponent).props();
    });

    it('starts off expanded', () => {
      expect(props.collapsed).toBe(false);
    });

    it('passes the expandCollapse function to composed component', () => {
      expect(typeof props.expandCollapse).toBe('function');
    });

    it('passes additional foo prop to composed component', () => {
      expect(props.foo).toBe('foo');
    });

    it('passes additional gnar prop to composed component', () => {
      expect(props.gnar).toBe('gnar');
    });
  });

  describe('Expand collapse functionality', () => {
    beforeAll(() => {
      ComposedComponent = Expandable(MockComponent);
      wrapper = mount(<ComposedComponent collapsed={true} />);
      props = wrapper.find(MockComponent).props();
    });

    it('renders the MockComponent as the root element', () => {
      expect(wrapper.first().is(MockComponent));
    });

    it('starts off collapsed', () => {
      expect(props.collapsed).toBe(true);
    });
  });
});