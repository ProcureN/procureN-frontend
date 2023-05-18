import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default class BarCha extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Approved' stackId='a' fill='#5c67f5' />
          <Bar dataKey='Pending' stackId='a' fill='#cb67ac' />
          <Bar dataKey='Rejected' stackId='a' fill='#e00909' />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
