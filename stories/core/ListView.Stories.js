import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ListView from '../../src/components/core/ListView';
import dayjs from 'dayjs';

storiesOf('Core/ListView', module)
  .add('default', () => (
    <ListView      
      callbacks={{
        onMenuItemClick: action('menu item click')
      }}
      listItems={[
        {
          id: 'day-1', 
          title: dayjs().format('MMM DD, YYYY'), 
          data: [
            {id:'note-001', notes:"Chips & drinks", amount: 200.44, category: 'fa-home'},
            {id:'note-002', notes:"Sailing", amount: 200.44, category: 'fa-plane'}
          ]
        },
        {
          id: 'day-2', 
          title: dayjs().subtract(1).format('MMM DD, YYYY'), 
          data: [
            {id:'note-001', notes:"Chips2 & drinks2", amount: 200.44, category: 'fa-home'},
            {id:'note-002', notes:"Sailing 2", amount: 200.44,category: 'fa-plane'}
          ]
        },
        {
          id: 'day-3', 
          title: dayjs().subtract(1).format('MMM DD, YYYY'), 
          data: [
            {id:'note-001', notes:"Chips3 & drinks3", amount: 200.44, category: 'fa-home'},
            {id:'note-002', notes:"Sailing 3", amount: 200.44, category: 'fa-plane'}
          ]
        } 
      ]}
       />
  ));