import React from 'react';

const Expandable = ComposedComponent => {
  class Expandable extends React.Component {
    constructor(props) {
      super(props);
      const collapsed = 
        (props.hidden && props.hidden === true) ? true : false;
      this.state = { collapsed };
      this.expandCollapse = this.expandCollapse.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
      document.addEventListener("click", this.handleOutsideClick, false);
    }

    handleOutsideClick(e) {
      // ignore clicks on the component itself
      if (
        this.props.forwardRef.current.contains(e.target)
      ) {
        return;
      }
      if(!this.state.collapsed) {
        this.expandCollapse();
      }
    }

    expandCollapse() {
      let collapsed = !this.state.collapsed;
      this.setState({ collapsed });
    }
  
    render() {
      const { forwardRef, ...props } = this.props;
      return <ComposedComponent
        expandCollapse={this.expandCollapse}
        forwardRef={forwardRef}
        {...this.state}
        {...props}
      />
    }
  }

  return React.forwardRef((props, ref) => {
    return <Expandable {...props} forwardRef={ref} />;
  });
}

export default Expandable;