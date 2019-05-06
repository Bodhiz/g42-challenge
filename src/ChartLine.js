import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';


class ChartLine extends Component {
  render() {
    return [
      <XYPlot key={'chart'} xType="time" height={this.props.height} width={this.props.width}>
        <XAxis />
        <YAxis />
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineMarkSeries data={this.props.data} stroke="#12939a" strokeStyle="solid" />
      </XYPlot>
    ];
  }
}

export default ChartLine;
