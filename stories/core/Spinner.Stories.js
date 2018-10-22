import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '../../src/components/core/Spinner';

storiesOf('Core/Spinner', module)
  .add('default', () => (
    <Spinner />
  )).add('with className', () => (
    <Spinner className='fa-wrench' />
  ));