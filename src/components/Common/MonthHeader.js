import React from 'react';
import { css } from 'glamor';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { Overlay, SelectBox } from '.';

const baseMonthBox = css({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
});
const baseMonthText = css({
  fontSize: '0.7em',
  textAlign: 'center',
  cursor: 'pointer',
  flex: 1,
});
const baseArrow = css({
  width: 22,
  height: 22,
  cursor: 'pointer',
  opacity: 1,
  ':hover': {
    opacity: 0.7,
    transition: 'opacity 0.3s',
  },
});
class MonthHeader extends React.PureComponent {
  state = {
    isChanging: false,
  };

  setChangeMode = () => {
    this.setState({
      isChanging: true,
    });
  };

  closeChangeMode = () => {
    this.setState({
      isChanging: false,
    });
  };

  changeMonth = (month) => {
    const { changeMonth } = this.props;
    changeMonth(month);
    this.closeChangeMode();
  };

  render() {
    const { isChanging } = this.state;
    const { changeMonth, month, styles } = this.props;
    const { monthBox, monthText, arrow } = styles;
    return (
      <div {...css(baseMonthBox, monthBox)}>
        <div
          tabIndex="0"
          role="button"
          {...css(baseMonthText, monthText)}
          onClick={this.setChangeMode}
        >
          {month + 1}
월
        </div>
        <img
          {...css(baseArrow, arrow)}
          src={ArrowUp}
          onClick={() => changeMonth(month - 1)}
          alt="Arrow Up"
        />
        <img
          {...css(baseArrow, arrow)}
          src={ArrowDown}
          onClick={() => changeMonth(month + 1)}
          alt="Arrow Down"
        />
        {isChanging && (
          <Overlay handleClose={this.closeChangeMode}>
            {[...Array(12)].map((_, i) => (
              <SelectBox
                key={i}
                selected={i === month}
                onClick={() => this.changeMonth(i)}
              >
                {i + 1}
              </SelectBox>
            ))}
          </Overlay>
        )}
      </div>
    );
  }
}

export default MonthHeader;
