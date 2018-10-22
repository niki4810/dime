# dime
A simple finance management app.

![dime-app](https://user-images.githubusercontent.com/1467801/47300928-87068500-d5d2-11e8-8e30-51533d8a2bf1.gif)


# About the application
- `dime` app lets your record your daily spending activity by category and show's you a neat summary of your spending status per month. I personally use this app to see how much I spend each month and limit my spending when I am reaching a treshold :).
- `dime` also has a chart view that shows spending by category.
- This app is built using `react`, `redux`, `react-router v4`, `react-jss`, `storybook`, `victory-charting`. (planning to use `redux-sagas` shortly).
- This app uses firebase for storing data. If you plan to use it, you can create your own firebase instance and add the url in`src/config.js`
- NOTE: I created this app for self learning purpose and there may be
a cleaner way to approch few things. This app will be evolving, and I plan to make it a PWA shortly.
- If you feel you can improve anything in the app, please feel free to open a PR.

# Running the example app
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- After cloning the repo run `npm install` to install the dependencies. This is needed only once.
- To start the demo app simply run `npm start`
- To view the individual component storybook run `npm run storybook` and visit `http://localhost:9001`
