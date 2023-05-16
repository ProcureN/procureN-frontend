import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#5c67f5', '#cb67ac'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${index === 0 ? 'R ~ ' : 'M ~ '}`}
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieCh({ value1, value2 }) {
  const data = [
    { name: 'Retailer', value: value1 },
    { name: 'Manufacturer', value: value2 },
  ];

  const [screenSize, setScreenSize] = useState(undefined);

  const [radi, setRadi] = useState(0);
  const [cxy, setCxy] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 400) {
      setRadi(50);
      setCxy(50);
    } else if (screenSize <= 900) {
      setRadi(75);
      setCxy(100);
    } else if (screenSize <= 1300) {
      setRadi(100);
      setCxy(150);
    } else {
      setRadi(120);
      setCxy(150);
    }
  }, [screenSize]);

  return (
    <>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={cxy}
          cy={cxy}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={radi}
          fill='#8884d8'
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className=' ml-8 flex flex-wrap  gap-16'>
        <div className='flex items-center justify-center'>
          <div className='mx-1 h-2 w-2 rounded-full bg-[#5c67f5]'></div>{' '}
          <span className='text-[#5c67f5]'>Manufacturer</span>
        </div>
        <div className='flex items-center justify-center'>
          <div className='mx-1 h-2 w-2 rounded-full bg-[#cb67ac]'></div>{' '}
          <span className='text-[#cb67ac]'>Retailer</span>
        </div>
      </div>
    </>
  );
}
