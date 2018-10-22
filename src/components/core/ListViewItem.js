import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';
import startsWith from 'ramda/src/startsWith';
import Price from './Price';

const baseStyles = theme => ({
  container: {
    background: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    '&:last-child': {
      marginBottom: '0'
    },
    '&:last-child .border': {
      border: '0'
    }
  },
  left: {
    flex: '1',
    textAlign: 'center',
    fontSize: '20px',
    paddingLeft: '5px'
  },
  contentSection: {
    flex: '11',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',    
    padding: '10px 8px',
    '&.border': {
      borderBottom: `1px solid ${theme.colors.grey}`,
    }
  },
  content: {
    flex: '9',
    fontSize: '14px'
  },
  price: {
    flex: '2',
    textAlign: 'center'
  },
  right: {
    flex: '1',
    textAlign: 'center',
    color: theme.colors.greyDark,
    fontWeight: '700'
  }
});


export const BaseListViewItem = (props) => {
  const {classes = {}, notes, amount = 0, icons = {}, sections = {}, callbacks = {}} = props;
  const {onClick = () => {}} = callbacks;
  const {displayLeft = true, displayRight = true} = sections;
  const {left, right = 'fa-angle-right'} = icons;
  const _amount = typeof amount === "string" ? parseFloat(amount).toFixed(2) : amount;
  return (
    <div className={classes.container} onClick={onClick}>
      {displayLeft && <div className={classNames('fa', left, classes.left, {
        'fa-exclamation-circle': !startsWith('fa-', left)
      })}>
      </div>}
      <div className={classNames(classes.contentSection, 'border')}>
        <div className={classes.content}>{notes}</div>
        <div className={classes.price}>
          <Price value={_amount} />
        </div>
        {displayRight && <div className={classNames('fa', right, classes.right)} />}
      </div>
    </div>
  );
};

export default injectSheet(baseStyles)(BaseListViewItem);