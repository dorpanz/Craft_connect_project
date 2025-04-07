import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebase"; // Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";

export const ItemsListing = ({ items }) => {
  const { addToCart } = useCart();
  const [ratings, setRatings] = useState({}); // Store ratings for items
  const [filteredItems, setFilteredItems] = useState(items.filter(item => item.status === "approved"));
 // Filtered items
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch ratings for each item
  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsMap = {};
      for (const item of items) {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("itemId", "==", item.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const totalRating = querySnapshot.docs.reduce(
            (sum, doc) => sum + doc.data().rating,
            0
          );
          ratingsMap[item.id] = (totalRating / querySnapshot.docs.length).toFixed(1); // Calculate average
        } else {
          ratingsMap[item.id] = null; // No ratings
        }
      }
      setRatings(ratingsMap);
    };

    if (items.length > 0) {
      fetchRatings();
    }
  }, [items]);

  // Filter items by category
  useEffect(() => {
    const approvedItems = items.filter((item) => item.status === "approved");
    if (selectedCategory === "All") {
      setFilteredItems(approvedItems);
    } else {
      setFilteredItems(
        approvedItems.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, items]);
  

  const generateStars = (rating) => {
    if (rating === null) return "No ratings yet"; // Handle no rating

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">All Items:</p>

      {/* Category Dropdown */}
      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="ACCESSORIES">Accessories</option>
          <option value="CLOTHING">Clothing</option>
          <option value="HOMEWARE">Homeware</option>
          <option value="ART">Art</option>
          <option value="CARDS&STATIONERY">Cards & Stationery</option>
          <option value="SUPPLIES">Supplies</option>
        </select>
      </div>

      <div className="shop-items-section-list-all">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="all-items-section-list-item">
              <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none" }}>
                <img src={item.photos[0]} alt={item.title} className="all-items-section-list-item-img" />
              </Link>
              <div className="all-items-section-list-item-desc">
                <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <p className="shop-items-section-list-item-title">
                    {item.title.substring(0, 20)}
                    {item.title.length > 20 ? "..." : ""}
                  </p>
                </Link>
                <div className="stars-2">
                  {generateStars(ratings[item.id])}{" "}
                  {ratings[item.id] !== null && <span className="rating">- {ratings[item.id]}</span>}
                </div>
                <div className="all-items-section-list-item-info">
                  <p className="price">${item.price}</p>
                  <button onClick={() => addToCart(item)} className="add-to-cart-2">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};
