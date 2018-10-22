import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import theme from "../src/theme/index";
import {ThemeProvider} from 'react-jss';
import {IntlProvider} from 'react-intl';
import flatten from 'flat';
import messages from '../src/locale/en-US';

// const req = require.context('../stories/', true, /\**.js$/)
const req = require.context('../stories/', true, /.Stories.js$/)
function loadStories() {
  req.keys().forEach(req)
}

const defaultTheme = theme();
const flattenedMessages = flatten(messages);
addDecorator(story => (
  <ThemeProvider theme={defaultTheme}>
    <IntlProvider locale='en' messages={flattenedMessages}>
      {story()}
    </IntlProvider>
  </ThemeProvider>
));

configure(loadStories, module);
