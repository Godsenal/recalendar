import React from 'react';
import { storiesOf } from '@storybook/react';
import { format } from 'date-fns';
import { RcPicker, RcPortal, RcRangePicker } from '../src';

class Wrapper extends React.Component {
  state = {
    selected: new Date(),
    multiSelected: [],
    startDate: '',
    endDate: '',
    target: null,
  };

  onSelectDate = selected => this.setState({ selected });

  onMultiSelectDate = multiSelected => this.setState({ multiSelected });

  onSelectRange = (startDate, endDate) => this.setState({ startDate, endDate });

  onTargetClick = (e) => {
    const { target } = this.state;
    const newTarget = target ? null : e.currentTarget;
    this.setState({
      target: newTarget,
    });
  };

  render() {
    const { children } = this.props;
    return children({
      ...this.state,
      ...this.props,
      onSelectDate: this.onSelectDate,
      onMultiSelectDate: this.onMultiSelectDate,
      onSelectRange: this.onSelectRange,
      onTargetClick: this.onTargetClick,
    });
  }
}

storiesOf('RcPicker', module)
  .add('base picker', () => (
    <Wrapper>
      {({ selected, onSelectDate }) => (
        <RcPicker selected={selected} onSelectDate={onSelectDate} />
      )}
    </Wrapper>
  ))
  .add('multi picker', () => (
    <Wrapper>
      {({ multiSelected, onMultiSelectDate }) => (
        <RcPicker
          multiple
          selected={multiSelected}
          onSelectDate={onMultiSelectDate}
        />
      )}
    </Wrapper>
  ))
  .add('custom style', () => (
    <Wrapper>
      {({ selected, onSelectDate }) => (
        <RcPicker
          selected={selected}
          onSelectDate={onSelectDate}
          styles={{
            container: {
              backgroundColor: 'pink',
              border: '1px solid black',
            },
            selectedBox: {
              backgroundColor: 'black',
            },
          }}
        />
      )}
    </Wrapper>
  ))
  .add('event', () => (
    <Wrapper>
      {({ selected, onSelectDate }) => (
        <RcPicker
          selected={selected}
          onSelectDate={onSelectDate}
          dateData={{
            '2018-12-25': {
              events: ['Christmas!'],
            },
          }}
        />
      )}
    </Wrapper>
  ));

storiesOf('RcRangePicker', module).add('range picker', () => (
  <Wrapper>
    {({ startDate, endDate, onSelectRange }) => (
      <RcRangePicker
        startDate={startDate}
        endDate={endDate}
        onSelectRange={onSelectRange}
      />
    )}
  </Wrapper>
));

storiesOf('RcPortal', module).add('with portal', () => (
  <Wrapper>
    {({
      target, selected, onSelectDate, onTargetClick,
    }) => (
      <>
        <button
          type="button"
          onClick={onTargetClick}
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'hotpink',
            color: 'white',
            borderRadius: 10,
            padding: 10,
            cursor: 'pointer',
          }}
        >
          {selected ? format(selected, 'YYYY-MM-DD') : 'Select date!'}
        </button>
        <RcPortal target={target}>
          <RcPicker selected={selected} onSelectDate={onSelectDate} />
        </RcPortal>
      </>
    )}
  </Wrapper>
));
