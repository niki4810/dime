import React from 'react'
import injectSheet from 'react-jss'
import classNames from 'classnames';
import dayjs from 'dayjs';

const baseStyles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
    userSelect: 'none'
  },
  prev: {
    flex: '1',
    textAlign: 'center',
    fontSize: '22px'
  },
  next: {
    flex: '1',
    textAlign: 'center',
    fontSize: '22px'
  },
  date: {
    flex: '10',
    textAlign: 'center'
  }
});

export class BaseDateSelector extends React.Component {
  constructor(props) {
    super(props);
    const {currentDate = dayjs()} = props;
    this.state = {
      currentDate
    };
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.currentDate !== nextProps.currentDate) {
      this.setState((prevState)=> {
        return {
          ...prevState,
          currentDate: nextProps.currentDate
        }
      });
    }
  }
  handlePrevClick() {
    this.setState((prevState) => {
      const {callbacks = {}} = this.props;
      const {onPrevClick = () => {}} = callbacks;
      const newDate = prevState.currentDate.subtract(1, 'month');
      onPrevClick({
        month: newDate.month(),
        year: newDate.year()
      });
      return {
        ...prevState,
        currentDate: newDate
      };
    });
  }
  handleNextClick() {
    this.setState((prevState) => {
      const {callbacks = {}} = this.props;
      const {onNextClick = () => {}} = callbacks;
      const newDate = prevState.currentDate.add(1, 'month');
      onNextClick({
        month: newDate.month(),
        year: newDate.year()
      });
      return {
        ...prevState,
        currentDate: newDate
      };
    });
  }
  render() {
    const {classes = {}, icons = {}} = this.props;
    const {prev = 'fa-angle-left', next = 'fa-angle-right'} = icons;
    const {currentDate} = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.prev} onClick={this.handlePrevClick}>
          <span className={classNames('fa', prev)}/>
        </div>
        <div className={classes.date}>
          {currentDate.format('MMMM, YYYY')}
        </div>
        <div className={classes.next} onClick={this.handleNextClick}>
          <span className={classNames('fa', next)}/>
        </div>
      </div>
    );
  }
};

export default injectSheet(baseStyles)(BaseDateSelector);