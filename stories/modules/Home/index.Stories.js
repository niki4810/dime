import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import dayjs from 'dayjs';
import Home from '../../../src/components/modules/Home';

const mockProps = {
  callbacks: {
    showDetailsView: action('Show Details View Clicked'),
    showNext: action('Show Next Clicked'),
    showPrevious: action('Show Previous Clicked')
  },
  totalPrice: 1999.99,
  listItems: [
    {
      id: 'day-1', 
      title: dayjs().format('MMM DD, YYYY'), 
      data: [
        {id:'note-001', notes:"Chips & drinks", price: 200.44, category: 'fa-home'},
        {id:'note-002', notes:"Sailing", price: 200.44, category: 'fa-plane'}
      ]
    },
    {
      id: 'day-2', 
      title: dayjs().subtract(1).format('MMM DD, YYYY'), 
      data: [
        {id:'note-003', notes:"Chips2 & drinks2", price: 200.44, category: 'fa-home'},
        {id:'note-004', notes:"Sailing 2", price: 200.44,category: 'fa-plane'}
      ]
    },
    {
      id: 'day-3', 
      title: dayjs().subtract(2).format('MMM DD, YYYY'), 
      data: [
        {id:'note-005', notes:"Chips3 & drinks3", price: 200.44, category: 'fa-home'},
        {id:'note-006', notes:"Sailing 3", price: 200.44, category: 'fa-plane'}
      ]
    },
    {
      id: 'day-4', 
      title: dayjs().subtract(3).format('MMM DD, YYYY'), 
      data: [
        {id:'note-007', notes:"Chips4 & drinks4", price: 200.44, category: 'fa-home'},
        {id:'note-008', notes:"Sailing 4", price: 200.44, category: 'fa-plane'}
      ]
    },
    {
      id: 'day-5', 
      title: dayjs().subtract(4).format('MMM DD, YYYY'), 
      data: [
        {id:'note-009', notes:"Chips5 & drinks5", price: 200.44, category: 'fa-home'},
        {id:'note-010', notes:"Sailing 5", price: 200.44, category: 'fa-plane'}
      ]
    },
    {
      id: 'day-6', 
      title: dayjs().subtract(5).format('MMM DD, YYYY'), 
      data: [
        {id:'note-011', notes:"Chips6 & drinks6", price: 200.44, category: 'fa-home'},
        {id:'note-012', notes:"Sailing 6", price: 200.44, category: 'fa-plane'}
      ]
    }
  ]
}
storiesOf('Modules/Home', module)
  .add('default', () => (
    <Home {...mockProps} />
  ));