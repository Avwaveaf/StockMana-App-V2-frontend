import {  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';



export default function MyChart({chartData }) {
  return (
    <div style={{ width: '400px', height: '300px' }}>
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
      <Bar dataKey="sold" fill="#378805" />

    </BarChart>
  </ResponsiveContainer>
    </div>
  );
}
