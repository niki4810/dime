import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'react-jss';
import {IntlProvider} from 'react-intl';
import flatten from 'flat';
import theme from "./theme/index";
import messages from './locale/en-US';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import getStore from './store';

const store = getStore({});
const defaultTheme = theme();
const localMessages = flatten(messages);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <IntlProvider locale='en' messages={localMessages}>
        <App />
      </IntlProvider>
    </ThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
