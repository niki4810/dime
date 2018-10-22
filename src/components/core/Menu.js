import React from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';

const baseStyles = (theme) => ({
  container: {
    background: theme.colors.black,
    position: 'absolute',
    zIndex: theme.zIndexes.menuContainer,
    top: '0',
    bottom:'0',
    width: '120px',
    transform: 'translateX(-120px)',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'linear',
    '&.open': {
      transform: 'translateX(0)',

    }
  },
  menuItem: {
    padding: '10px',
    borderBottom: `1px groove ${theme.colors.white}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.white,
    '& .fa': {
      fontSize: '26px'
    },
  },
  menuLabel: {
    paddingTop: '10px'
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    background: 'rgba(0,0,0,0.25)',
    zIndex: theme.zIndexes.menuBackDrop,
  },
  content: {
  }
});

const BaseMenu = (props) => {
  const {classes = {}, callbacks = {}, isOpen = false, children} = props;
  const {closeMenu = () => {}} = callbacks;
  return (
    <div className={classNames({[classes.backdrop]: isOpen})} onClick={closeMenu}>
      <div className={classNames(classes.container, {open: isOpen})}>
        <div className={classes.content}>
          {children.map((child, index) => {
            return (<div key={index} className={classes.menuItem}>
              {child}
            </div>);
          })}
        </div>
        <div className={classNames(classes.close, classes.menuItem)} onClick={closeMenu}>
          <div className='fa fa-times-circle' />
          <div className={classes.menuLabel}>
              <FormattedMessage id='general.close' />
          </div>
        </div>
      </div>
    </div>
  );
};  

export default injectSheet(baseStyles)(BaseMenu);