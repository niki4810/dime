import React from 'react';
import {connect} from 'react-redux';
import pathOr from 'ramda/src/pathOr';
import values from 'ramda/src/values';
import flatten from 'ramda/src/flatten';
import map from 'ramda/src/map';
import reduce from 'ramda/src/reduce';
import Chart from './index';
import * as actionCreators from '../Home/actions';
import dayjs from 'dayjs';
import {FETCH_STATUS, PAGES} from "../../../constants";
import Spinner from '../../core/Spinner';
import {chartRoute} from '../../../utils/routing';
import {CATEGORIES_MAP} from '../../../constants';

class ChartWrapper extends React.Component {
  getDates(props) {
    const {match ={}} = props;
    const {params = {}} = match;
    const {year = dayjs().year(), month = dayjs().month() + 1} = params;
    return {year, month};
  }

  componentDidMount() {
    const {fetchExpenses = () => {}} = this.props;
    const {year, month} = this.getDates(this.props);
    fetchExpenses({year, month}, PAGES.CHART);
  }

  componentWillReceiveProps(nextProps) {
    const {fetchExpenses = () => {}} = this.props;
    const {year, month} = this.getDates(this.props);
    const {year:nextYear, month:nextMonth} = this.getDates(nextProps);
    if (year !== nextYear ||  month !== nextMonth) {
      fetchExpenses({year: nextYear, month: nextMonth}, PAGES.CHART);
    }
  }

  getExpensesByCategory() {
    const {year, month} = this.getDates(this.props);
    const currentMonthExpenses = pathOr({}, ["expenses", year, month], this.props);    
    const data = flatten(map((date) => { 
      return values(date);
      }, values(currentMonthExpenses)));
    const expenseByCategory = reduce((acc, expense) => {
      const {category, amount} = expense;
      const categoryDisplayName = CATEGORIES_MAP[category] || CATEGORIES_MAP['fa-cubes'];
      const numAmount  = typeof amount === "string" ? parseFloat(amount) : amount;
      if(acc[categoryDisplayName]) {
        acc[categoryDisplayName] += numAmount;
      } else {
        acc[categoryDisplayName] = numAmount;
      }
      return acc;
    }, {}, data);
    return expenseByCategory;
  }
  getChartAndLegendData(expenseByCategory) {
    // const {currencySymbol = 'currencySymbols.USD'} = this.props;
    const chartData = [];
    const legendData = [];
    let totalPrice = 0;
    for(let expense in expenseByCategory) {
      const price = expenseByCategory[expense];
      totalPrice += price;
      // `$${price.toFixed(2)}`
      chartData.push({x: expense, y: price, label: ''});
      legendData.push({name: `${expense} : $${price.toFixed(2)}`})
    }
    return {
      chartData,
      legendData,
      totalPrice: `$${totalPrice.toFixed(2)}`
    };
  }
  render() {
    const {year, month} = this.getDates(this.props);
    const {fetchStatus = FETCH_STATUS.INITIAL} = this.props;
    const chartPageStatus = pathOr('', [PAGES.CHART], fetchStatus);
    if (chartPageStatus === FETCH_STATUS.REQUESTING) {
      return (
        <Spinner />
      );
    }
    const expenseByCategory = this.getExpensesByCategory();
    const {chartData, legendData, totalPrice} = this.getChartAndLegendData(expenseByCategory);
    return (
      <Chart
        currentDate={dayjs(`${year}-${month}-01`)}
        chartData={chartData}
        legendData={legendData}
        totalPrice={totalPrice}
        expenseByCategory={expenseByCategory}
        callbacks={{
          showNext: ({year , month}) => {
            this.props.history.push(chartRoute(year, month+1));
          },
          showPrevious: ({year , month}) => {
            this.props.history.push(chartRoute(year, month+1));
          }
        }}
      />
    );
  }
}

export default connect((state) => {
  return state
}, actionCreators)(ChartWrapper);
