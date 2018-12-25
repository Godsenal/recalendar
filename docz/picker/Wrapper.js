import React from 'react';

export default class Wrapper extends React.Component {
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
