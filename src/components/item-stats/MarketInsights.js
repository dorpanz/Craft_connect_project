import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const MarketInsights = ({ itemId }) => {
  const [competitorData, setCompetitorData] = useState([]);
  const [categoryAvg, setCategoryAvg] = useState(0);
  const [yourPrice, setYourPrice] = useState(0);
  const [demandTrends, setDemandTrends] = useState([]);

  useEffect(() => {
    const fetchMarketInsights = async () => {
      try {
        console.log("Fetching insights for itemId:", itemId);
    
        const itemsSnapshot = await getDocs(collection(db, "products"));
        const itemDocs = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
        const currentItem = itemDocs.find(doc => doc.id === itemId);
        if (!currentItem) {
          console.warn("Item not found for itemId:", itemId);
          return;
        }
    
        console.log("Current item data:", currentItem);
        const { price, status, category, subCategory, subSubCategory, sellerId } = currentItem;
        if (status !== "approved") {
          console.warn("Current item is not approved. Skipping insight generation.");
          return;
        }
    
        setYourPrice(price);
    
        // Determine matching key for comparison
        const categoryKey = subSubCategory || subCategory || category;
    
        // Filter competitors in the same category, and ensure they're from different shops
        const approvedCompetitors = itemDocs.filter(
          i =>
            i.id !== itemId &&
            i.status === "approved" &&
            (i.subSubCategory === categoryKey ||
              i.subCategory === categoryKey ||
              i.category === categoryKey) &&
            i.sellerId !== sellerId // Ensures different sellerId
        );
    
        console.log("Competitors in same category from different shops:", approvedCompetitors);
    
        const prices = [price, ...approvedCompetitors.map(i => i.price)];
        const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
        setCategoryAvg(avg);
    
        const barData = [
          { name: "Your Price", price },
          { name: "Category Avg", price: avg },
          ...approvedCompetitors.slice(0, 3).map((c, idx) => ({
            name: `Competitor ${String.fromCharCode(65 + idx)}`,
            price: c.price
          }))
        ];
        setCompetitorData(barData);
    
        // Demand Trend Calculation (same logic)
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const itemOrders = ordersSnapshot.docs
          .map(doc => doc.data())
          .filter(order =>
            order.items?.some(i => i.id === itemId)
          );
    
        console.log("Orders containing current item:", itemOrders);
    
        const monthlyDemand = {};
        itemOrders.forEach(order => {
          const date = order.createdAt?.toDate?.();
          if (date) {
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!monthlyDemand[monthKey]) monthlyDemand[monthKey] = 0;
            monthlyDemand[monthKey]++;
          }
        });
    
        const trendData = Object.keys(monthlyDemand)
          .sort()
          .map(month => ({ month, demand: monthlyDemand[month] }));
    
        console.log("Calculated monthly demand trend data:", trendData);
        setDemandTrends(trendData);
    
      } catch (err) {
        console.error("Error fetching market insights:", err);
      }
    };
    
    

    if (itemId) fetchMarketInsights();
  }, [itemId]);

  const priceDifference = categoryAvg && categoryAvg !== 0
  ? ((yourPrice - categoryAvg) / categoryAvg) * 100
  : 0;

let priceInsight = "Unable to calculate price insight.";
if (priceDifference !== 0) {
  priceInsight = priceDifference < 0
    ? `Your price is ${Math.abs(priceDifference).toFixed(1)}% lower than the category average.`
    : `Your price is ${Math.abs(priceDifference).toFixed(1)}% higher than the category average. Consider adjusting.`;
}

  const latest = demandTrends[demandTrends.length - 1]?.demand || 0;
  const previous = demandTrends[demandTrends.length - 2]?.demand || 0;
  const trendAdvice = latest < previous
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
