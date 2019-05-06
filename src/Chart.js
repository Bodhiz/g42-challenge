import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import ChartArea from './ChartArea';
import ChartVerticalBar from './ChartVerticalBar'
import ChartLine from './ChartLine'

class Chart extends Component {

  renderChart() {
    const type = this.props.type;
    switch (type) {
      case 'area':
        return <ChartArea data={this.props.data} height={this.props.height} width={this.props.width} />
      case 'verticalBars':
        return <ChartVerticalBar data={this.props.data} height={this.props.height} width={this.props.width} />
      case 'line':
        return <ChartLine data={this.props.data} height={this.props.height} width={this.props.width} />
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        {this.renderChart()}
      </div>
    );
  }
}

export default Chart;
