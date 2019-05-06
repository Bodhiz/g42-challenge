import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { Form, Container, Row, Col } from 'react-bootstrap'
import Chart from './Chart'
import LoadingSpinner from './LoadingSpinner'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      charts: [{
        id: 'T10Y2Y',
        label: 'T10Y2Y',
        series: ['T10Y2Y'],
        type: 'area',
        observationStart: '',
        data: [],
      }, {
        id: 'GDPCA',
        label: 'GDPCA',
        series: ['GDPCA'],
        type: 'verticalBars',
        observationStart: '1999-01-01',
        data: [],
      }, {
        id: 'DGS10T10YIE',
        label: 'DGS10 minus T10YIE',
        series: ['DGS10', 'T10YIE'],
        type: 'line',
        observationStart: '',
        data: [],
      },
      ],
      selectedChart: 'T10Y2Y',
      isLoading: false,
    };

    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  async componentDidMount() {
    const chart = this.getChart(this.state.selectedChart);
    this.setChartData(chart);
  }

  async fetchFredSeries(seriesId, frequency, observationStart) {
    this.setState({ isLoading: true });
<<<<<<< HEAD
    const data = await fetch(`/api/fred/series/observations?series_id=${seriesId}&frequency=${frequency}&observation_start=${observationStart}&api_key=ac95f4955bcea62d846c5eea3adbddee&file_type=json`).then(
=======
    const data = await fetch(`/series/observations?series_id=${seriesId}&frequency=${frequency}&observation_start=${observationStart}&api_key=ac95f4955bcea62d846c5eea3adbddee&file_type=json`).then(
>>>>>>> Initial commit
      (response) => {
        if (response.status !== 200) {
          console.warn(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }
        return response.json().then((data) => {
          let formatedData = [];
          formatedData = data.observations.map((observation) => {
            let x, y;
            x = new Date(observation.date).getTime();
            parseFloat(observation.value) ? y = parseFloat(observation.value) : y = 0;
            return { x, y };
          })

          return formatedData;
        });
      }
    )
    return data;
  }

  async setChartData(chart) {
    let chartData = {};
    // fetchapi only if data has not been fetched yet
    if (!chart.data.length) {
      // fetch all the series needed for the chart
      await Promise.all(chart.series.map(async (serie, index) => {
        const data = await this.fetchFredSeries(serie, 'a', chart.observationStart);
        chart.series.length > 1 ? chartData[serie] = data : chartData = data;
      }));

      if (chart.id === 'DGS10T10YIE') {
        chartData = this.computeDGS10T10YIEChartData(chartData);
      }

      const chartIndex = this.state.charts.findIndex(c => c.id === chart.id);
      const charts = [...this.state.charts] // important to create a copy, otherwise you'll modify state outside of setState call
      charts[chartIndex].data = chartData;
      this.setState({ charts });
      this.setState({ isLoading: false });
    }
  }

  computeDGS10T10YIEChartData(data) {
    const chartData = [];
    data.DGS10.forEach((dataGroup1) => {
      data.T10YIE.forEach((dataGroup2) => {
        //if same date the calculation makes sense
        if (dataGroup1.x === dataGroup2.x) {
<<<<<<< HEAD
=======
          console.log(dataGroup1.y, dataGroup2.y);
>>>>>>> Initial commit
          const y = dataGroup1.y - dataGroup2.y;
          chartData.push({ x: dataGroup1.x, y })
        }
      });
    });
    return chartData;
  }

  getChart(chartId) {
    const { charts } = this.state;
    return charts.find((chart) => chart.id === chartId);
  }


  getChartType(chartId) {
    return this.state.charts.find((chart) => chart.id === chartId).type;
  }

  getChartData(chartId) {
    return this.state.charts.find((chart) => chart.id === chartId).data;
  }


  handleRadioChange({ currentTarget }) {
    //setState is async, so use cb function. 
    this.setState({ selectedChart: currentTarget.value }, () => {
      const chart = this.getChart(currentTarget.value);
      this.setChartData(chart);
    });
  }


  render() {
    const { isLoading, selectedChart, charts } = this.state;
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-center">G42 Challenge</h1>
            <div className="jumbotron">
              <div className="wrapper d-flex">
                <LoadingSpinner loading={isLoading} />
                {!isLoading &&
                  <Chart data={this.getChartData(selectedChart)} height={400} width={1000} type={this.getChartType(selectedChart)} />
                }
              </div>
              <Form className="d-flex center align-items-center justify-content-center">
                <Form.Label className="mb-0 mr-1"><strong>Series :</strong></Form.Label>
                {charts.map((chart) => {
                  return <Form.Check inline
                    key={chart.label.toString()}
                    onChange={this.handleRadioChange}
                    checked={selectedChart === chart.id}
                    name="seriesRadio"
                    type={'radio'}
                    label={chart.label}
                    id={chart.id}
                    value={chart.id}
                  />
                })}
              </Form>
            </div>
          </Col>
        </Row >
      </Container >
    );
  }
}

export default App;
