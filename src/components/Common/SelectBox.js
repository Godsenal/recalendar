import React from 'react';
import { css } from 'glamor';

const baseSelectBox = css({
  display: 'inline-block',
  width: '33.3%',
  height: '25%',
  boxSizing: 'border-box',
});

const baseSelectInnerBox = selected => css({
  width: '100%',
  height: '100%',
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: selected ? 'rgba(0,0,0,0.3)' : 'inherit',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

class SelectBox extends React.PureComponent {
  render() {
    const { children, selected, ...props } = this.props;
    return (
      <div {...css(baseSelectBox)} {...props}>
        <div {...css(baseSelectInnerBox(selected))}>{children}</div>
      </div>
    );
  }
}

export default SelectBox;
