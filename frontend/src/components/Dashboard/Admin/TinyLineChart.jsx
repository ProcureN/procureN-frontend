
import React from 'react';
import {Brush, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Day1',
    uv: 4000,
    pv: 5400,
    amt: 2000,
  },
  {
    name: 'Day2',
    uv: 3000,
    pv: 3398,
    amt: 2210,
  },
  {
    name: 'Day3',
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: 'Day4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Day5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Day6',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Day7',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Day8',
    uv: 7550,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Day9',
    uv: 5000,
    pv: 3398,
    amt: 2210,
  },
  {
    name: 'Day10',
    uv: 2000,
    pv: 2800,
    amt: 2290,
  },
  {
    name: 'Day11',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Day12',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Day13',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Day14',
    uv: 3490,
    pv: 7300,
    amt: 2100,
  },
];

const TinyLineChart = () => {
  return (
    <>
    <div>Aparna Enterprises Limited</div>
    <ResponsiveContainer width="100%" height="100%">
    
      <LineChart width={300} height={100} data={data}>
      <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
};

export default TinyLineChart;


