import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import Menu from "../menu/Menu";
import arrow from "../shop-view-seller/pics/arrow.png";
import { AllReviews } from "./AllReviews";
import { MarketInsights } from "./MarketInsights";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";
import "./ItemStat.css";

export const ItemStat = () => {
  const { itemId } = useParams();
  const [period, setPeriod] = useState("1 month");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0,
  });
  const [allReviews, setAllReviews] = useState([]);

  const handlePeriodChange = (e) => setPeriod(e.target.value);

  useEffect(() => {
    const unsubProduct = onSnapshot(doc(db, "products", itemId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setItemData((prev) => ({
          ...prev,
          ...data,
          image: data.photos?.[0] || "",
          totalOrders: data.salesCount || 0,
          favorites: prev?.favorites || 0, // placeholder, will be updated below
          restockLevel: 20,
        }));
      } else {
        console.warn("Item not found");
      }
      setLoading(false);
    });

    const reviewsQuery = query(
      collection(db, "reviews"),
      where("itemId", "==", itemId)
    );

    const unsubscribeReviews = onSnapshot(reviewsQuery, (querySnapshot) => {
      const reviews = [];
      let ratingSum = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reviews.push(data);
        ratingSum += data.rating;
      });

      setReviewStats({
        averageRating:
          reviews.length > 0 ? (ratingSum / reviews.length).toFixed(1) : 0,
        totalReviews: reviews.length,
      });

      setAllReviews(reviews);
    });

    return () => {
      unsubProduct();
      unsubscribeReviews();
    };
  }, [itemId]);

  // ✅ Fetch real-time favorites count based on actual user favorites
  useEffect(() => {
    const fetchFavoritesCount = async () => {
      try {
        const favSnap = await getDocs(collection(db, "favorites"));
        let count = 0;

        favSnap.forEach((doc) => {
          const data = doc.data();
          const items = data.items || [];

          const isFavorited = items.some((item) => item.id === itemId);
          if (isFavorited) count++;
        });

        setItemData((prev) => ({
          ...prev,
          favorites: count,
        }));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavoritesCount();
  }, [itemId]);
  useEffect(() => {
    const generateChartData = async () => {
      try {
        console.log('Item ID:', itemId);
        console.log('Selected Period:', period);
  
        // Fetch all orders (no filtering by itemId at Firestore level)
        const ordersQuery = query(collection(db, "orders"));
        const querySnapshot = await getDocs(ordersQuery);
  
        // Check if no orders exist
        if (querySnapshot.empty) {
          console.log("No orders found.");
          return;
        }
  
        // Map through orders and filter on client side
        const orders = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((order) =>
            order.items.some((item) => item.id === itemId) // Filter if any item in 'items' matches the 'itemId'
          );
  
        console.log('Fetched Orders:', orders);
  
        if (orders.length === 0) {
          console.log("No orders found for this itemId.");
          return;
        }
  
        const groupByPeriod = (orders, period) => {
          const grouped = {};
        
          // Step 1: Get the current date
          const now = new Date();
          let startDate;
        
          // Step 2: Calculate the start date based on the selected period
          switch (period) {
            case "1 month":
              startDate = new Date(now);
              startDate.setMonth(now.getMonth() - 1);
              break;
            case "3 months":
              startDate = new Date(now);
              startDate.setMonth(now.getMonth() - 2);
              startDate.setDate(1);
              break;
            case "6 months":
              startDate = new Date(now);
              startDate.setMonth(now.getMonth() - 5);
              startDate.setDate(1);
              break;
            case "1 year":
              startDate = new Date(now);
              startDate.setFullYear(now.getFullYear() - 1);
              startDate.setMonth(0);
              startDate.setDate(1);
              break;
            default:
              startDate = new Date(now);
              break;
          }
        
          // Step 3: Pre-fill all dates in the period with 0
          if (period === "1 month") {
            const temp = new Date(startDate);
            while (temp <= now) {
              const key = temp.toISOString().split("T")[0];
              grouped[key] = 0;
              temp.setDate(temp.getDate() + 1);
            }
          } else {
            const temp = new Date(startDate);
            while (temp <= now) {
              const month = temp.getMonth() + 1;
              const year = temp.getFullYear();
              const key = `${year}-${month < 10 ? "0" : ""}${month}`;
              grouped[key] = 0;
              temp.setMonth(temp.getMonth() + 1);
            }
          }
        
          // Step 4: Group actual orders on top of the initialized data
          orders.forEach((order) => {
            const orderDate = order.createdAt.toDate();
            let periodKey;
        
            if (period === "1 month") {
              const day = orderDate.toISOString().split("T")[0];
              periodKey = day;
            } else {
              const month = orderDate.getMonth() + 1;
              const year = orderDate.getFullYear();
              periodKey = `${year}-${month < 10 ? "0" : ""}${month}`;
            }
        
            if (grouped[periodKey] !== undefined) {
              grouped[periodKey]++;
            }
          });
        
          // Step 5: Convert to array for chart
          return Object.keys(grouped)
            .sort((a, b) => new Date(a) - new Date(b))
            .map((key) => ({
              name: key,
              orders: grouped[key],
            }));
        };
        
  
        // Generate chart data by grouping orders
        const chartData = groupByPeriod(orders, period);
        console.log('Generated Chart Data:', chartData); // Log the generated chart data
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    // Run generateChartData whenever itemId or period changes
    generateChartData();
  }, [itemId, period]);
  
  

  if (loading) return <p>Loading item statistics...</p>;
  if (!itemData) return <p>Item not found.</p>;

  const {
    title,
    image,
    totalOrders,
    quantity,
    restockLevel,
    favorites,
  } = itemData;

  return (
    <div className="item-stat-page">
      <Menu />
      <AnimatedSection>
        <div className="edit-section-title">
          <Link to="/your-shop" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Item Statistics</p>
        </div>
      </AnimatedSection>

      <div className="item-stat-section">
        {/* Product Summary */}
        <AnimatedSection>
          <div className="item-stat-section-info">
            <div className="item-stat-section-info-img">
              <p className="item-stat-section-info-dess-title-1">Image Preview</p>
              <img src={image} alt="Item" />
            </div>
            <div className="item-stat-section-info-desc">
              <div className="item-stat-section-info-desc-title">
                <p className="item-stat-section-info-dess-title-1">Item Name</p>
                <p className="item-stat-section-info-desc-title-item">{title}</p>
              </div>
              <div className="item-stat-section-info-desc-rating">
                <p>Average Rate: {reviewStats.averageRating}/5</p>
                <div className="stars-2">
                  {"★".repeat(Math.floor(reviewStats.averageRating))}
                  {reviewStats.averageRating % 1 >= 0.5 ? "½" : ""}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Stats */}
        <AnimatedSection>
          <div className="stats-graph">
            <div className="stats-graph-1">
              {[
                { label: "Total Orders", value: totalOrders },
                { label: "Total Reviews", value: reviewStats.totalReviews },
                { label: "Favorited", value: favorites },
              ].map((stat, index) => (
                <div key={index} className="stats-graph-1-item">
                  <div className="green-square"></div>
                  <div className="stats-graph-1-item-info">
                    <p className="stats-graph-1-item-info-title-i">{stat.label}:</p>
                    <p className="stats-graph-1-item-info-desc-i">{stat.value}</p>
                  </div>
                  {index < 2 && <div className="line-4"></div>}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
  <div className="chart-container" style={{ maxWidth: '100%', padding: '1rem' }}>
    <div
      className="time-period-selector"
      style={{
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      <label htmlFor="timePeriod" style={{ fontWeight: '500' }}>
        Total Items Purchased Over
      </label>
      <select
        id="timePeriod"
        value={period}
        onChange={handlePeriodChange}
        style={{
          padding: '0.4rem 0.6rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          fontSize: '0.9rem',
        }}
      >
        <option value="1 month">1 Month</option>
        <option value="3 months">3 Months</option>
        <option value="6 months">6 Months</option>
        <option value="1 year">1 Year</option>
      </select>
    </div>

    <div style={{ overflowX: 'auto' }}>
      <ResponsiveContainer width={chartData.length > 12 ? chartData.length * 40 : '100%'} height={400}>
        <BarChart data={chartData.sort((a, b) => new Date(a.name) - new Date(b.name))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              position: 'insideBottomRight',
              offset: -10,
            }}
            angle={-40}
            textAnchor="end"
            interval={0}
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#2A4C4C" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</AnimatedSection>




        {/* Inventory Section */}
        <AnimatedSection>
          <div className="inventory-section">
            <h3 className="reviews-title">Inventory & Supply Chain</h3>
            <div className="inventory-details">
              <p>
                <strong>Current Stock:</strong> {quantity} units available
              </p>
              {quantity < restockLevel / 2 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  It’s better to restock now, as stock levels are low!
                </p>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Reviews */}
        <AnimatedSection>
          <AllReviews itemId={itemId} />
        </AnimatedSection>

        {/* Market Insights */}
        <AnimatedSection>
          <MarketInsights itemId={itemId} />
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};
