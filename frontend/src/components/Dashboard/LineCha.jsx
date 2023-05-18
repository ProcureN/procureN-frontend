import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


export default class LineCha extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    const {data} = this.props
    console.log("data from line ", data)
    return (
      <>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name'  />
          <YAxis />
          <Tooltip />
          <Legend />
         <Line
            type='monotone'
            dataKey='Approved'
            stroke='#5c67f5'
            activeDot={{ r: 8 }}
          />
           <Line type='monotone' dataKey='Pending' stroke='#cb67ac' />
          <Line type='monotone' dataKey='Rejected' stroke='#e00909' /> 
        </LineChart>
      </ResponsiveContainer>
        {/* <div>{JSON.stringify(data3)}</div> */}
      </>
    );
  }
}
