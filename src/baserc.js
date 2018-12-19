import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import eachDay from 'date-fns/each_day';
import getDaysInMonth from 'date-fns/get_days_in_month';
import { css } from 'glamor';
import { YearHeader, MonthHeader } from './components/Common';

const baseContainer = css({
  width: 350,
  height: 350,
  color: 'black',
  position: 'relative',
  backgroundColor: 'white',
});

const baseHeader = css({
  display: 'flex',
  alignItems: 'center',
  height: '10%',
  padding: '.5rem 0',
  boxSizing: 'border-box',
});

const baseBody = css({
  height: '90%',
});
const baserc = Wrapped => class extends Component {
    /* eslint-disable */
    state = {
      currentDate: this.props.initialDate,
      year: this.props.initialDate.getFullYear(),
      month: this.props.initialDate.getMonth(),
      lastDayOfMonth: getDaysInMonth(this.props.initialDate),
    };

    static propTypes = {
      dateData: PropTypes.object,
      initialDate: PropTypes.instanceOf(Date),
      styles: PropTypes.object,
    };

    static defaultProps = {
      dateData: {},
      initialDate: new Date(),
      styles: {},
    };
    updateDate = date => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const lastDayOfMonth = getDaysInMonth(date);
      this.setState({
        currentDate: date,
        year,
        month,
        lastDayOfMonth,
      });
    };

    getCalendarMonthDays = () => {
      const { year, month } = this.state;
      const startDate = startOfWeek(new Date(year, month, 0));
      const endDate = endOfWeek(
        new Date(year, month, getDaysInMonth(year, month)),
      );
      return eachDay(startDate, endDate);
    };

    getFirstDateOfMonth = date => {
      const currentDate = new Date(date.getFullYear(), 0);
      return currentDate;
    };

    changeMonth = month => {
      const { currentDate } = this.state;
      const newDate = setMonth(currentDate, month);
      this.updateDate(newDate);
    };

    changeYear = year => {
      const { currentDate } = this.state;
      const newYear = setYear(currentDate, year);
      this.updateDate(newYear);
    };

    render() {
      const { year, month } = this.state;
      const { styles } = this.props;
      const { container, header } = styles;
      return (
        <div {...css(baseContainer, container)}>
          <div {...css(baseHeader, header)}>
            <YearHeader
              {...this.props}
              changeYear={this.changeYear}
              year={year}
            />{' '}
            <MonthHeader
              {...this.props}
              changeMonth={this.changeMonth}
              month={month}
            />{' '}
          </div>
          <div className={baseBody}>
            <Wrapped
              {...this.props}
              {...this.state}
              changeMonth={this.changeMonth}
              changeYear={this.changeYear}
              updateDate={this.updateDate}
              getCalendarMonthDays={this.getCalendarMonthDays}
            />{' '}
          </div>{' '}
        </div>
      );
    }
  };

export default baserc;
