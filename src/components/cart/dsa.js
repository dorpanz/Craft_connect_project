import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Assuming db is your Firestore instance
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth"; // To get the logged-in user (if needed)
import './StatisticsDash.css'

export const StatisticsDash = () => {
  const [salesData, setSalesData] = useState([]);
  const [mostPopularItems, setMostPopularItems] = useState([]);
  const [shopStats, setShopStats] = useState({
    shopViews: 0,
    itemViews: 0,
    orders: 0,
    clicks: 0,
    searchClicks: 0,
  });

  const auth = getAuth();
  const sellerId = auth.currentUser?.uid; // Assuming sellerId is the same as user ID
  console.log(sellerId)

  useEffect(() => {
    if (!sellerId) {
      console.log("User is not logged in");
      return; // Don't fetch data if user is not logged in
    }
    
    // Fetch sales data for the last year
    const fetchSalesData = async () => {
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1); // Set to 1 year ago

      const salesQuery = query(
        collection(db, "orders"),
        where("sellerId", "==", sellerId),
        where("createdAt", ">=", startDate) // Filter orders from the last year
      );

      const querySnapshot = await getDocs(salesQuery);
      const data = [];
      querySnapshot.forEach((doc) => {
        const orderData = doc.data();
        data.push(orderData);
      });

      // Format sales data by month for each item
      const salesByItem = mostPopularItems.reduce((acc, item) => {
        acc[item.id] = Array(12).fill(0); // Initialize with 0 sales for each month (12 months)
        return acc;
      }, {});

      data.forEach((order) => {
        order.items.forEach((item) => {
          const itemId = item.id;
          const orderDate = new Date(order.createdAt * 1000); // Convert Firestore timestamp to Date
          const monthIndex = (orderDate.getMonth() + 1) % 12; // Get month index (0-11)
          if (salesByItem[itemId]) {
            salesByItem[itemId][monthIndex] += item.quantity; // Add quantity sold to the corresponding month
          }
        });
      });

      // Convert salesByItem object to array format suitable for BarChart
      const formattedSalesData = Object.entries(salesByItem).map(([itemId, sales]) => {
        const item = mostPopularItems.find((item) => item.id === itemId);
        return {
          name: item?.title || "Unknown Item", // Use item title for the chart
          sales: sales,
        };
      });

      setSalesData(formattedSalesData);
    };

    fetchSalesData();
  }, [sellerId, mostPopularItems]);

  useEffect(() => {
    if (!sellerId) return; // If sellerId is not available, return early

    const fetchMostPopularItems = async () => {
      const productsQuery = query(
        collection(db, "products"),
        where("sellerId", "==", sellerId),
        where("status", "==", "approved"),
      );
      const productsSnapshot = await getDocs(productsQuery);
      const items = [];
      productsSnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      
      items.sort((a, b) => b.salesCount - a.salesCount); // Sort by sales count
      setMostPopularItems(items);
    };

    fetchMostPopularItems();
  }, [sellerId]);

  return (
    <div>
      <Menu />
      <div className="statistics-dash">
        <AnimatedSection>
          <div className="edit-section-title">
            <Link to="/your-shop-dashboard" className="go-back">
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <p className="edit-featured-title">Statistics Dashboard</p>
          </div>
          <div className="stats-section-title">
            <p>Stats overview for {shopStats.shopName} for 1 year</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div>
            <div className="stats-section-title">
              <p>Most Popular Items</p>
            </div>
            <div>
              {mostPopularItems.map((item) => (
                <div className="top-items" key={item.id}>
                  <div className="top-items-title">
                    <img src={item.photos[0]} className="top-items-img" alt={item.title} />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>

                  <div className="top-items-desc">
                    <p>Total Sold: {item.salesCount} units</p>
                    <p>Item views: {item.views}</p>
                    <p>Customer Ratings: ★★★★☆ (4.5 based on 9 reviews)</p>

                    {/* Bar Chart for Item Sales over the Past Year */}
                    <ResponsiveContainer width="90%" height={200}>
                      <BarChart data={salesData.filter((data) => data.name === item.title)}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#2A4C4C" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
};
