import React from 'react'
import Chart from "react-apexcharts";

const data = {
          
  series: [
    {
    name: 'Budget',
    data: [13, 23, 20, 8, 13, 27],
    color: "#31ce23",
  },
    {
    name: 'Expense',
    data: [44, 55, 41, 67, 22, 43],
    color: "#858d85",
  } ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
        '01/05/2011 GMT', '01/06/2011 GMT'
      ],
    },
    legend: {
      position: 'bottom',
      offsetY: 0
    },
    fill: {
      opacity: 1
    }
  },


};


const Stacked = ({ width, height }) => {
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  )
}

export default Stacked