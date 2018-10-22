import React from 'react';
import injectSheet from 'react-jss'
import classNames from 'classnames';
import isEmpty from 'ramda/src/isEmpty';
import {FormattedMessage} from 'react-intl';
import DateSelector from '../../core/DateSelector';
import {PrimaryPrice} from '../../core/Price';
import ListView from '../../core/ListView';
import EmptyField from '../../core/EmptyField';

const baseStyles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden'
  },
  dateSelector: {
  },
  priceSection: {
    flex: 3,
    display: 'flex',        
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)'
  },
  priceContainer: {
    display: 'flex',        
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    border: theme.colors.grey,
    borderRadius: '15px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
    // boxShadow: '0 2px 2px 0 rgba(107,91,149,0.80), 0 0 0 1px rgba(107,91,149,0.50)',
    minWidth: '270px'
  },
  priceLabel: {
    textAlign: 'center' 
  },
  price: {},
  list: {
    flex: 9,
    paddingBottom: '80px',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch'
  },
  '@media screen and (orientation: landscape)': {
    priceSection: {
      padding: '20px'
    },
    priceContainer: {
      padding: '15px'
    }
  },
  emptyFieldContainer: {
    marginTop: '-55px'
  }
});

const ListViewField = (props) => {
  const {
    classes = {},
    callbacks = {},    
    listItems = []
  } = props;
  const {showDetailsView = () => {}} = callbacks; 
  return (
    <div className={classNames(classes.list)}>
      <ListView
        callbacks={{
          onMenuItemClick: showDetailsView
        }}
        listItems={listItems}
      />
    </div>
  );
};
const PriceField = (props) => {
  const {classes = {}, totalPrice = 0} = props;
  return (
    <div className={classNames(classes.priceSection)}>
      <div className={classNames(classes.priceContainer)}>
        <div className={classNames(classes.priceLabel)}>
          <FormattedMessage id="homePage.totalExpenditure" />  
        </div>
        <div className={classNames(classes.price)}>
          <PrimaryPrice value={totalPrice} />
        </div>
      </div>
    </div>
  )
};

const DateSelectorField = (props) => {
  const {
    currentDate,
    classes = {},
    callbacks = {}
  } = props;
  
  const {
    showPrevious = () => {},
    showNext = () => {}
  } = callbacks;
  return (
    <div className={classNames(classes.dateSelector)}>
      <DateSelector
        currentDate={currentDate}
        callbacks={{
          onPrevClick: showPrevious,
          onNextClick: showNext
        }}
      />  
    </div>
  );
};

const BaseHome  = (props) => {
  const {classes = {}, listItems = []} = props;
  const listItemsEmpty = isEmpty(listItems);

  return (
    <div className={classNames(classes.container)}>
      <DateSelectorField {...props} />
      {!listItemsEmpty &&  <PriceField {...props} />}
      {!listItemsEmpty && <ListViewField {...props} />}
      {listItemsEmpty && <EmptyField additionalClasses={{container: classes.emptyFieldContainer}} />}
    </div>
  );
};

export default injectSheet(baseStyles)(BaseHome);