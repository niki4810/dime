import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ListViewItemList from '../../src/components/core/ListViewItemList';
import dayjs from 'dayjs';

storiesOf('Core/ListViewItemList', module)
  .add('default', () => (
    <ListViewItemList
      title={dayjs().format('MMM DD, YYYY')}
      callbacks={{
        onMenuItemClick: action('menu item click')
      }}
      contents={[
        {id:'note-001', notes:"Chips & drinks", amount: 75.89, category: 'fa-home'},
        {id:'note-002', notes:"Sailing", amount: 200.44, category: 'fa-plane'}
      ]}
       />
  ));