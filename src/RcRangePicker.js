import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isAfter from 'date-fns/is_after';
import eachDay from 'date-fns/each_day';
import isBefore from 'date-fns/is_before';
import baserc from './baserc';
import { Month } from './components/Common';
import { RangeDay } from './components/RcRangePicker';

class RcRangePicker extends Component {
  state = {
    inRangeDates: [],
  };

  static propTypes = {
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    onSelectRange: PropTypes.func.isRequired,
    getCalendarMonthDays: PropTypes.func.isRequired,
  };

  static defaultProps = {
    startDate: '',
    endDate: '',
  };

  onSelectDate = (date) => {
    const { startDate, endDate, onSelectRange } = this.props;
    if (!startDate || isBefore(date, startDate)) {
      onSelectRange(date, endDate);
      this.setState({
        inRangeDates: endDate ? eachDay(date, endDate) : [],
      });
    } else if (!endDate) {
      onSelectRange(startDate, date);
      this.setState({
        inRangeDates: eachDay(startDate, date),
      });
    } else if (endDate && isAfter(date, startDate)) {
      onSelectRange(startDate, date);
      this.setState({
        inRangeDates: eachDay(startDate, date),
      });
    } else {
      onSelectRange('', '');
      this.setState({
        inRangeDates: [],
      });
    }
  };

  render() {
    const { inRangeDates } = this.state;
    const { getCalendarMonthDays } = this.props;
    return (
      <Month
        {...this.props}
        Day={RangeDay}
        inRangeDates={inRangeDates}
        eachDays={getCalendarMonthDays()}
        onDateClick={this.onSelectDate}
      />
    );
  }
}

export default baserc(RcRangePicker);
