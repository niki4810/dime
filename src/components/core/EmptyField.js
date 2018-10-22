import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

const baseStyles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    fontSize: '14px',
  },
  spacing: {
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  icon: {
    color: theme.colors.primary
  },
  primaryLabel: {
    fontWeight: '700'
  },
  secondaryLabel: {
    fontWeight: '300',
    '& .fa-plus': {
      color: theme.colors.primary,
      fontSize: '11px'
    }
  }
});


export const BaseEmptyField = (props) => {
  const {icons = {}, labels = {}, classes = {}, additionalClasses = {}} = props;
  const {main = 'fa-money-check-alt'} = icons
  const {primary = 'emptyField.primary', secondary = 'emptyField.secondary'} = labels;
  return (
    <div className={classNames(classes.container, additionalClasses.container)}>
      <div className={classNames('fa', main, 'fa-3x', classes.icon, classes.spacing)} />  
      <div className={classNames(classes.primaryLabel, classes.spacing)}>
        <FormattedMessage id={primary} />
      </div>  
      <div className={classNames(classes.secondaryLabel, classes.spacing)}>
        <FormattedMessage id={secondary} values={{
          icon: (<span className="fa fa-plus" />)
        }}/>
      </div>
    </div>
  );
};

export default injectSheet(baseStyles)(BaseEmptyField);