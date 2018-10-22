import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ListViewItem from '../../src/components/core/ListViewItem';

storiesOf('Core/ListViewItem', module)
  .add('default', () => (
    <ListViewItem
      callbacks={{
        onClick: action('menu item click')
      }}
      amount={1999.99}
      notes="Chips & drinks"
      icons={{left: 'fa-home'}} />
  )).add('no right icon', () => (
    <ListViewItem
      sections={{
        displayRight: false
      }}
      callbacks={{
        onClick: action('menu item click')
      }}
      amount={1999.99}
      notes="Travel"
      icons={{left: 'fa-plane'}} />
  ));