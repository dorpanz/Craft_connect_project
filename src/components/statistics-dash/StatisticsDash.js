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
  const [reviewsData, setReviewsData] = useState({});

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
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (!sellerId) return;
  
    const fetchFollowers = async () => {
      try {
        const usersQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(usersQuery);
  
        let userFollowers = [];
        querySnapshot.forEach((docSnap) => {
          const user = docSnap.data();
          if (user.subscriptions && user.subscriptions.includes(sellerId)) {
            userFollowers.push(user);
          }
        });
  
        setFollowers(userFollowers);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
  
    fetchFollowers();
  }, [sellerId]);
  
  // ✅ Fetch sales data
  useEffect(() => {
    if (!sellerId) return;

    const fetchSalesData = async () => {
      console.log("Fetching sales data...");
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const now = new Date();
        const salesByItem = {};

        querySnapshot.forEach((docSnap) => {
          const order = docSnap.data();
          const orderDate = order.createdAt?.seconds
            ? new Date(order.createdAt.seconds * 1000)
            : null;

          if (!orderDate || !Array.isArray(order.items)) return;

          order.items.forEach((item) => {
            if (item.sellerId === sellerId) {
              const monthIndex = orderDate.getMonth(); // 0 for Jan, 1 for Feb, ..., 11 for Dec

              if (monthIndex >= 0 && monthIndex < 12) {
                const itemId = item.id;
                if (!salesByItem[itemId]) {
                  salesByItem[itemId] = Array(12).fill(0);
                }
                salesByItem[itemId][monthIndex] += item.amount || 0;
              }
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
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        items.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        console.log("Most popular items:", items);
        setMostPopularItems(items);
        fetchReviewsData(items);
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
        let totalPurchases = 0;
        productsSnapshot.forEach((doc) => {
          const product = doc.data();
          totalItemViews += product.views || 0;
          totalRevenue += (product.price || 0) * (product.salesCount || 0);
          totalPurchases += product.salesCount || 0;
        });

        setShopStats({
          shopViews: shopData.views || 0,
          itemViews: totalItemViews,
          orders: shopData.sales || 0,
          clicks: shopData.salesCount || 0,
          searchClicks: 0,
          revenue: totalRevenue,
          totalViews: totalItemViews, // Total views across all items
          totalPurchases: totalPurchases,
        });
      } catch (error) {
        console.error("Error fetching shop stats:", error);
      }
    };

    fetchShopStats();
  }, [sellerId]);

  const getMonthLabel = (index) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[index] || "";
  };

  const fetchReviewsData = async (items) => {
    const reviewsMap = {};

    for (const item of items) {
      const reviewsSnapshot = await getDocs(
        query(collection(db, "reviews"), where("itemId", "==", item.id))
      );

      let totalRating = 0;
      let reviewCount = 0;

      reviewsSnapshot.forEach((doc) => {
        const review = doc.data();
        totalRating += review.rating || 0;
        reviewCount += 1;
      });

      const avgRating =
        reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : "0.0";
      reviewsMap[item.id] = {
        avgRating,
        reviewCount,
      };
    }

    setReviewsData(reviewsMap);
  };
  const [categoryStats, setCategoryStats] = useState([]);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        // Query the "products" collection where "status" is "approved"
        const q = query(
          collection(db, "products"),
          where("status", "==", "approved"),
          where("sellerId", "==", sellerId)
        );
        const querySnapshot = await getDocs(q);

        let categoryData = {};

        // Loop through the products to aggregate sales count and revenue by category
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          const category = product.category;

          if (!category) return; // Skip products without a category

          // Initialize category if not exists
          if (!categoryData[category]) {
            categoryData[category] = { salesCount: 0, revenue: 0 };
          }

          // Ensure salesCount and price are treated as numbers
          const salesCount = Number(product.salesCount) || 0; // Default to 0 if undefined or NaN
          const price = Number(product.price) || 0; // Default to 0 if undefined or NaN

          // Aggregate sales count and revenue
          categoryData[category].salesCount += salesCount;
          categoryData[category].revenue += price * salesCount;
        });

        // Convert categoryData into an array
        const categories = Object.keys(categoryData).map((category) => ({
          name: category,
          salesCount: categoryData[category].salesCount,
          revenue: categoryData[category].revenue,
        }));

        // Optionally, sort by sales count or revenue
        categories.sort((a, b) => b.salesCount - a.salesCount);

        setCategoryStats(categories);
      } catch (error) {
        console.error("Error fetching category stats: ", error);
      }
    };

    fetchCategoryStats();
  }, [sellerId]);
  const generateChart = (itemId) => {
    const matchingData = salesData.find((data) => data.itemId === itemId);
    if (!matchingData) {
      return <p>No sales data for this item.</p>;
    }

    const chartData = matchingData.sales.map((value, index) => ({
      name: getMonthLabel(index),
      sales: value,
    }));
    console.log("Chart data for", itemId, chartData);

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
  const getTopSalesMonths = (itemId) => {
    const data = salesData.find((item) => item.itemId === itemId);
    if (!data) return "No data";

    const maxSales = Math.max(...data.sales);
    if (maxSales === 0) return "No sales";

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const topMonths = data.sales
      .map((sales, index) => ({ sales, month: monthNames[index] }))
      .filter((entry) => entry.sales === maxSales)
      .map((entry) => entry.month);

    return topMonths.join(" and ");
  };
  const generateStars = (rating) => {
    if (rating === null) return "No ratings yet"; // Handle case with no reviews

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
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
            <p>Stats overview</p>
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
                  CA${shopStats.revenue.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="line-2"></div>
            <div className="stats-graph-1-item">
              <div className="green-square"></div>
              <div className="stats-graph-1-item-info">
                <p className="stats-graph-1-item-info-title">Sold</p>
                <p className="stats-graph-1-item-info-desc">
                  {shopStats.orders}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
  <div className="shop-followers">
    <div className="stats-section-title">
      <p>Shop Followers</p>
      
    </div>
    <p>Total Followers: {followers.length}</p> {/* Display total followers */}
    {followers.length > 0 ? (
      <div className="followers-list">
        {followers.map((follower, index) => (
          <ul key={index} className="follower-item">
            <li>{follower.username} - {follower.email}</li> {/* Display username */}
          </ul>
        ))}
      </div>
    ) : (
      <p>No followers found.</p>
    )}
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
                    <Link
                      to={`/item-listing/${item.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <p>{item.title}</p>
                    </Link>

                    <p>${item.price.toFixed(2)}</p>
                    <div className="top-items-buttons-cont">
                      <Link
                        to={`/edit-product/${item.id}`}
                        className="edit-item-btn"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/item-statistics/${item.id}`}
                        className="stats-item-btn top-items-buttons"
                      >
                        Stats
                      </Link>
                    </div>
                  </div>
                  <div className="top-items-desc">
                    <p>
                      Total Sold: <strong>{item.salesCount || 0} units</strong>
                    </p>
                    <p>Item views: {item.views || 0}</p>
                    <p>
                      Customer Ratings:{" "}
                      {generateStars(reviewsData[item.id]?.avgRating)} (
                      {reviewsData[item.id]?.avgRating || "0.0"} based on{" "}
                      {reviewsData[item.id]?.reviewCount || 0} reviews)
                    </p>

                    <p>Most Purchased During: {getTopSalesMonths(item.id)}</p>

                    {generateChart(item.id)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="shop-stats">
            <div className="stats-section-title">
              <p>Shop Conversion Stats</p>
            </div>

            <div className="conv-rate-cont">
              <div className="stats-graph-4">
                <div className="stats-graph-2-item">
                  <div className="green-square-2"></div>
                  <div className="stats-graph-2-item-info">
                    <p className="stats-graph-2-item-info-title">
                      Overall Conversion Rate
                    </p>
                    <div className="stats-graph-2-item-info-desc-cont">
                      <p className="stats-graph-2-item-info-desc">
                        {shopStats.totalViews > 0
                          ? (
                              (shopStats.totalPurchases /
                                shopStats.totalViews) *
                              100
                            ).toFixed(2) + "%"
                          : "0%"}
                      </p>
                      <p className="stats-graph-2-item-info-desc-expl">
                        {shopStats.totalPurchases} purchases out of{" "}
                        {shopStats.totalViews} views
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="conv-rate-cont-explain">
                <p>What is Conversion Rate?</p>
                <p>
                  The conversion rate in this context measures how many people
                  who viewed a product actually made a purchase.{" "}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="category-stats">
            <div className="stats-section-title">
              <p>Top Categories </p>
            </div>
            <p>
              The Top Categories statistics are related to the most successful
              categories in your shop. It shows a list of categories along with
              the following information for each:
            </p>
            <ul>
              <li>Category Name: The name of the category</li>
              <li>
                Sales Count: The total number of items sold within that category
              </li>
              <li>
                Revenue: The total revenue generated from the items in that
                categoryy
              </li>
            </ul>

            {categoryStats.length > 0 ? (
              <div className="category-cards-container">
                {categoryStats.map((category, index) => (
                  <div key={index} className="category-card">
                    <h4 className="category-name">{category.name}</h4>
                    <p className="category-sales">
                      Sales Count: {category.salesCount}
                    </p>
                    <p className="category-revenue">
                      Revenue: ${category.revenue.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-categories">No categories available.</p>
            )}
          </div>
        </AnimatedSection>

        <Footer />
      </div>
    </div>
  );
};
