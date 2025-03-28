import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const ItemsListing = ({ items }) => {
  const { addToCart } = useCart();
  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">All Items:</p>
      <div className="shop-items-section-list-all">
        {items.map((item) => (
          <div key={item.id} className="all-items-section-list-item">
            <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none" }}>
              <img src={item.photos_videos[0]} alt={item.title} className="all-items-section-list-item-img" />
            </Link>
            <div className="all-items-section-list-item-desc">
              <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
                <p className="shop-items-section-list-item-title">{item.title}</p>
              </Link>
              <div className="stars-2">★★★★☆</div>
              <div className="all-items-section-list-item-info">
                <p className="price">${item.price}</p>
                <button onClick={() => addToCart(item)} className="add-to-cart-2">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
