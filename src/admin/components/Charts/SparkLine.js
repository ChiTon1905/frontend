import React from 'react'
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';


const data = {

  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  },
};


const SparkLine = ({ width, height }) => {
  return (
    <div id="chart">
      <ReactApexChart options={data.options} series={data.series} type="line" height={height} width={width} />
    </div>

  );
}

export default SparkLine

