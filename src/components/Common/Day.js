import React from 'react';
import format from 'date-fns/format';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';
import { css } from 'glamor';

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
const baseEventBox = css({
  width: '100%',
  textAlign: 'center',
  fontSize: '.7em',
  wordBreak: 'break-all',
});

const Day = ({
  day,
  dateData,
  month,
  onDateClick,
  dateStyle, // from pick or range date
  styles,
  ...props
}) => {
  const isThisMonth = getMonth(day) === month;
  const dayData = dateData[format(day, 'YYYY-MM-DD')];
  const events = dayData ? dayData.events : [];
  const {
    dateBox, dateText, eventBox, eventText,
  } = styles;
  // const isSelected = multiple
  //   ? selected.some(item => isEqual(day, item))
  //   : isEqual(day, selected);
  return (
    <td {...css(baseDateBox, dateBox, dateStyle)} onClick={onDateClick}>
      <button type="button" {...css(baseDateText(isThisMonth), dateText)}>
        {getDate(day)}
      </button>
      {events.map((event, i) => (
        <div {...css(baseEventBox, eventBox)} key={i}>
          <span {...css(eventText)}>{event}</span>
        </div>
      ))}
    </td>
  );
};

export default Day;
