import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, {
  PrimaryButton
} from '../../src/components/core/Button';

storiesOf('Core/Button', module)
  .add('default', () => (
    <Button onClick={action('Button Click')}>
      Cancel
    </Button>
  )).add('primary', () => (
    <PrimaryButton onClick={action('Button Click')}>
      Save
    </PrimaryButton>
  ));