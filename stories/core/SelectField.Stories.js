import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SelectField from '../../src/components/core/SelectField';

storiesOf('Core/SelectField', module)
  .add('default', () => (
    <div style={{padding: '40px'}}>
      <SelectField
        options={[{value: 'food', label: 'Food'}, {value: 'travel', label: 'travel'}, {value: 'entertainment', label: 'entertainment'}]}
        onChange={action('Price Changed')} />
    </div>
  ));