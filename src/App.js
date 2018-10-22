import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import {FormattedMessage} from 'react-intl';
import HomeWrapper from './components/modules/Home/wrapper';
import ChartWrapper from './components/modules/Chart/chart-wrapper';
import Header from './components/modules/Header';
import Menu from './components/core/Menu';
import {addExpenseRoute} from './utils/routing';
import AddExpenseWrapper from './components/modules/Detail/add-expense-wrapper';
import EditExpenseWrapper from './components/modules/Detail/edit-expense-wrapper';
import {homeRoute, chartRoute} from "./utils/routing";

const styles = (theme) => ({
  '@global': {
    body: {
      padding: '0',
      margin: '0',
      fontFamily: `'Lato', sans-serif`,
      overflow: 'hidden',
      '-webkit-overflow-scrolling': 'touch'
    },
    html: {
      boxSizing: 'border-box'
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit'
    }
  },
  pageNotFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '40px'
  },
  link: {
    width: '100%',
    '& a': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.colors.white,
      textDecoration: 'none',
      '& .link-text': {
        paddingTop: '10px'
      }
    }
  },
  '@media (min-width: 1024px)': {
    container: {
      maxWidth: '1024px',
      height: '90vh',
      position: 'relative',
      overflow: 'hidden',
      margin: '20px auto',
      boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)'
    }
  }
});

const RoutedHeader = withRouter((props) => {
  return (
    <Header callbacks={{
      goBack: () => {
        props.history.goBack();
      },
      addExpense: () => {
        props.history.push(addExpenseRoute());
      },
      showMenu: props.callbacks.showMenu
    }} />
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  _renderMenu() {
    const {showMenu = false} = this.state;
    const {classes = {}} = this.props;
    return (
      <Menu isOpen={showMenu} callbacks={{
        closeMenu: () => {
          this.setState((prevState) => {
            return {...prevState, showMenu: false}
          });
        }
      }}>
        <div className={classes.link} onClick={() => {this.setState({showMenu: false})}}>
          <Link to={homeRoute()}>
            <div className='fa fa-home' />
            <div className='link-text'>
              <FormattedMessage id="menu.home" />
            </div>
          </Link>
        </div>
        <div className={classes.link} onClick={() => {this.setState({showMenu: false})}}>
          <Link to={chartRoute()}>
            <div className='fa fa-chart-pie' />
            <div className='link-text'>
              <FormattedMessage id="menu.chart" />
            </div>
          </Link>
        </div>
      </Menu>
    )
  }

  _renderHeader() {
    return (<RoutedHeader callbacks={{
      showMenu: () => {
        this.setState((prevState) => {
          return {...prevState, showMenu: true}
        });
      }
    }}/>);
  }

  _renderRoutes() {
    return (
      <div>     
        <Switch>
          <Route exact path="/" component={HomeWrapper}/>
          <Route path='/home/:year?/:month?' component={HomeWrapper} />
          <Route path='/add' component={AddExpenseWrapper} />
          <Route path='/edit/:id?/:year?/:month?/:day?' component={EditExpenseWrapper} />
          <Route path='/chart/:year?/:month?' component={ChartWrapper} />
          <Route component={HomeWrapper} />
        </Switch>          
      </div>
    );
  }
  render() {
    const {classes = {}} = this.props;
    return (
      <Router>
        <div className={classes.container}>
          <div>
            {this._renderMenu()}
          </div>
          <div>
            {this._renderHeader()}
            {this._renderRoutes()}
          </div>
        </div>
      </Router>
    );
  }
}

export default injectSheet(styles)(App);
