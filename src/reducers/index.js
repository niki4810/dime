import { combineReducers } from 'redux';
import pathOr from 'ramda/src/pathOr';
import omit from 'ramda/src/omit';
import isEmpty from 'ramda/src/isEmpty';
import dayjs from 'dayjs';
import {FETCH_EXPENSE_SUCCESS, FETCH_EXPENSE_REQUEST} from '../components/modules/Home/actions';
import {
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS
} from '../components/modules/Detail/actions';
import {FETCH_STATUS, PAGES} from "../constants";

const fetchStatus = (state = {}, action) => {
  switch(action.type) {
    case FETCH_EXPENSE_REQUEST: {
      const {page = PAGES.HOME} = action; 
      return Object.assign({
        [page]: FETCH_STATUS.REQUESTING
      });
    }
    case FETCH_EXPENSE_SUCCESS: {
      const {page = PAGES.HOME} = action; 
      return Object.assign({
        [page]: FETCH_STATUS.SUCCESS
      });
    }
    case DELETE_EXPENSE_REQUEST:
    case UPDATE_EXPENSE_REQUEST: {
      return Object.assign({
        [PAGES.EDIT_EXPENSE]: FETCH_STATUS.REQUESTING
      });
    }
    case ADD_EXPENSE_REQUEST: {
      return Object.assign({
        [PAGES.ADD_EXPENSE]: FETCH_STATUS.REQUESTING
      });
    }
    case DELETE_EXPENSE_SUCCESS:
    case UPDATE_EXPENSE_SUCCESS: {
      return Object.assign({
        [PAGES.EDIT_EXPENSE]: FETCH_STATUS.SUCCESS
      });
    }
    case ADD_EXPENSE_SUCCESS: {
      return Object.assign({
        [PAGES.ADD_EXPENSE]: FETCH_STATUS.SUCCESS
      });
    }
    default: 
      return state;
  }
};

const pageStatus = (state = {}, action) => {
  switch(action.type) {
    case DELETE_EXPENSE_REQUEST:
    case UPDATE_EXPENSE_REQUEST: {
      return Object.assign({
        [PAGES.EDIT_EXPENSE]: {
          [action.buttonType]: {
            disabled: true,
            displaySpinner: true
          }
        }
      });
    }
    case DELETE_EXPENSE_SUCCESS:
    case UPDATE_EXPENSE_SUCCESS: {
      return Object.assign({
        [PAGES.EDIT_EXPENSE]: {
          [action.buttonType]: {
            disabled: false,
            displaySpinner: false
          }
        }
      });
    }
    case ADD_EXPENSE_REQUEST: {
      return Object.assign({
        [PAGES.ADD_EXPENSE]: {
          [action.buttonType]: {
            disabled: true,
            displaySpinner: true
          }
        }
      });
    }
    case ADD_EXPENSE_SUCCESS: {
      return Object.assign({
        [PAGES.ADD_EXPENSE]: {
          [action.buttonType]: {
            disabled: false,
            displaySpinner: false
          }
        }
      });
    }
    default: 
      return state;
  }
};

const expenses = (state = {}, action) => {
  switch(action.type) {
    case DELETE_EXPENSE_SUCCESS: {
      const {date: oldDate, oldExpenseID} = action;
      const oldYear = oldDate.format("YYYY");
      const oldMonth = oldDate.format("M");
      const oldDay = oldDate.format("DD");
      const omittedDayData = omit([oldExpenseID], pathOr({}, [oldYear, oldMonth, oldDate], state));
      const omittedMonthData = pathOr({}, [oldYear, oldMonth], state);
      const omittedExpense = Object.assign({}, state, {
        [oldYear]: Object.assign({}, pathOr({}, [oldYear], state), {
           [oldMonth]: Object.assign({}, omittedMonthData, {
            [oldDay]: omittedDayData
           })
        })
      });
      if (isEmpty(pathOr({}, [oldYear, oldMonth, oldDate], state))) {
        delete omittedExpense[oldYear][oldMonth][oldDay];
      }
      return omittedExpense;
    }
    case UPDATE_EXPENSE_SUCCESS: {
      const {newExpense = {}, oldExpenseID, oldExpense, newDate} = action;
      const oldDate = pathOr("", ["date"], oldExpense);
      const oldYear = dayjs(oldDate).format("YYYY");
      const oldMonth = dayjs(oldDate).format("M");
      const oldDay = dayjs(oldDate).format("DD");
      const omittedDayData = omit([oldExpenseID], pathOr({}, [oldYear, oldMonth, oldDay], state));
      const omittedMonthData = pathOr({}, [oldYear, oldMonth], state);

      const omittedExpense = Object.assign({}, state, {
        [oldYear]: Object.assign({}, pathOr({}, [oldYear], state), {
           [oldMonth]: Object.assign({}, omittedMonthData, {
            [oldDay]: omittedDayData
           })
        })
      });
      if (isEmpty(pathOr({}, [oldYear, oldMonth, oldDay], state))) {
        delete omittedExpense[oldYear][oldMonth][oldDay];
      }
      const newYear = newDate.format("YYYY");
      const newMonth = newDate.format("M");
      const newDay = newDate.format("DD");
      const addedExpense = Object.assign({}, omittedExpense, {
        [newYear]: Object.assign({}, pathOr({}, [newYear], omittedExpense), {
           [newMonth]: Object.assign({}, pathOr({}, [newYear, newMonth], omittedExpense), {
            [newDay]: Object.assign({},
              pathOr({}, [newYear, newMonth, newDay], omittedExpense),
              pathOr({}, [newDay], newExpense)
            )
           })
        })
      });
      return addedExpense;
    }
    case ADD_EXPENSE_SUCCESS: {
      const {data, year, month, day} = action;
      const currentDayData = pathOr({}, [year, month, day], state)
      const mergedDayData = Object.assign(currentDayData, data[day]);
      const newData = Object.assign({}, pathOr({}, [year, month], state), {
       [day]: mergedDayData
      });
      const newState = Object.assign({}, state, {
        [year]: Object.assign({}, pathOr({}, [year], state), {
          [month]: newData
        })
      });
      return newState;
    }
    case FETCH_EXPENSE_SUCCESS: {
      const {data, year, month} = action;
      const newData = Object.assign({}, pathOr({}, [year, month], state), data);
      const newState = Object.assign({}, state, {
        [year]: Object.assign({}, pathOr({}, [year], state), {
          [month]: newData
        })
      });
      return newState;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  fetchStatus,
  pageStatus,
  expenses
})

export default rootReducer