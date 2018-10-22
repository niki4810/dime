import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputField from '../../src/components/core/InputField';
import dayjs from 'dayjs';

storiesOf('Core/InputField', module)
  .add('PriceField', () => (
    <div style={{padding: '40px'}}>
      <InputField 
        fieldProps={{pattern: "\d*"}}
        type="number"
        onChange={action('Price Changed')} />
    </div>
  )).add('DateField', () => (
    <div style={{padding: '40px'}}>
      <InputField
        icons={{main: 'fa-calendar'}}
        fieldProps={{pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}"}}
        type="date"
        onChange={action('Date Changed')} />
    </div>
  ));