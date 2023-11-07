import React from 'react'
import Chart from 'react-apexcharts'
const data =
{
  options: {},
  series: [44, 55, 41, 17, 15],
  labels: ['A', 'B', 'C', 'D', 'E']
}

const Pie = () => {

  return (
     <div className="donut">
        <Chart options={data.options} series={data.series} type="donut" width="380" />
      </div>
  )
}

export default Pie