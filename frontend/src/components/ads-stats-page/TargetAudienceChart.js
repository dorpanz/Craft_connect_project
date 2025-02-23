import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TargetAudienceChart = () => {
  const data = [
    { name: 'Eco-Shoppers', value: 40 },
    { name: 'Holiday Shoppers', value: 25 },
    { name: 'Bargain Shoppers', value: 20 },
    { name: 'Gift Shoppers', value: 15 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#ff0000']; // Colors for the pie slices

  return (
    <ResponsiveContainer width="100%" height={290}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          fill="#8884d8"
          labelLine={false} // Disable label lines for a cleaner look
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Tooltip that will display on hover */}
        <Tooltip
          formatter={(value, name) => [`${name}: ${value}%`, '']} // Customize tooltip content
          labelStyle={{ fontWeight: 'bold', fontSize: '14px' }}
          itemStyle={{ fontSize: '14px' }}
        />
        {/* Legend to display color mapping for the pie chart */}
        <Legend
          iconSize={12}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ paddingLeft: '20px' }} // Optional: Adds space to the left of the legend
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TargetAudienceChart;
