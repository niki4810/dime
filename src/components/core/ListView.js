import React from 'react'
import injectSheet from 'react-jss';
import dayjs from 'dayjs';
import compose from 'ramda/src/compose';
import {injectIntl} from 'react-intl';
import ListViewItemList from './ListViewItemList';

const baseStyles = theme => ({
  container: {
    display: 'grid',
    gridGap: '5px'
  },
});


export const BaseListView = (props) => {
  const {classes = {}, intl = {}, listItems = [], callbacks = {}} = props;
  const {onMenuItemClick = () => {}} = callbacks;
  
  return (
    <div className={classes.container}>
      {
        listItems.map((listItem) => {
          const {id = '', title = '', data = []} = listItem;
          let _title = title;
          if (title === dayjs().format('YYYY-MM-DD')) {
            _title = intl.formatMessage({id: 'general.today'});
          } else if(title === dayjs().subtract(1, 'day').format('YYYY-MM-DD')) {
            _title = intl.formatMessage({id: 'general.yesterday'});
          }

          console.log();
          console.log(title === dayjs().format('YYYY-MM-DD'));
          return (
            <ListViewItemList
              key={id}
              title={_title}
              callbacks={{
                onMenuItemClick
              }}
              contents={data}
            />
          );
        })
      }
    </div>
  );
};

export default compose(injectSheet(baseStyles), injectIntl)(BaseListView);