import React from 'react'
import injectSheet from 'react-jss'
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import isEmpty from 'ramda/src/isEmpty';

const baseStyles = theme => ({
  header: {
    background: theme.colors.primary,
    color: theme.colors.white,
    height: '60px',
    overflow: 'hidden',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none'
  },
  left: {
    flex: '1',
    textAlign: 'center',
    fontSize: '22px',
    paddingLeft: '10px'
  },
  center: {
    flex: '10',
    fontSize: '18px',
    fontWeight: '700',
    textAlign: 'center'
  },
  right: {
    flex: '1',
    textAlign: 'center',
    fontSize: '22px',
    paddingRight: '10px'
  }
});

export const BaseHeader = (props) => {
  const {classes = {}, title = '', icons = {}, callbacks = {}} = props;
  const {left = '', right = ''} = icons;
  const {onLeftClick = () => {}, onRightClick = () => {}} = callbacks;
  return (
    <div className={classes.header}>
      <div className={classes.left} onClick={onLeftClick}>
        {!isEmpty(left) && <span className={classNames('fa', left)} />}
      </div>
      <div className={classes.center}>
        <FormattedMessage id={title}/>
      </div>
      <div className={classes.right} onClick={onRightClick}>
        {!isEmpty(right) && <span className={classNames('fa', right)} />}
      </div>
    </div>
  );
};

export default injectSheet(baseStyles)(BaseHeader);