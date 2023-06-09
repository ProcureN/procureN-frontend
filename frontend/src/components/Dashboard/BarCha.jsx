import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [high, setHigh] = useState('85%');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) setHigh('90%');
    else if (screenSize <= 1400) setHigh('85%');
    else setHigh('85%');
  }, [screenSize]);

  return (
    <ResponsiveContainer width='100%' height={high} >
      <BarChart
        width={500}
        height={200}
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
};

export default BarChartComponent;
