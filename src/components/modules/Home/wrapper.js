import React from 'react';
import {connect} from 'react-redux';
import pathOr from 'ramda/src/pathOr';
import values from 'ramda/src/values';
import mapObjIndexed from 'ramda/src/mapObjIndexed';
import natsort from 'natsort';
import Home from './index';
import * as actionCreators from './actions';
import dayjs from 'dayjs';
import {FETCH_STATUS, PAGES} from "../../../constants";
import Spinner from '../../core/Spinner';
import {homeRoute, editExpenseRoute} from '../../../utils/routing';

const sorter = natsort({desc: true});
class HomeWrapper extends React.Component {
  getDates(props) {
    const {match ={}} = props;
    const {params = {}} = match;
    const {year = dayjs().year(), month = dayjs().month() + 1} = params;
    return {year, month};
  }

  componentDidMount() {
    const {fetchExpenses = () => {}} = this.props;
    const {year, month} = this.getDates(this.props);
    fetchExpenses({year, month});
  }

  componentWillReceiveProps(nextProps) {
    const {fetchExpenses = () => {}} = this.props;
    const {year, month} = this.getDates(this.props);
    const {year:nextYear, month:nextMonth} = this.getDates(nextProps);
    if (year !== nextYear ||  month !== nextMonth) {
      fetchExpenses({year: nextYear, month: nextMonth});
    }
  }

  formatExpenses() {
    let totalPrice = 0;
    const {expenses} = this.props;
    const {year, month} = this.getDates(this.props);
    const currentMonthExpenses = pathOr({}, [year, month], expenses);
    const listItems = values(mapObjIndexed((val, day) => {
      const data = mapObjIndexed((expenseData, expenseId) => {
        const _amount = typeof expenseData.amount === "string" ? Number(expenseData.amount) : expenseData.amount;
        totalPrice += _amount;
        return Object.assign({}, expenseData, {
          id: expenseId,
          date: `${year}-${month}-${day}` 
        });
      }, val);
      return Object.assign({}, {id: `day-${day}`, title: `${year}-${month}-${day}`, data: values(data)});
    }, currentMonthExpenses));
  
    
    listItems.sort(function(a, b) {
      return sorter(a.id, b.id);
    });

    return {listItems, totalPrice: totalPrice.toFixed(2)};
  }
  render() {
    const {year, month} = this.getDates(this.props);
    const {fetchStatus = FETCH_STATUS.INITIAL} = this.props;
    const homePageFetchStatus = pathOr('', [PAGES.HOME], fetchStatus);
    if (homePageFetchStatus === FETCH_STATUS.REQUESTING) {
      return (
        <Spinner />
      );
    }

    return (
      <Home
        currentDate={dayjs(`${year}-${month}-01`)}
        callbacks={{
          showDetailsView: (data) => {
            const {date = dayjs().formay("YYYY-MM-DD")} = data;
            const split = date.split("-");
            this.props.history.push(editExpenseRoute({
              year: split[0],
              month: split[1],
              day: split[2],
              details: data
            }));
          },
          showNext: ({year , month}) => {
            this.props.history.push(homeRoute(year, month+1));
          },
          showPrevious: ({year , month}) => {
            this.props.history.push(homeRoute(year, month+1));
          }
        }}
        {...this.formatExpenses()}
      />
    );
  }
}

export default connect((state) => {
  return state
}, actionCreators)(HomeWrapper);
