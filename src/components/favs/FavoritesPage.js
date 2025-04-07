import React, { useEffect, useState } from "react";
import "./FavoritesPage.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [shopNames, setShopNames] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch shop names
  useEffect(() => {
    const fetchShopNames = async () => {
      const uniqueSellerIds = [...new Set(favorites.map((item) => item.sellerId))];

      const shopData = {};
      await Promise.all(
        uniqueSellerIds.map(async (sellerId) => {
          if (sellerId && !shopNames[sellerId]) {
            const sellerRef = doc(db, "sellers", sellerId);
            const sellerSnap = await getDoc(sellerRef);
            if (sellerSnap.exists()) {
              const data = sellerSnap.data();
              shopData[sellerId] = data.shopName || "Unknown Shop";
            }
          }
        })
      );

      setShopNames((prev) => ({ ...prev, ...shopData }));
    };

    if (favorites.length > 0) {
      fetchShopNames();
    }
  }, [favorites]);

  // Fetch ratings
  useEffect(() => {
    const fetchRatings = async () => {
      const ratingData = {};

      await Promise.all(
        favorites.map(async (item) => {
          const reviewsRef = collection(db, "reviews");
          const q = query(reviewsRef, where("itemId", "==", item.id));
          const querySnapshot = await getDocs(q);

          const reviews = querySnapshot.docs.map(doc => doc.data());
          const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
          const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : null;

          ratingData[item.id] = averageRating;
        })
      );

      setRatings(ratingData);
    };

    if (favorites.length > 0) {
      fetchRatings();
    }
  }, [favorites]);

  const generateStars = (rating) => {
    if (rating === null) return "No ratings yet";
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
      <div className="favorites-container">
        <h1>Your Favorites ❤️</h1>

        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <p>No favorite items yet.</p>
            <Link to="/" className="read-more-btn">Shop now!</Link>
            <div className="line"></div>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-item">
                <Link to={`/item-listing/${item.id}`} className="favorite-link">
                  <img
                    src={item.photos?.[0] || "/placeholder.jpg"}
                    alt={item.title || "Favorite item"}
                    className="favorite-image"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                </Link>

                <div className="favorite-info">
                  <Link to={`/item-listing/${item.id}`} className="favorite-title-link">
                    <h3 className="favorite-title">{item.title.slice(0,20)}...</h3>
                  </Link>

                  <p className="favorite-rating">
                    {generateStars(ratings[item.id])} ({ratings[item.id] || "0"})
                  </p>
                  {item.sellerId && (
                    <Link to={`/shop/${item.sellerId}`} className="favorite-shop-link">
                      <p className="favorite-shop">{shopNames[item.sellerId] || "Loading..."}</p>
                    </Link>
                  )}

                  <p className="favorite-price">${item.price?.toFixed(2)}</p>


                  <button
                    className="remove-cart"
                    onClick={() => toggleFavorite(item)}
                    aria-label={`Remove ${item.title} from favorites`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
