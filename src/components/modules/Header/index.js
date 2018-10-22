import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import startsWith from 'ramda/src/startsWith';
import Header from '../../core/Header';

const BaseHeaderWrapper = (props) => {
  const {location = {}, callbacks = {}} = props;
  const {showMenu = () => {}, addExpense = () => {}, goBack = () => {}} = callbacks;
  const {pathname = "/"} = location;
  let headerProps;
  if (startsWith('/add', pathname)) {
    headerProps = {
      title: "header.addAnExpense",
      icons: {
        left: '',
        right: 'fa-times'
      },
      callbacks:{
        onLeftClick: () => {},
        onRightClick: goBack
      } 
    };
  } else if(startsWith("/edit", pathname)) {
    headerProps = {
      title: "header.updateAnExpense",
      icons: {
        left: '',
        right: 'fa-times'
      },
      callbacks:{
        onLeftClick: () => {},
        onRightClick: goBack
      }
    };
  } else { 
    headerProps = {
      title:'header.projectName',
      icons: {left: 'fa-bars',right: 'fa-plus'},
      callbacks:{
        onLeftClick: showMenu,
        onRightClick: addExpense
      }
    }
  }
  return (
    <Header {...headerProps} />
  );
};

export default withRouter(connect()(BaseHeaderWrapper));