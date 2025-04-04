import React from "react";
import { Link } from "react-router-dom";
import './ShopBuyer.css';
import candleitem from "./pics/candleitem.jpg";
export const FeaturedItems = ({ shopId, items }) => {
  const featuredItems = items.filter(item => item.isFeatured); // Example condition

  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">Featured Items:</p>
      <div className="shop-items-section-list">
        {featuredItems.length > 0 ? (
          featuredItems.map((item) => (
            <div key={item.id} className="shop-items-section-list-item">
              <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none" }}>
                <img src={item.photos?.[0]} alt={item.title} />
              </Link>
              <p className="shop-items-section-list-item-title">{item.title}</p>
              <p className="price">${item.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No featured items available for this shop.</p>
        )}
      </div>
    </div>
  );
};
