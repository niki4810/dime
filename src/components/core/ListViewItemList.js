import React from 'react'
import injectSheet from 'react-jss'
import ListViewItem from './ListViewItem';

const baseStyles = theme => ({
  container: {},
  title: {
    background: theme.colors.grey,
    color: theme.colors.black,
    padding: '2px 10px',
    fontSize: '12px'
  },
  content: {}
});


export const BaseListViewItemList = (props) => {
  const {classes = {}, contents = [], title, callbacks = {}} = props;
  const {onMenuItemClick = () => {}} = callbacks;
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.content}>
        {contents.map((content) => {
          return <ListViewItem
            key={content.id}
            amount={content.amount}
            callbacks={{
              onClick: () => {
                onMenuItemClick(content);
              }
            }}
            notes={content.notes}
          icons={{left: content.category}} />
        })}
      </div>
    </div>
  );
};

export default injectSheet(baseStyles)(BaseListViewItemList);