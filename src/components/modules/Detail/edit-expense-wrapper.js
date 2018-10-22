import React from 'react';
import {connect} from 'react-redux';
import Detail, {BUTTONS} from './index';
import * as actionCreators from './actions';
import pathOr from 'ramda/src/pathOr';
import dayjs from 'dayjs';
import {PAGES} from "../../../constants";


const EditExpenseWrapper = (props) => {
  const {updateExpense = () => {}, deleteExpense = () => {}, pageStatus} = props;
  const urlParams = new URLSearchParams(props.location.search);
  const details = urlParams.get("details") || "{}"; 
  const pageData = JSON.parse(details);
  const {id} = pageData;
  const editExpensePageStatus = pathOr({}, [PAGES.EDIT_EXPENSE], pageStatus);
  return (
    <Detail
      {...pageData}
      date={dayjs(pageData.date).format('YYYY-MM-DD')}
      sections={{
        displayDelete: true,
        displaySave: true
      }}
      pageStatus={editExpensePageStatus}
      callbacks={{
      onSaveClick: (data) => {
        const {date} = data;
        const _date = dayjs(date);
        updateExpense({
          id,
          oldExpense: pageData,
          newExpense: data,
          newDate: _date
        }, BUTTONS.EDIT, props.history);
      },
      onDeleteClick: (data) => {
        deleteExpense({
          id,
          date: dayjs(data.date)
        }, BUTTONS.DELETE, props.history);
      }
    }} />
  );
};


export default connect((state) => {
  return state
}, actionCreators)(EditExpenseWrapper);
