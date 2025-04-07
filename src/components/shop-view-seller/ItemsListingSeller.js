import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import candleall from "./pics/candleall.jpg";

export const ItemsListingSeller = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [declined, setDeclined] = useState([]);
  const [pending, setPending] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
  
      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
  
        const productsList = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const productData = doc.data();
          const productId = doc.id;
  
          const reviewsRef = collection(db, "reviews");
          const reviewsQuery = query(reviewsRef, where("itemId", "==", productId));
          const reviewsSnapshot = await getDocs(reviewsQuery);
  
          let totalRating = 0;
          let reviewsCount = 0;
  
          reviewsSnapshot.forEach((reviewDoc) => {
            const reviewData = reviewDoc.data();
            totalRating += reviewData.rating;
            reviewsCount++;
          });
  
          const averageRating = reviewsCount > 0 ? (totalRating / reviewsCount).toFixed(1) : "No ratings yet";
  
          return {
            id: productId,
            ...productData,
            averageRating,
          };
        }));
  
        // Filter by status
        setProducts(productsList);
        setFilteredProducts(productsList.filter((p) => p.status === "approved"));
        setDeclined(productsList.filter((p) => p.status === "declined"));
        setPending(productsList.filter((p) => p.status === "pending"));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  
    const approvedItems = products.filter((p) => p.status === "approved");
  
    if (category === "All") {
      setFilteredProducts(approvedItems);
    } else {
      setFilteredProducts(approvedItems.filter((product) => product.category === category));
    }
  };
  

  const generateStars = (rating) => {
    if (rating === "No ratings yet") return <span>No ratings yet</span>;

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

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="featured-items-section">
      <div className="edit-featured-container">
        <p className="shop-items-section-title">All Items:</p>
        <Link to="/Add-Items">
          <button className="edit-featured-btn">Add</button>
        </Link>
      </div>

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

      {filteredProducts.length > 0 ? (
        <div className="shop-items-section-list-all">
          {filteredProducts.map((product) => (
            <Link
              to={`/item-listing/${product.id}`}
              key={product.id}
              className="all-items-section-list-item"
            >
              <img
                src={
                  product.photos && product.photos.length > 0
                    ? product.photos.find((photo) => photo)
                    : candleall
                }
                alt={product.title || "Item"}
                className="all-items-section-list-item-img"
              />

              <div className="all-items-section-list-item-desc">
                <p className="shop-items-section-list-item-title">
                  {product.title.substring(0, 20)}{product.title.length > 20 ? "..." : ""}
                </p>

                {/* Dynamically display the average rating */}
                <div className="stars-2">
                  {generateStars(product.averageRating)}{" "}
                  {product.averageRating !== "No ratings yet" && (
                    <span className="rating">- {product.averageRating}</span>
                  )}
                </div>
                <div className="all-items-section-list-item-info">
                  <p className="price">${product.price.toFixed(2) || "N/A"}</p>
                  <Link to={`/edit-product/${product.id}`} className="edit-item-btn">
                    Edit
                  </Link>
                  <Link to={`/item-statistics/${product.id}`} className="stats-item-btn">
                    Stats
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products available in this category.</p>
      )}
      {/* ========== Ending Soon Section ========== */}
{pending.length > 0 && (
  <div className="extra-items-section">
    <h3>Pending </h3>
    <div className="shop-items-section-list-all">
      {pending.map((product) => (
        <Link
          to={`/item-listing/${product.id}`}
          key={product.id}
          className="all-items-section-list-item"
        >
          <img
            src={product.photos?.[0] || candleall}
            alt={product.title}
            className="all-items-section-list-item-img"
          />
          <div className="all-items-section-list-item-desc">
            <p className="shop-items-section-list-item-title">
              {product.title.substring(0, 20)}{product.title.length > 20 ? "..." : ""}
            </p>
            <div className="stars-2">
              {generateStars(product.averageRating)}{" "}
              {product.averageRating !== "No ratings yet" && (
                <span className="rating">- {product.averageRating}</span>
              )}
            </div>
            <div className="all-items-section-list-item-info">
              <p className="price">${product.price?.toFixed(2)}</p>
              <Link to={`/edit-product/${product.id}`} className="edit-item-btn">Edit</Link>
              <Link to={`/item-statistics/${product.id}`} className="stats-item-btn">Stats</Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

{/* ========== Declined Section ========== */}
{declined.length > 0 && (
  <div className="extra-items-section">
    <h3>Declined</h3>
    <div className="shop-items-section-list-all">
      {declined.map((product) => (
        <Link
          to={`/item-listing/${product.id}`}
          key={product.id}
          className="all-items-section-list-item"
        >
          <img
            src={product.photos?.[0] || candleall}
            alt={product.title}
            className="all-items-section-list-item-img"
          />
          <div className="all-items-section-list-item-desc">
            <p className="shop-items-section-list-item-title">
              {product.title.substring(0, 20)}{product.title.length > 20 ? "..." : ""}
            </p>
            <div className="stars-2">
              {generateStars(product.averageRating)}{" "}
              {product.averageRating !== "No ratings yet" && (
                <span className="rating">- {product.averageRating}</span>
              )}
            </div>
            <div className="all-items-section-list-item-info">
              <p className="price">${product.price?.toFixed(2)}</p>
              <Link to={`/edit-product/${product.id}`} className="edit-item-btn">Edit</Link>
              <Link to={`/item-statistics/${product.id}`} className="stats-item-btn">Stats</Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

    </div>
  );
};
