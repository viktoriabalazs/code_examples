import React from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

const Button = ({
  active = false,
  appearance = 'primary',
  center = false,
  children,
  control = false,
  icon = false,
  onClick = f => f
}) => {
  const buttonClasses = classNames( 'button', 
    {
      'button--primary': appearance === 'primary',
      'button--secondary': appearance === 'secondary',
      'button--control': control,
      'button--icon': icon,
      'button--center': center,
      'active': active
    }
  );

  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  active: PropTypes.bool,
  appearance: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  control: PropTypes.bool,
  icon: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Button;