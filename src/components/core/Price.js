import React from 'react'
import injectSheet from 'react-jss'
import { FormattedMessage } from 'react-intl';

const basePriceStyle = theme => ({
  container: {
    color: theme.colors.black
  },
  currencySymbol: {
    fontSize: '12px'
  },
  value: {
    fontSize: '12px'
  }
});

const primaryPriceStyle = theme => ({
  container: {
    color: theme.colors.primary,
    width: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center'
  },
  currencySymbol: {
    fontSize: '52px'
  },
  value: {
    fontSize: '52px'
  }
});

export const BasePrice = (props) => {
  const {classes = {}, value = 0, currencySymbol = 'currencySymbols.USD'} = props;
  return (
    <div className={classes.container}>
      <span className={classes.currencySymbol}>
        <FormattedMessage id={currencySymbol} />
      </span>
      <span className={classes.value}>
        {value}
      </span>
    </div>
  );
};

export const PrimaryPrice = injectSheet(primaryPriceStyle)(BasePrice);
export default injectSheet(basePriceStyle)(BasePrice);