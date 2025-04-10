import { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'; 
import "./adminAccount.css"
export const SalesLineChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const salesByMonth = {};

      ordersSnapshot.forEach(doc => {
        const order = doc.data();
        const createdAt = order.createdAt?.toDate(); // Ensure `createdAt` is a Firestore timestamp

        if (createdAt && order.totalAmount) {
          const month = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}`; 
          
          salesByMonth[month] = salesByMonth[month] || 0;
          salesByMonth[month] += order.totalAmount;
        }
      });

      const formattedData = Object.entries(salesByMonth).map(([month, totalAmount]) => ({
        name: month,
        totalSales: totalAmount,
      }));

      // Sort by month (optional: depends on how your data is stored)
      formattedData.sort((a, b) => new Date(a.name) - new Date(b.name));

      setSalesData(formattedData);
    };

    fetchSalesData();
  }, []);

  return (
    <div className="sales-line-chart-container">
      <div className="sales-line-chart-card">
        <h2 className="sales-title">Sales Over Time</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="$" />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
