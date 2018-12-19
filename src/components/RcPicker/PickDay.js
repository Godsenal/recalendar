import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import { css } from 'glamor';
import { Day } from '../Common';

const baseSelectedBox = css({
  color: 'white',
  backgroundColor: '#f9748a',
  ':hover': {
    opacity: 0.7,
  },
});

const PickDay = ({
  day,
  multiple,
  selected,
  onDateClick,
  styles,
  ...props
}) => {
  const isSelected = multiple
    ? selected.some(item => isSameDay(day, item))
    : isSameDay(day, selected);
  const { selectedBox } = styles;
  const dateStyle = css(isSelected && css(baseSelectedBox, selectedBox));
  const dateClick = () => onDateClick(day, isSelected);
  return (
    <Day
      {...props}
      day={day}
      dateStyle={dateStyle}
      onDateClick={dateClick}
      styles={styles}
    />
  );
};

export default PickDay;
