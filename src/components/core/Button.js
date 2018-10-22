import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';

const commonStyles = {
  width: '100%',
  height: '40px',
  border: '0',
  fontSize: '14px'
};

const baseStyles = theme => ({
  button: {
    ...commonStyles,
    background: theme.colors.greyVeryDark,
    color: theme.colors.white,
    outlineColor: theme.colors.white,
    '&:disabled': {
      opacity: '0.75'
    }
  }
});

const primayButtonStyles = theme => ({
  button: {
    ...commonStyles,
    background: theme.colors.primary,
    color: theme.colors.white,
    outlineColor: theme.colors.white,
    '&:disabled': {
      opacity: '0.75'
    }
  }
});

export const BaseButton = (props) => {
  const {classes = {}, onClick = () => {}, children, ...rest} = props;
  return (
    <button className={classNames(classes.button)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export const PrimaryButton = injectSheet(primayButtonStyles)(BaseButton);
export default injectSheet(baseStyles)(BaseButton);