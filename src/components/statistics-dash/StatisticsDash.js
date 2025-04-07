import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./StatisticsDash.css";

export const StatisticsDash = () => {
  const [salesData, setSalesData] = useState([]);
  const [mostPopularItems, setMostPopularItems] = useState([]);
  const [shopStats, setShopStats] = useState({
    shopViews: 0,
    itemViews: 0,
    orders: 0,
    clicks: 0,
    searchClicks: 0,
    revenue: 0,
  });
  const [sellerId, setSellerId] = useState(null);

  // ✅ Track logged-in seller ID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSellerId(user.uid);
        console.log("Seller logged in:", user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch sales data
  useEffect(() => {
    if (!sellerId) return;

    const fetchSalesData = async () => {
      console.log("Fetching sales data...");
      try {
        const salesQuery = query(
          collection(db, "orders"),
          where("sellerId", "==", sellerId)
        );
        const querySnapshot = await getDocs(salesQuery);

        const now = new Date();
        const salesByItem = {};

        querySnapshot.forEach((docSnap) => {
          const order = docSnap.data();
          const orderDate = order.createdAt?.seconds
            ? new Date(order.createdAt.seconds * 1000)
            : null;

          if (!orderDate || !Array.isArray(order.items)) return;

          order.items.forEach((item) => {
            const itemId = item.id;
            const monthIndex =
              (now.getFullYear() - orderDate.getFullYear()) * 12 +
              now.getMonth() -
              orderDate.getMonth();
          
            if (monthIndex >= 0 && monthIndex < 12) {
              if (!salesByItem[itemId]) {
                salesByItem[itemId] = Array(12).fill(0);
              }
              salesByItem[itemId][monthIndex] += item.amount || 0;
            }
          });
          
        });

        const formattedSalesData = Object.keys(salesByItem).map((itemId) => ({
          itemId,
          sales: salesByItem[itemId],
        }));
        console.log("Sales by item:", salesByItem);
      
        console.log("Formatted sales data:", formattedSalesData);
        setSalesData(formattedSalesData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, [sellerId]);

  // ✅ Fetch most popular products
  useEffect(() => {
    if (!sellerId) return;

    const fetchMostPopularItems = async () => {
      try {
        const productsQuery = query(
          collection(db, "products"),
          where("sellerId", "==", sellerId),
          where("status", "==", "approved")
        );
        const snapshot = await getDocs(productsQuery);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        items.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        console.log("Most popular items:", items);
        setMostPopularItems(items);
      } catch (error) {
        console.error("Error fetching popular items:", error);
      }
    };

    fetchMostPopularItems();
  }, [sellerId]);

  // ✅ Fetch shop statistics
  useEffect(() => {
    if (!sellerId) return;

    const fetchShopStats = async () => {
      try {
        const shopRef = doc(db, "sellers", sellerId);
        const shopSnapshot = await getDoc(shopRef);

        if (!shopSnapshot.exists()) return;

        const shopData = shopSnapshot.data();

        const productsQuery = query(
          collection(db, "products"),
          where("sellerId", "==", sellerId)
        );
        const productsSnapshot = await getDocs(productsQuery);

        let totalItemViews = 0;
        let totalRevenue = 0;

        productsSnapshot.forEach((doc) => {
          const product = doc.data();
          totalItemViews += product.views || 0;
          totalRevenue += (product.price || 0) * (product.salesCount || 0);
        });

        setShopStats({
          shopViews: shopData.views || 0,
          itemViews: totalItemViews,
          orders: shopData.sales || 0,
          clicks: shopData.salesCount || 0,
          searchClicks: 0,
          revenue: totalRevenue,
        });
      } catch (error) {
        console.error("Error fetching shop stats:", error);
      }
    };

    fetchShopStats();
  }, [sellerId]);

  const getMonthLabel = (index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - index));
    return date.toLocaleString("default", { month: "short" });
  };

  const generateChart = (itemId) => {
    const matchingData = salesData.find((data) => data.itemId === itemId);
    if (!matchingData) {
      return <p>No sales data for this item.</p>;
    }

    const chartData = matchingData.sales.map((value, index) => ({
      name: getMonthLabel(index),
      sales: value,
    }));

    return (
      <ResponsiveContainer width="90%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#2A4C4C" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

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
            <p>Stats overview for the past year</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="stats-graph-1">
            <div className="stats-graph-1-item">
              <div className="green-square"></div>
              <div className="stats-graph-1-item-info">
                <p className="stats-graph-1-item-info-title">Item Views</p>
                <p className="stats-graph-1-item-info-desc">
                  {shopStats.itemViews}
                </p>
              </div>
            </div>
            <div className="line-2"></div>
            <div className="stats-graph-1-item">
              <div className="green-square"></div>
              <div className="stats-graph-1-item-info">
                <p className="stats-graph-1-item-info-title">Shop Views</p>
                <p className="stats-graph-1-item-info-desc">
                  {shopStats.shopViews}
                </p>
              </div>
            </div>
            <div className="line-2"></div>
            <div className="stats-graph-1-item">
              <div className="green-square"></div>
              <div className="stats-graph-1-item-info">
                <p className="stats-graph-1-item-info-title">Total Revenue</p>
                <p className="stats-graph-1-item-info-desc">
                  CA${shopStats.revenue}
                </p>
              </div>
            </div>
            <div className="line-2"></div>
            <div className="stats-graph-1-item">
              <div className="green-square"></div>
              <div className="stats-graph-1-item-info">
                <p className="stats-graph-1-item-info-title">Orders</p>
                <p className="stats-graph-1-item-info-desc">
                  {shopStats.orders}
                </p>
              </div>
            </div>
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
                    <img
                      src={item.photos?.[0]}
                      className="top-items-img"
                      alt={item.title}
                    />
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                  <div className="top-items-desc">
                    <p>Total Sold: {item.salesCount || 0} units</p>
                    <p>Item views: {item.views || 0}</p>
                    <p>Customer Ratings: ★★★★☆ (4.5 based on 9 reviews)</p>
                    <p>
                      Most Purchased During: November and December, with peak
                      sales during Black Friday and pre-Christmas weeks
                    </p>
                    {generateChart(item.id)}
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
