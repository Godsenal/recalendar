import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import { css } from 'glamor';
import { Day } from '../Common';

const baseRangeDate = css({
  color: 'white',
  backgroundColor: '#f9748a',
  ':hover': {
    opacity: 0.7,
  },
});
const withArrowStyle = css({
  '&:after': {
    content: "''",
    position: 'absolute',
    top: '50%', // half way down (vertical center).
    marginTop: -5, // adjust position, arrow has a height of 30px.
    border: 'solid 5px transparent',
    zIndex: 1,
  },
});
const rightArrow = css(withArrowStyle, {
  '&:after': {
    left: 0,
    borderLeftColor: '#FFF',
  },
});
const leftArrow = css(withArrowStyle, {
  '&:after': {
    right: 0,
    borderRightColor: '#FFF',
  },
});
const baseRangeIn = css({
  color: 'white',
  backgroundColor: '#ec84ac',
  ':hover': {
    opacity: 0.7,
  },
});
const RangeDay = ({
  day,
  startDate,
  endDate,
  inRangeDates,
  onDateClick,
  styles,
  ...props
}) => {
  const isStartDate = isSameDay(startDate, day);
  const isEndDate = isSameDay(endDate, day);
  const isInRange = inRangeDates.some(date => isSameDay(day, date));
  const dateClick = () => onDateClick(day);
  const { rangeInDate, rangeStartDate, rangeEndDate } = styles;
  const dateStyle = css(
    isInRange && css(baseRangeIn, rangeInDate),
    isStartDate && css(baseRangeDate, rightArrow, rangeStartDate),
    isEndDate && css(baseRangeDate, leftArrow, rangeEndDate),
  );
  return (
    <Day
      {...props}
      onDateClick={dateClick}
      day={day}
      dateStyle={dateStyle}
      styles={styles}
    />
  );
};

export default RangeDay;
