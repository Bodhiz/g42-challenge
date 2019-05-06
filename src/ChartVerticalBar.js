import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';


class ChartVerticalBar extends Component {
  render() {
    return [
      <XYPlot key={'chart'} xType="time" height={this.props.height} width={this.props.width}>
        <XAxis />
        <YAxis tickPadding={0} />
        <VerticalGridLines />
        <HorizontalGridLines />
        <VerticalBarSeries data={this.props.data} />
      </XYPlot>
    ];
  }
}

export default ChartVerticalBar;
