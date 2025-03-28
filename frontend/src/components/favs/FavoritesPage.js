import React, { useEffect } from "react";
import "./FavoritesPage.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext"; // Import the Favorites Context

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites(); // Get favorites from context

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Menu />
      <div className="favorites-container">
        <h1>Your Favorites ❤️</h1>
        {favorites.length === 0 ? (
          <div>
            <p>No favorite items yet.</p>
            <Link to="/" className="read-more-btn">Shop now!</Link>
            <div className="line"></div>
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <img src={item.photos_videos[0]} alt={item.title} className="favorite-image" />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <button className="remove-btn" onClick={() => toggleFavorite(item)}>❌ Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
