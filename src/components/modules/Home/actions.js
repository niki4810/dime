import path from 'ramda/src/path';
import filter from 'ramda/src/filter';
import isNil from 'ramda/src/isNil';
import {PAGES} from "../../../constants";
import config from '../../../config';
export const FETCH_EXPENSE_REQUEST = "FETCH_EXPENSE_REQUEST";
export const fetchExpenseRequest = (page = PAGES.HOME) => {
  return {
    type: FETCH_EXPENSE_REQUEST,
    page
  };
};

export const FETCH_EXPENSE_SUCCESS = "FETCH_EXPENSE_SUCCESS";
export const fetchExpenseSuccess = (data, page = PAGES.HOME) => {
  return {
    type: FETCH_EXPENSE_SUCCESS,    
    data: data.expenses,
    year: data.year,
    month: data.month,
    page
  };
};

export const fetchExpenses = (date, page = PAGES.HOME) => {
  return (dispatch, getState) => {
    const {year, month} = date;
    const {expenses = {}} = getState();
    const currentExpenses = path([year, month], expenses);
    if(isNil(currentExpenses)) {
      dispatch(fetchExpenseRequest(page));
      const url = `${config.appURL}expenses/${year}/${month}.json`;
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(fetchExpenseSuccess({
            expenses: filter((expense) => {
              return !isNil(expense);
            },json || []),
            year,
            month,
          }, page));
        });
    }
    return dispatch(fetchExpenseSuccess({
      expenses: currentExpenses,
      year,
      month
    }));
  };
};
