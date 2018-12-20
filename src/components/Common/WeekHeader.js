import React from 'react';
import { css } from 'glamor';

const baseDayContainer = css({
  color: 'rgb(117, 117, 117)',
  borderBottom: '1px solid #ccc',
});
const baseDayBox = css({
  fontSize: '0.7em',
  height: '1em',
  padding: 10,
});
const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const WeekHeader = ({ dayOfWeek = DAY_OF_WEEK, styles }) => {
  const { dayContainer, dayBox, dayText } = styles;
  return (
    <tr {...css(baseDayContainer, dayContainer)}>
      {dayOfWeek.map(day => (
        <th {...css(baseDayBox, dayBox)} key={day}>
          <span {...css(dayText)}>{day}</span>
        </th>
      ))}
    </tr>
  );
};

export default WeekHeader;
