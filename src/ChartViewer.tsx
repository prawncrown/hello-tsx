import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import './App.css';

class ChartViewer extends Component {
  static randomScalingFactor=():number=> {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }
  onRefresh(chart:any) {
    chart.config.data.datasets.forEach(function(dataset:any) {
      dataset.data.push({
        x: Date.now(),
        y: ChartViewer.randomScalingFactor()
      });
    });
  }

  render() {
    return (
      <Line
        data={{
          datasets: [{
            data: []
          },]
        }}
        options={{
          scales: {
            xAxes: [{
              type: 'realtime',
              realtime: {
                duration: 20000,
                refresh: 1000,
                delay: 2000,
                onRefresh: this.onRefresh,
              }
            }],
            yAxes: [{
				scaleLabel: {
					display: false,
				}
			}]
          }
        }}
      />
    );
  }
}


export default ChartViewer;

