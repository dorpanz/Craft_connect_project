import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Menu from "../menu/Menu";
import "./StatisticsDash.css";
import pic from "./pics/giftsrec.jpg";
import Footer from "../footer/Foooter"
import { AnimatedSection } from "../animation/AnimatedSection";
import arrow from "../shop-view-seller/pics/arrow.png"
import { Link } from "react-router-dom";

const data = [
  { name: "Jan", sales: 3 },
  { name: "Feb", sales: 5 },
  { name: "Mar", sales: 2 },
  { name: "Apr", sales: 7 },
  { name: "May", sales: 4 },
  { name: "Jun", sales: 6 },
  { name: "Jul", sales: 3 },
  { name: "Aug", sales: 8 },
  { name: "Sep", sales: 6 },
  { name: "Oct", sales: 7 },
  { name: "Nov", sales: 12 }, // Peak during Black Friday
  { name: "Dec", sales: 15 }, // Peak during Christmas
];

export const StatisticsDash = () => {
  return (
    <div>
      <Menu />

      <div className="statistics-dash">
        <AnimatedSection>
        <div className="edit-section-title">
        <Link to="/your-shop-dashboard" className="go-back"><img src={arrow} alt="arrow" className="arrow"/></Link>
      <p className="edit-featured-title">Statistics Dashboard</p>
        </div>


        <div className="stats-section-title">
        <p>Stats overview for John Doe Shop for 3 weeks</p>
          </div>
        </AnimatedSection>
        

        <AnimatedSection>

        <div className="stats-graph-1">
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Item Views</p>
              <p className="stats-graph-1-item-info-desc">1876</p>
            </div>
          </div>

          <div className="line-2"></div>

          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Shop Views</p>
              <p className="stats-graph-1-item-info-desc">786</p>
            </div>
          </div>
          <div className="line-2"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Search Clicks</p>
              <p className="stats-graph-1-item-info-desc">71</p>
            </div>
          </div>
          <div className="line-2"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Orders</p>
              <p className="stats-graph-1-item-info-desc">34</p>
            </div>
          </div>
        </div>
        </AnimatedSection>

        <AnimatedSection>

        <div>
          <div className="stats-section-title">
            <p >Most Popular Items</p>
          </div>

          <div>
            <div className="top-items">
              <div className="top-items-title">
                <img src={pic} className="top-items-img" />
                <p>Macrame Angel, Christmas...</p>
                <p>$10.39</p>
              </div>

              <div className="top-items-desc">
                <p>Total Sold: 11 units</p>
                <p>Item views: 546</p>
                <p>Customer Ratings: ★★★★☆ (4.5 based on 9 reviews)</p>
                <p>
                  Most Purchased During: November and December, with peak sales
                  during Black Friday and pre-Christmas weeks
                </p>

                {/* Bar Chart */}
                <ResponsiveContainer width="90%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#2A4C4C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="top-items">
              <div className="top-items-title">
                <img src={pic} className="top-items-img" />
                <p>Macrame Angel, Christmas...</p>
                <p>$10.39</p>
              </div>

              <div className="top-items-desc">
                <p>Total Sold: 11 units</p>
                <p>Item views: 546</p>
                <p>Customer Ratings: ★★★★☆ (4.5 based on 9 reviews)</p>
                <p>
                  Most Purchased During: November and December, with peak sales
                  during Black Friday and pre-Christmas weeks
                </p>

                {/* Bar Chart */}
                <ResponsiveContainer width="90%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#2A4C4C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        </AnimatedSection>


        <AnimatedSection>

        <div className="shop-stats">
        <div className="stats-section-title">
            <p >Shops Views</p>
          </div>

            <div className="stats-graph-2">
          <div className="stats-graph-2-item">
            <div className="green-square-2"></div>
            <div className="stats-graph-2-item-info">
              <p className="stats-graph-2-item-info-title">Click Through Rates</p>
              <div className="stats-graph-2-item-info-desc-cont">
              <p className="stats-graph-2-item-info-desc">22%</p>
              <p className="stats-graph-2-item-info-desc-expl">173 out of 786 visitors clicked on items</p>
              </div>
            </div>
          </div>

          <div className="line-2"></div>

          <div className="stats-graph-2-item">
            <div className="green-square-2"></div>
            <div className="stats-graph-2-item-info">
              <p className="stats-graph-2-item-info-title">Followers</p>
              <p className="stats-graph-2-item-info-desc">45 people</p>
            </div>
          </div>
          <div className="line-2"></div>
          <div className="stats-graph-2-item">
            <div className="green-square-2"></div>
            <div className="stats-graph-2-item-info">
              <p className="stats-graph-2-item-info-title">Conversion Rate</p>
              <div className="stats-graph-2-item-info-desc-cont">
                <p className="stats-graph-2-item-info-desc">4.3%</p>
                <p className="stats-graph-2-item-info-desc-expl">34 purchases out of 786 visitors</p>
              </div>

            </div>
            
          </div>
        </div>
      </div>
        </AnimatedSection>

<AnimatedSection>

      <div className="stats-section-multi">
      <div className="line-3"></div>
        <div className="search-clicks-section">
            <p className="search-clicks-section-title">Search Clicks</p>
            <p>Top Search Terms</p>
            <p>Most Used Keywords</p>
            <ol>
                <li>Handmade knitted scarves – 30% of clicks</li>
                <li>Cozy winter accessories – 25% of clicks</li>
                <li>Sustainable wool products – 20% of clicks</li>
                <li>Knitted home décor gifts – 15% of clicks</li>
                <li>Custom knitted hats – 10% of clicks</li>
            </ol>
        </div>

        <div className="line-3"></div>
        <div className="search-clicks-section">
            <p className="search-clicks-section-title">Orders</p>
            <p>Total Orders: 34 orders this month.</p>
            <p>Order Frequency: On average, 1-2 orders per day</p>
        </div>
      </div>
</AnimatedSection>
    </div>

    <AnimatedSection>

    <Footer/>
    </AnimatedSection>
    </div>
  );
};
