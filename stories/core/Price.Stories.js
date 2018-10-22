import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Price, {PrimaryPrice} from '../../src/components/core/Price';

storiesOf('Core/Price', module)
  .add('Base', () => (
    <Price value={999.99} />
  )).add('Primary', () => (
    <PrimaryPrice value={999.99} />
  ));