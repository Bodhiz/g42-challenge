import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  AreaSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
} from 'react-vis';


class ChartArea extends Component {
  render() {
    return [
      <XYPlot key={'chart'} xType="time" height={this.props.height} width={this.props.width}>
        <XAxis />
        <YAxis />
        <VerticalGridLines />
        <HorizontalGridLines />
        <AreaSeries opacity={0.3} data={this.props.data} />
        <LineMarkSeries data={this.props.data} stroke="#12939a" strokeStyle="solid" />
      </XYPlot>
    ];
  }
}

export default ChartArea;
