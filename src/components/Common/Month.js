import React from 'react';
import { css } from 'glamor';
import { Week, WeekHeader } from '.';

const baseTable = css({
  width: '100%',
  height: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  borderSpacing: '0px',
  border: '1px solid #ccc',
});
const Month = ({ eachDays, styles, ...props }) => {
  const weeks = Math.ceil(eachDays.length / 7);
  const { table } = styles;
  const eachWeeks = [];
  for (let i = 0; i < weeks; i += 1) {
    const startWeek = i * 7;
    const lastWeek = (i + 1) * 7;
    eachWeeks.push(eachDays.slice(startWeek, lastWeek));
  }
  return (
    <table {...css(baseTable, table)}>
      <tbody>
        <WeekHeader styles={styles} {...props} />
        {eachWeeks.map((days, i) => (
          <Week
            {...props}
            key={i}
            daysInWeek={days}
            week={i + 1}
            styles={styles}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Month;
