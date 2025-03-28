import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Menu from '../menu/Menu';
import './AdsStats.css';
import TargetAudienceChart from './TargetAudienceChart';
import Footer from '../footer/Foooter';
import { AnimatedSection } from '../animation/AnimatedSection';
import arrow from "../shop-view-seller/pics/arrow.png"
import { Link } from 'react-router-dom';
export const AdStats = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const adData = [
    { name: 'Google Ads', Spent: 200, Clicks: 300, Conversion: 15 },
    { name: 'Social Media Ads', Spent: 200, Clicks: 250, Conversion: 10 },
    { name: 'Email Marketing', Spent: 100, Clicks: 150, Conversion: 12 },
  ];

  return (
    <div>
      <Menu />

      <div className="statistics-dash">
      <AnimatedSection>

        <div className="edit-section-title">
        <Link to="/your-shop-dashboard" className="go-back"><img src={arrow} alt="arrow" className="arrow"/></Link>
            <p className="edit-featured-title">Marketing and Advertising Analysis</p>
        </div>

        <div className="stats-section-title">
          <p>Advertising Tools</p>
        </div>

        <p className="ad-analysisi-title">Google Ads</p>
        <div className="stats-graph-1">
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Spent</p>
              <p className="stats-graph-1-item-info-desc">$200</p>
            </div>
          </div>

          <div className="line-4"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Clicks</p>
              <p className="stats-graph-1-item-info-desc">300</p>
            </div>
          </div>
          <div className="line-4"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Conversion</p>
              <p className="stats-graph-1-item-info-desc">15</p>
            </div>
          </div>
        </div>

        <p className="ad-analysisi-title">Social Media Ads</p>
        <div className="stats-graph-1">
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Spent</p>
              <p className="stats-graph-1-item-info-desc">$200</p>
            </div>
          </div>

          <div className="line-4"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Clicks</p>
              <p className="stats-graph-1-item-info-desc">250</p>
            </div>
          </div>
          <div className="line-4"></div>
          <div className="stats-graph-1-item">
            <div className="green-square"></div>
            <div className="stats-graph-1-item-info">
              <p className="stats-graph-1-item-info-title">Conversion</p>
              <p className="stats-graph-1-item-info-desc">10</p>
            </div>
          </div>
        </div>

        <p className="ad-analysisi-title">Email Marketing</p>
        <div className="email-mark-analysis">
          <div className="email-mark-analysis-info">
            <p>Newsletter Campaign: </p>
            <p className="email-mark-analysis-info-stats">Open rate: 30%</p>
          </div>
          <div className="line-4"></div>
          <div className="email-mark-analysis-info">
            <p>Cart Abandonment Emails: </p>
            <p className="email-mark-analysis-info-stats">Conversion: 12%</p>
          </div>
        </div>
      </AnimatedSection>

    <AnimatedSection>

        <div className="stats-section-title">
          <p>Marketing Strategies</p>
        </div>
        <div className="pie-chart-target-cont">
          <div className="target-pie">
            <p>Target Audience</p>
            <TargetAudienceChart />
          </div>

          <div className="target-description">
            <p>Seasonal Campaigns</p>
            <p className="target-description-title">Holiday Promotions</p>
            <p>Special discounts and offers for holiday shoppers.</p>
            <p className="target-description-title">Black Friday/Cyber Monday Sales</p>
            <p>Exclusive deals like “Buy One, Get One 10% Off” or “Free Shipping on Orders Over $50”.</p>
            <p className="target-description-title">Gift Guides</p>
            <p>Curated lists featuring John’s best knitted items as perfect holiday gifts</p>
          </div>
        </div>
    </AnimatedSection>

<AnimatedSection>

        {/* Bar Chart for Ad Performance */}
        <div className="stats-section-title">
          <p>Advertising Performance</p>
        </div>
        <div className="bar-chart-ad-cont">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adData} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Spent" fill="#89BF70" name="Spent ($)" />
              <Bar dataKey="Clicks" fill="#7970BF" name="Clicks" />
              <Bar dataKey="Conversion" fill="#ff7300" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
</AnimatedSection>
      </div>
      <AnimatedSection>

      <Footer/>
      </AnimatedSection>
    </div>
  );
};
