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
    hoverEnd: '',
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

  getRangeDate = (startDate, endDate) => (startDate && endDate ? eachDay(startDate, endDate) : []);

  getHoverRange = (startDate, endDate, hoverEnd) => {
    if (startDate && hoverEnd) {
      return eachDay(startDate, hoverEnd);
    }
    return [];
  };

  onSelectDate = (date) => {
    const { startDate, endDate, onSelectRange } = this.props;
    if (!startDate || isBefore(date, startDate)) {
      onSelectRange(date, endDate);
    } else if (!endDate) {
      onSelectRange(startDate, date);
    } else if (endDate && isAfter(date, startDate)) {
      onSelectRange(startDate, date);
    } else {
      onSelectRange('', '');
    }
  };

  onEndDateHover = (date) => {
    const { hoverEnd } = this.state;
    const { startDate, endDate } = this.props;
    if (startDate && !endDate && isAfter(date, startDate)) {
      this.setState({
        hoverEnd: date,
      });
    } else if (hoverEnd) {
      this.setState({
        hoverEnd: '',
      });
    }
  };

  render() {
    const { hoverEnd } = this.state;
    const { startDate, endDate, getCalendarMonthDays } = this.props;
    return (
      <Month
        {...this.props}
        Day={RangeDay}
        inRangeDates={this.getRangeDate(startDate, endDate)}
        inHoverRangeDates={this.getHoverRange(startDate, endDate, hoverEnd)}
        eachDays={getCalendarMonthDays()}
        onDateClick={this.onSelectDate}
        onEndDateHover={this.onEndDateHover}
      />
    );
  }
}

export default baserc(RcRangePicker);
