import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const baseEventBox = css({
  position: 'absolute',
  left: 0,
  bottom: '1em',
  maxHeight: '1.5em',
  width: '100%',
  textAlign: 'center',
  fontSize: '.7em',
  wordBreak: 'break-all',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
const baseEventText = isThisMonth => css({
  color: isThisMonth ? 'inherit' : '#ccc',
});
class Event extends PureComponent {
  static propTypes = {
    event: PropTypes.string.isRequired,
  };

  render() {
    const { event, styles, isThisMonth } = this.props;
    const { eventBox, eventText } = styles;
    return (
      <div {...css(baseEventBox, eventBox)}>
        <span {...css(baseEventText(isThisMonth), eventText)}>{event}</span>
      </div>
    );
  }
}

export default Event;
