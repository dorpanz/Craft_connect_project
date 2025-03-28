import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import Menu from "../menu/Menu";
import arrow from "../shop-view-seller/pics/arrow.png";
import candle from "../shop-view-buyer/pics/candleitem.jpg";
import { AllReviews } from "./AllReviews";
import { MarketInsights } from "./MarketInsights";
import "./ItemStat.css";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";

const salesData = {
  "1 month": [
    { name: "Week 1", orders: 30 },
    { name: "Week 2", orders: 45 },
    { name: "Week 3", orders: 50 },
    { name: "Week 4", orders: 35 },
  ],
  "3 months": [
    { name: "Dec", orders: 130 },
    { name: "Jan", orders: 120 },
    { name: "Feb", orders: 150 },
  ],
  "6 months": [
    { name: "Sep", orders: 200 },
    { name: "Oct", orders: 200 },
    { name: "Nov", orders: 180 },
    { name: "Dec", orders: 220 },
    { name: "Jan", orders: 210 },
    { name: "Feb", orders: 240 },
  ],
  "1 year": [
    { name: "Jan", orders: 500 },
    { name: "Feb", orders: 550 },
    { name: "March", orders: 600 },
    { name: "April", orders: 350 },
    { name: "May", orders: 700 },
    { name: "June", orders: 124 },
    { name: "July", orders: 266 },
    { name: "Aug", orders: 555 },
    { name: "Sept", orders: 33 },
    { name: "Oct", orders: 543 },
    { name: "Nov", orders: 700 },
    { name: "Dec", orders: 700 },
  ],
};

const inventoryData = [
  {
    name: "Inventory",
    currentStock: 5, // Available stock
    soldStock: 210, // Sold items
    restockLevel: 50, // Expected restock
  },
];

export const ItemStat = () => {
  const [period, setPeriod] = useState("1 month");
  const handlePeriodChange = (e) => setPeriod(e.target.value);
  useEffect(() => {
    window.scrollTo(0, 0);
    }, []);
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
        <AnimatedSection>
          <div className="item-stat-section-info">
            <div className="item-stat-section-info-img">
              <p className="item-stat-section-info-dess-title-1">
                Image Preview
              </p>
              <img src={candle} alt="Item" />
            </div>
            <div className="item-stat-section-info-desc">
              <div className="item-stat-section-info-desc-title">
                <p className="item-stat-section-info-dess-title-1">Item Name</p>
                <p className="item-stat-section-info-desc-title-item">
                    Macrame Victorian Christmas Decoration - Eco Plastic Free Xmas
                    Ornament
                </p>
              </div>
              <div className="item-stat-section-info-desc-rating">
                <p>Average Rate: 4.6/5 </p>
                <div className="stars-2">★★★★☆</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {/* Statistics Overview */}
          <div className="stats-graph">
            <div className="stats-graph-1">
              <div className="stats-graph-1-item">
                <div className="green-square"></div>
                <div className="stats-graph-1-item-info">
                  <p className="stats-graph-1-item-info-title">Total Orders:</p>
                  <p className="stats-graph-1-item-info-desc">245</p>
                </div>
              </div>

              <div className="line-4"></div>
              <div className="stats-graph-1-item">
                <div className="green-square"></div>
                <div className="stats-graph-1-item-info">
                  <p className="stats-graph-1-item-info-title">
                    Total Reviews:
                  </p>
                  <p className="stats-graph-1-item-info-desc">75</p>
                </div>
              </div>

              <div className="line-4"></div>
              <div className="stats-graph-1-item">
                <div className="green-square"></div>
                <div className="stats-graph-1-item-info">
                  <p className="stats-graph-1-item-info-title">Favorited:</p>
                  <p className="stats-graph-1-item-info-desc">349</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          {/* Sales Data Chart */}
          <div className="chart-container">
            <div className="time-period-selector">
              <label htmlFor="timePeriod">Total Items Purchased Over </label>
              <select
                id="timePeriod"
                value={period}
                onChange={handlePeriodChange}
              >
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="1 year">1 Year</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData[period]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#2A4C4C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {/* Inventory Supply Chain Chart */}
          <div className="inventory-section">
            <h3 className="reviews-title">Inventory & Supply Chain</h3>
            <div className="inventory-details">
              <p>
                <strong>Current Stock:</strong> 5 units available for sale
              </p>
              <p>
                <strong>Restock Level:</strong> 50 units (Expected restock in 2
                weeks)
              </p>
              {inventoryData[0].currentStock <
                inventoryData[0].restockLevel / 2 && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  It’s better to restock now, as stock levels are low!
                </p>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {/* Reviews & Market Insights */}
          <AllReviews />
        </AnimatedSection>
        <AnimatedSection>
          <MarketInsights />
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};
