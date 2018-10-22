import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AddToHomeScreen from '../../src/components/core/AddToHomeScreen';

storiesOf('Core/AddToHomeScreen', module)
  .add('default', () => (
    <AddToHomeScreen />
  ));