import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import format from 'date-fns/format';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';
import { css } from 'glamor';
import { Event } from '.';

const baseDateBox = css({
  fontSize: 14,
  position: 'relative',
  minWidth: '2.5em',
  minHeight: '2.5em',
  textAlign: 'center',
  verticalAlign: 'top',
  cursor: 'pointer',
  opacity: 1,
  transition: 'opacity 0.2s',
});
const baseDateText = isThisMonth => css({
  marginBottom: '0.3em',
  cursor: 'pointer',
  color: isThisMonth ? 'inherit' : '#ccc',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
});
const baseTodayBox = css({
  border: '1px solid #f9748a',
});
const Day = ({
  day,
  dateData,
  month,
  onDateClick,
  onDateHover,
  dateStyle, // from pick or range date
  markToday = false,
  styles,
  ...props
}) => {
  const isToday = markToday && isSameDay(day, new Date());
  const isThisMonth = getMonth(day) === month;
  const dayData = dateData[format(day, 'YYYY-MM-DD')];
  const events = dayData ? dayData.events : [];
  const dayStyles = dayData && dayData.styles ? dayData.styles : {};
  const { dateBox, dateText } = styles;
  // const isSelected = multiple
  //   ? selected.some(item => isEqual(day, item))
  //   : isEqual(day, selected);
  return (
    <td
      {...css(
        baseDateBox,
        dateBox,
        dayStyles.dateBox,
        dateStyle,
        isToday && baseTodayBox,
      )}
      onMouseOver={onDateHover}
      onClick={onDateClick}
    >
      <button
        type="button"
        {...css(baseDateText(isThisMonth), dateText, dayStyles.dateText)}
      >
        {getDate(day)}
      </button>
      {events.map((event, i) => (
        <Event
          key={i}
          styles={styles}
          event={event}
          isThisMonth={isThisMonth}
        />
      ))}
    </td>
  );
};

export default Day;
