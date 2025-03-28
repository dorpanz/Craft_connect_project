import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const competitorData = [
  { name: "Your Price", price: 20 },
  { name: "Category Avg", price: 23 },
  { name: "Competitor A", price: 22 },
  { name: "Competitor B", price: 25 },
  { name: "Competitor C", price: 19 },
];

const categoryAvg = 23;
const yourPrice = 20;
const priceDifference = ((yourPrice - categoryAvg) / categoryAvg) * 100;
const priceInsight = priceDifference < 0 
  ? `Your price is ${Math.abs(priceDifference).toFixed(1)}% lower than the category average.`
  : `Your price is ${Math.abs(priceDifference).toFixed(1)}% higher than the category average. Consider adjusting.`;

const demandTrends = [
  { month: "Jan", demand: 50 },
  { month: "Feb", demand: 60 },
  { month: "Mar", demand: 55 },
  { month: "Apr", demand: 40 },
  { month: "May", demand: 35 },
];

export const MarketInsights = () => {
  const [latestTrend, setLatestTrend] = useState(demandTrends[demandTrends.length - 1].demand);
  const [prevTrend, setPrevTrend] = useState(demandTrends[demandTrends.length - 2].demand);

  const trendAdvice = latestTrend < prevTrend
    ? "Demand is decreasing. Consider lowering the price or running promotions."
    : "Demand is increasing. You may maintain or even slightly increase the price.";

  return (
    <div>
      <h3 className="reviews-title">Price Comparison</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart layout="vertical" data={competitorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#F8B85C" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      
      <p style={{ color: priceDifference < 0 ? "green" : "red" }}>
        <strong>Insight:</strong> {priceInsight}
      </p>

      <h3 className="reviews-title">Market Demand Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={demandTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="demand" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <p><strong>Market Trend Insight:</strong> {trendAdvice}</p>
    </div>
  );
};
