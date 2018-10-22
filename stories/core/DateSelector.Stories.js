import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateSelector from '../../src/components/core/DateSelector';

storiesOf('Core/DateSelector', module)
  .add('default', () => (
    <DateSelector
      callbacks={{
        onPrevClick: action('Left Click'),
        onNextClick: action('Right Click')
      }}
    />
  ))