import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { OrderStatusChart } from './OrderStatus';
import { SalesLineChart } from './SalesLineChart';
import arrow from "../shop-view-seller/pics/arrow.png";
import "./adminAccount.css"
import { Link } from 'react-router-dom';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const CraftStat = () => {
  const [chartData, setChartData] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [allTimeTotal, setAllTimeTotal] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const revenueByYearMonth = {};
      let totalAllTime = 0;
      const yearSet = new Set();

      ordersSnapshot.forEach(doc => {
        const data = doc.data();
        const timestamp = data.createdAt;

        if (timestamp && data.totalAmount) {
          const date = new Date(timestamp.seconds * 1000);
          const year = date.getFullYear();
          const month = date.getMonth(); // 0-based index (0 = Jan)

          yearSet.add(year);
          const key = `${year}-${month}`;

          if (!revenueByYearMonth[key]) {
            revenueByYearMonth[key] = 0;
          }
          revenueByYearMonth[key] += data.totalAmount;
          totalAllTime += data.totalAmount;
        }
      });

      const years = Array.from(yearSet).sort();
      setAllYears(years);
      setAllTimeTotal(totalAllTime);

      // Create full dataset for chart (every month for each year)
      const formattedData = MONTHS.map((month, monthIndex) => {
        const entry = { month };

        years.forEach(year => {
          const key = `${year}-${monthIndex}`;
          entry[year] = revenueByYearMonth[key] || 0;
        });

        return entry;
      });

      setChartData(formattedData);
    };

    fetchRevenue();
  }, []);

  return (
    <div className="craft-stat-container">
        
      <div className="craft-stat-card">
      <div className="admin-user-manage-container-top">
          <Link to="/admin/admin-account" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
        
          </Link>
          <h2 className="admin-user-manage-title">Monthly Revenue by Year</h2>
      </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis unit="$" />
            <Tooltip formatter={value => `$${value.toFixed(2)}`} />
            <Legend />
            {allYears.map(year => (
              <Bar
                key={year}
                dataKey={year}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                radius={[10, 10, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div className="total-revenue">
          All Time Revenue: <span className="total-revenue-amount">${allTimeTotal.toFixed(2)}</span>
        </div>
        <div className="charts-container">
          <OrderStatusChart />
          <SalesLineChart />
        </div>
      </div>
    </div>
  );
};
