import React from 'react';
import { storiesOf } from '@storybook/react';
import EmptyField from '../../src/components/core/EmptyField';

storiesOf('Core/EmptyField', module)
  .add('default', () => (
    <EmptyField />
  ))