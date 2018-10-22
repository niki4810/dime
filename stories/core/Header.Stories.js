import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Header from '../../src/components/core/Header';

storiesOf('Core/Header', module)
  .add('Main', () => (
    <Header
      title='header.projectName'
      icons={{
        left: 'fa-bars',
        right: 'fa-plus'
      }}
      callbacks={{
        onLeftClick: action('Left Click'),
        onRightClick: action('Right Click')
      }}
    />
  )).add('Add an Expense', () => (
    <Header
      title='header.addAnExpense'
      icons={{
        left: '',
        right: 'fa-times'
      }}
      callbacks={{
        onLeftClick: action('Left Click'),
        onRightClick: action('Right Click')
      }}
    />
  ));