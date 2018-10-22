import React from 'react';
import {connect} from 'react-redux';
import Detail, {BUTTONS} from './index';
import * as actionCreators from './actions';
import pathOr from 'ramda/src/pathOr';
import dayjs from 'dayjs';
import {PAGES} from "../../../constants";


const AddExpenseWrapper = (props) => {
  const {addExpense = () => {}, pageStatus} = props;

  const addExpensePageStatus = pathOr({}, [PAGES.ADD_EXPENSE], pageStatus);
  return (
    <Detail
      date={dayjs().format('YYYY-MM-DD')}
      pageStatus={addExpensePageStatus}
      callbacks={{
      onSaveClick: (data) => {
        addExpense(data, BUTTONS.EDIT, props.history);
      }
    }} />
  );
};


export default connect((state) => {
  return state
}, actionCreators)(AddExpenseWrapper);
