import React from 'react';
import PropTypes from 'prop-types';

const Week = ({ daysInWeek, Day, ...props }) => (
  <tr>
    {daysInWeek.map(day => (
      <Day {...props} key={day} day={day} />
    ))}
  </tr>
);
Week.propTypes = {
  daysInWeek: PropTypes.array.isRequired,
  Day: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
export default Week;
