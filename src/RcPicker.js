import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isSameDay from 'date-fns/is_same_day';
import baserc from './baserc';
import { Month } from './components/Common';
import { PickDay } from './components/RcPicker';

class RcPicker extends Component {
  static propTypes = {
    selected: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.instanceOf(Date),
      PropTypes.oneOf([null]),
      PropTypes.string,
    ]).isRequired,
    getCalendarMonthDays: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    onSelectDate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    multiple: false,
  };

  onSelectDate = (date, isSelected) => {
    const { onSelectDate } = this.props;
    const newSelected = isSelected ? '' : date;
    onSelectDate(newSelected);
  };

  onMultiSelectDate = (date, isSelected) => {
    const { selected, onSelectDate } = this.props;
    const newSelected = isSelected
      ? selected.filter(select => !isSameDay(select, date))
      : [...selected, date];
    onSelectDate(newSelected);
  };

  render() {
    const { multiple, getCalendarMonthDays } = this.props;
    const onDateClick = multiple ? this.onMultiSelectDate : this.onSelectDate;
    return (
      <Month
        {...this.props}
        Day={PickDay}
        eachDays={getCalendarMonthDays()}
        onDateClick={onDateClick}
      />
    );
  }
}

export default baserc(RcPicker);
