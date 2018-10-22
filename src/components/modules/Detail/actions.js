import dayjs from 'dayjs';
import config from '../../../config';

export const ADD_EXPENSE_REQUEST = "ADD_EXPENSE_REQUEST";
export const addExpenseRequest = (buttonType) => {
  return {
    type: ADD_EXPENSE_REQUEST,
    buttonType
  };
};

export const ADD_EXPENSE_SUCCESS = "ADD_EXPENSE_SUCCESS";
export const addExpenseSuccess = ({data, buttonType, year, month, day}) => {
  return {
    type: ADD_EXPENSE_SUCCESS,
    buttonType,
    data,
    year,
    month,
    day
  };
};

export const UPDATE_EXPENSE_REQUEST = "UPDATE_EXPENSE_REQUEST";
export const updateExpenseRequest =  (buttonType) => {
  return {
    type: UPDATE_EXPENSE_REQUEST,
    buttonType
  };
};

export const UPDATE_EXPENSE_SUCCESS = "UPDATE_EXPENSE_SUCCESS";
export const updateExpenseSuccess = ({buttonType, newExpense, oldExpense, newDate, oldExpenseID}) => {
  return {
    type: UPDATE_EXPENSE_SUCCESS,
    buttonType,
    newExpense,
    newDate,
    oldExpenseID,
    oldExpense
  };
};

export const updateExpense = (expenseData, buttonType, routeHistory) => {
  return (dispatch) => {
    dispatch(updateExpenseRequest(buttonType));
    const{
      id,
      oldExpense = {},
      newExpense = {},
      newDate
    } = expenseData;
    const {date: oldDate} = oldExpense;
    const deleteUrl = `${config.appURL}expenses/${dayjs(oldDate).format("YYYY")}/${dayjs(oldDate).format("M")}/${dayjs(oldDate).format("DD")}/${id}.json`    
    const addUrl = `${config.appURL}expenses/${newDate.format("YYYY")}/${newDate.format("M")}/${newDate.format("DD")}.json`;
    const {amount, category, notes} = newExpense;
    const payload = {amount, category, notes};
    return fetch(addUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then((result = {}) => {
      const {name} = result;
      const data = {
        [newDate.format("DD")]: {
          [name]: {
            amount,
            category,
            notes
          }
        }
      };

      // delete old expense
      fetch(deleteUrl, {method: "DELETE"})
      .then(deleteResp => deleteResp.json())
      .then(() => {
        dispatch(updateExpenseSuccess({newExpense: data, newDate, oldExpenseID: id, oldExpense, buttonType}));
        routeHistory.goBack();
      });
    });
  };
};

export const DELETE_EXPENSE_REQUEST = "DELETE_EXPENSE_REQUEST";
export const deleteExpenseRequest = (buttonType) => {
  return {
    type: DELETE_EXPENSE_REQUEST,
    buttonType
  };
};

export const DELETE_EXPENSE_SUCCESS = "DELETE_EXPENSE_SUCCESS";
export const deleteExpenseSuccess = ({oldExpenseID, date, buttonType}) => {
  return {
    type: DELETE_EXPENSE_SUCCESS,
    buttonType,
    oldExpenseID,
    date
  };
};

export const deleteExpense = ({id, date}, buttonType, routeHistory) => {
  return (dispatch) => {
    dispatch(deleteExpenseRequest(buttonType));
    const deleteUrl = `${config.appURL}expenses/${date.format("YYYY")}/${date.format("M")}/${date.format("DD")}/${id}.json` 
    fetch(deleteUrl, {method: "DELETE"})
      .then(deleteResp => deleteResp.json())
      .then(() => {
        dispatch(deleteExpenseSuccess({oldExpenseID: id, date, buttonType}));
        routeHistory.goBack();
      });
  }
};

export const addExpense = (expense, buttonType, routeHistory) => {
  return (dispatch) => {
    dispatch(addExpenseRequest(buttonType));
    const {date, amount, category, notes} = expense;
    const year = dayjs(date).format('YYYY');
    const month = dayjs(date).format('M');
    const day = dayjs(date).format('DD');
    const url = `${config.appURL}expenses/${year}/${month}/${day}.json`
    const payload = {
      amount,
      category,
      notes
    };
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then((result = {}) => {
      const {name: id} = result;
      const data = {
        [day]: {
          [id]: {
            amount,
            category,
            notes
          }
        }
      };
      dispatch(addExpenseSuccess({data, year, month, day, buttonType}));
      routeHistory.goBack();
    });
  };
}