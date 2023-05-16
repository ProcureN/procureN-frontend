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

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const data2 = [
  {
    name: 'User 1',
    approved: 4000,
    pending: 2400,
    rejected: 2400,
  },
  {
    name: 'User 2',
    approved: 3000,
    pending: 1400,
    rejected: 1000,
  },
  {
    name: 'User 3',
    approved: 5000,
    pending: 3100,
    rejected: 400,
  },
  {
    name: 'User 4',
    approved: 6000,
    pending: 2470,
    rejected: 2400,
  },
  {
    name: 'User 1',
    approved: 4000,
    pending: 5400,
    rejected: 2400,
  },
  {
    name: 'User 2',
    approved: 5400,
    pending: 1400,
    rejected: 1000,
  },
  {
    name: 'User 3',
    approved: 2130,
    pending: 3470,
    rejected: 400,
  },
  {
    name: 'User 4',
    approved: 4560,
    pending: 2450,
    rejected: 4100,
  },
  {
    name: 'User 1',
    approved: 4000,
    pending: 2400,
    rejected: 2400,
  },
  {
    name: 'User 2',
    approved: 6500,
    pending: 6500,
    rejected: 3000,
  },
  {
    name: 'User 3',
    approved: 4000,
    pending: 3400,
    rejected: 400,
  },
  {
    name: 'User 4',
    approved: 4000,
    pending: 2400,
    rejected: 2400,
  },

 
 

];

export default class LineCha extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data2}
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
            dataKey='approved'
            stroke='#5c67f5'
            activeDot={{ r: 8 }}
          />
          <Line type='monotone' dataKey='pending' stroke='#cb67ac' />
          <Line type='monotone' dataKey='rejected' stroke='#ff0062' />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
