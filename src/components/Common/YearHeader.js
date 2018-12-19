import React, { createRef } from 'react';
import { css } from 'glamor';
import { Overlay, SelectBox } from '.';

const baseYearBox = css({
  textAlign: 'center',
  fontSize: '1em',
  fontWeight: 600,
});
const baseYearText = css({
  cursor: 'pointer',
  padding: 5,
});

class YearHeader extends React.PureComponent {
  overlay = createRef();

  currentYear = createRef();

  state = {
    isChanging: false,
    years: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { isChanging } = this.state;
    if (isChanging && prevState.isChanging !== isChanging) {
      if (this.overlay.current && this.currentYear.current) {
        this.overlay.current.scrollTop = this.currentYear.current.offsetTop - 100;
      }
    }
  }

  fillNumber = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  setChangeMode = () => {
    const { year } = this.props;
    let { years } = this.state;
    if (years.length <= 0) {
      years = this.fillNumber(year - 100, year + 100);
    }
    this.setState({
      isChanging: true,
      years,
    });
  };

  closeChangeMode = () => {
    this.setState({
      isChanging: false,
    });
  };

  changeYear = year => () => {
    const { changeYear } = this.props;
    changeYear(year);
    this.closeChangeMode();
  };

  render() {
    const { isChanging, years } = this.state;
    const { year, styles } = this.props;
    const { yearBox, yearText } = styles;
    return (
      <div>
        <div {...css(baseYearBox, yearBox)}>
          <span
            role="button"
            tabIndex="0"
            {...css(baseYearText, yearText)}
            onClick={this.setChangeMode}
          >
            {year}
          </span>
        </div>
        {isChanging && (
          <Overlay handleClose={this.closeChangeMode}>
            <div
              style={{ height: '100%', overflowY: 'auto' }}
              ref={this.overlay}
            >
              {years.map((item) => {
                const isSelected = item === year;
                return (
                  <SelectBox
                    key={item}
                    selected={isSelected}
                    onClick={this.changeYear(item)}
                  >
                    <span ref={isSelected ? this.currentYear : null}>
                      {item}
                    </span>
                  </SelectBox>
                );
              })}
            </div>
          </Overlay>
        )}
      </div>
    );
  }
}

export default YearHeader;
