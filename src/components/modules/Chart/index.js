import React from 'react';
import compose from 'ramda/src/compose';
import injectSheet from 'react-jss';
import isEmpty from 'ramda/src/isEmpty';
import {injectIntl} from 'react-intl';
import { VictoryPie, VictoryLegend, VictoryLabel } from 'victory';
import DateSelector from '../../core/DateSelector';
import EmptyField from '../../core/EmptyField';
import {CATEGORIES_COLORS_MAP} from '../../../constants';
import {getRandomHexColor} from '../../../utils/common';
const baseStyle = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  emptyFieldContainer: {
    marginTop: '-55px'
  },
  title: {
    padding: '10px',
    fontSize: '20px',
    fontWeight: '700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chart: {
    margin: '0 auto',
    width: "380px",
    height: "380px"
  },
  legend: {
    marginTop: "-25px"
  }
});

const BaseChart = (props) => {
  const {classes = {}, totalPrice, chartData = [], legendData = [], callbacks = {}, currentDate, intl = {}} = props;
  const {
    showPrevious = () => {},
    showNext = () => {}
  } = callbacks;
  const charDataEmpty = isEmpty(chartData);
  return (
    <div className={classes.container}>
      <DateSelector
        currentDate={currentDate}
        callbacks={{
          onPrevClick: showPrevious,
          onNextClick: showNext
        }}
      />
      {!charDataEmpty && <div className={classes.title}>
        {`${intl.formatMessage({id: 'chartPage.expensesByCategory'})} (Total: ${totalPrice})`}
      </div>}
      {!charDataEmpty && <div className={classes.chart}>
          <VictoryPie
            labels={() => null}
            data={chartData}
            labelRadius={150}
            style={{ labels: { fill: "#444", fontSize: 12, fontWeight: "bold" } }}
            colorScale={CATEGORIES_COLORS_MAP}
            width={380}
            height={380}
          />
        <div className={classes.legend}>
          <VictoryLegend
            borderPadding={{left: 20}}
            colorScale={CATEGORIES_COLORS_MAP}
            data={legendData}
            style={{ title: {fontSize: 25 }, labels: {fontSize: 20} }} 
            />
          </div>
      </div>}
      {charDataEmpty && <EmptyField additionalClasses={{container: classes.emptyFieldContainer}} />}
    </div>
  );
};

export default compose(injectSheet(baseStyle), injectIntl)(BaseChart);
