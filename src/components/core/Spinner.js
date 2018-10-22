import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';

const baseStyles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
  }
});


export const BaseSpinner = (props) => {
  const {className = '', classes = {}} = props;
  return (
    <div className={classes.container}>
      <div className={classNames('fa', 'fa-spinner', 'fa-spin', 'fa-3x', className)} />
    </div>
  );
};

export default injectSheet(baseStyles)(BaseSpinner);