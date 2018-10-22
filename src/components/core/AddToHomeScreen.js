import React from 'react';
import injectSheet from 'react-jss';
import {FormattedMessage} from 'react-intl';

const baseStyles = (theme) => ({
  container: {
    background: theme.colors.white,
    border: `1px solid ${theme.colors.grey}`,
    width: '225px',
    padding: '10px',
    textAlign: 'left',
    fontSize: '12px'
  },
  child: {
    position: 'relative'
  },
  arrow: {
    position: 'absolute',
    background: theme.colors.white,
    border: `1px solid ${theme.colors.grey}`,
    borderTop: 0,
    borderLeft: 0,
    width: '20px',
    height: '20px',
    left: '50%',
    transform: 'translate(-50%, 0%) rotate(45deg)'
  }
});

const BaseAddToHomeScreen = (props) => {
  const {classes = {}} = props;
  return (    
    <div className={classes.container}>
      <div className={classes.child}>
        <FormattedMessage id="addToHomeScreenMsg" />
        <div className={classes.arrow} />
      </div>
    </div>
  );
};

const AddToHomeScreen = injectSheet(baseStyles)(BaseAddToHomeScreen);
const addToHomeScreenStyles = ()=> ({
  container: {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translate(-50%,0%)'
  }
});
export const PositionedAddToHomeScreen = injectSheet(addToHomeScreenStyles)((props) => {
  return (
    <div className={props.classes.container}>
      <AddToHomeScreen />
    </div>
  );
});

export default AddToHomeScreen;