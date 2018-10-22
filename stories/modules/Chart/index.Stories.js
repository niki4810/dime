import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import dayjs from 'dayjs';
import Chart from '../../../src/components/modules/Chart';

const mockProps = {
  chartData: [
    { x: "Food", y: 20 },
    { x: "Travel", y: 20 },
    { x: "Fuel", y: 20 },
    { x: "Shopping", y: 10 },
    { x: "Entertainment", y: 15 },
    { x: "Misc", y: 15 }
  ],
  totalPrice: 100,
  legendData: [
    {name: 'Food: $20'}, 
    {name: 'Travel: $20'},
    {name: 'Fuel: $20'},
    {name: 'Shopping: $10'},
    {name: 'Entertainment: $15'},
    {name: 'Misc: $15'}
  ],
}
storiesOf('Modules/Chart', module)
  .add('default', () => (
    <Chart {...mockProps} />
  ));