import React from 'react';
import { storiesOf } from '@storybook/react';
import { format } from 'date-fns';
import { RcPicker, RcPortal, RcRangePicker } from '../src';
import './base.css';

const buttonStyle = {
  fontSize: 16,
  padding: 10,
  border: '1px solid #ccc',
  outline: 'none',
  marginRight: 10,
  cursor: 'pointer',
};
class Wrapper extends React.Component {
  state = {
    selected: new Date(),
    multiSelected: [],
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    target: null,
  };

  onSelectDate = selected => this.setState({ selected });

  onMultiSelectDate = multiSelected => this.setState({ multiSelected });

  onSelectRange = (startDate, endDate) => this.setState({ startDate, endDate, target: null });

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
  .add('customizing', () => (
    <Wrapper>
      {({ selected, onSelectDate }) => (
        <RcPicker
          dayOfWeek={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          dateData={{
            '2018-12-25': {
              events: ['🎄 🎅'],
              styles: {
                dateBox: {
                  backgroundColor: 'red',
                },
                dateText: {
                  color: 'white',
                },
              },
            },
          }}
          markToday
          selected={selected}
          onSelectDate={onSelectDate}
          styles={{
            container: {
              width: 300,
              height: 300,
              backgroundColor: '#4aa4e4',
              border: '1px solid black',
            },
            header: {
              border: 'none',
            },
            table: {
              border: 'none',
            },
            dayContainer: {
              borderBottom: '1px solid black',
            },
            dayText: {
              color: 'black',
            },
            selectedBox: {
              backgroundColor: 'black',
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

storiesOf('RcPortal', module)
  .add('with portal', () => (
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
  ))
  .add('range select with portal', () => (
    <Wrapper>
      {({
        target, startDate, endDate, onSelectRange, onTargetClick,
      }) => (
        <>
          <label htmlFor="start">Start</label>
          <button
            id="start"
            type="button"
            onClick={onTargetClick}
            style={buttonStyle}
          >
            {startDate ? format(startDate, 'YYYY-MM-DD') : 'Start Date'}
          </button>
          <label htmlFor="end">End</label>
          <button
            id="end"
            type="button"
            onClick={onTargetClick}
            style={buttonStyle}
          >
            {endDate ? format(endDate, 'YYYY-MM-DD') : 'End Date'}
          </button>
          <RcPortal target={target}>
            <RcRangePicker
              startDate={startDate}
              endDate={endDate}
              onSelectRange={onSelectRange}
            />
          </RcPortal>
        </>
      )}
    </Wrapper>
  ));
