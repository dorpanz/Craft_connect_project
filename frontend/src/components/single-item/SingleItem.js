import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../../data/products";
import heart from "../menu/pictures/mdi_heart-outline.png";
import { Link } from "react-router-dom";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import './single-item.css'
import { useCart } from "../../context/CartContext"; 
import { useFavorites } from "../../context/FavoritesContext";
export const SingleItem = () => {
  const { itemId } = useParams();
  const item = data.find((item) => item.id === parseInt(itemId));
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(item.photos_videos[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [reviewsData, setReviewsData] = useState(item.reviewsData);
  const { toggleFavorite } = useFavorites();
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  if (!item) {
    return <div>Item not found</div>;
  }

  const nextImages = () => {
    if (startIndex + 3 < item.photos_videos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevImages = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const sortReviews = (option) => {
    let sortedReviews = [...item.reviews]; // Work with item.reviews

    if (option === "rating") {
      sortedReviews.sort((a, b) => b.rating - a.rating); // Sort by rating (high to low)
    }
    return sortedReviews;
  };

  const handleLike = (id) => {
    setReviewsData((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handleDislike = (id) => {
    setReviewsData((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, dislikes: review.dislikes + 1 } : review
      )
    );
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  const generateStars = (rating) => {
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
    <div className="item-customize">
      <Menu />
      <div className="item-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          {/* Big Image */}
          <img className="big-image" src={mainImage} alt="Main Product" />

          {/* Small Images with Arrows */}
          <div className="thumbnail-container">
            <button className="arrow-switch left" onClick={prevImages}>
              &#9664;
            </button>
            <div className="thumbnails">
              {item.photos_videos
                .slice(startIndex, startIndex + 3)
                .map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index}`}
                    className={src === mainImage ? "active-thumbnail" : ""}
                    onClick={() => setMainImage(src)}
                  />
                ))}
            </div>
            <button className="arrow-switch right" onClick={nextImages}>
              &#9654;
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h2>{item.title}</h2>
          <div className="stars-2">{generateStars(item.average_rating)} <span className="rating">- {item.average_rating}</span></div>
          {/* Seller Info */}
          <Link to={`/shop/${item.shop_id}`} className='item-shopname'>
                                        {item.shop_name}
                                    </Link>
          <p className="price">{`$${item.price}`}</p>
          {/* Description */}
          <p className="description">{item.description}</p>

          {/* Options */}
          <div className="options">
            <label>Size</label>
            <select>
              <option>{item.size}</option>
            </select>

            <label>Color</label>
            <select>
              {item.primary_colour && <option>{item.primary_colour}</option>}
              {item.secondary_colour && (
                <option>{item.secondary_colour}</option>
              )}
            </select>

            <label>Quantity</label>
            <input type="number" min="1" defaultValue="1" />

            {item.customized && (
              <>
                <label>Personalization</label>
                <input type="text" placeholder="Enter personalized text" />
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="buttons">
            <button className="add-to-cart" onClick={() => addToCart(item)}>Add To Cart</button>
            <button className="add-to-fav" onClick={() => toggleFavorite(item)}>
                        Favorite
            </button>
          </div>
        </div>
      </div>

      {/* Item Details Section with See More / See Less */}
      <div className="item-details">
        <p className="item-details-title">Item Details</p>
        <div>
          <span>
            {isDetailsExpanded
              ? item.expanded_description
              : `${item.expanded_description.substring(0, 150)}...`}
          </span>
          <button className="see-more-less" onClick={toggleDetails}>
            {isDetailsExpanded ? "See Less" : "See More"}
          </button>
        </div>
      </div>
      <div className="item-details">
        <p className="item-details-title">Shop Details</p>
        <div>
          <p>
              {item.about}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-item-section">
        <p className="reviews-title">{item.reviews.length} Reviews</p>
        <div className="sort-options">
          <label>Sort By:</label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="date">Date (Newest to Oldest)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
        <div className="reviews-list">
    {sortReviews(sortOption).map((review) => (
      <div className="review-item-single" key={review.id}>
        <div className="review-text">
          {/* User Image & Name */}
          <div className="review-header">
            <p className="review-name">{review.user}</p>
          </div>

          {/* Rating Stars */}
          <p className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>

          {/* Comment & Date */}
          <p className="review-message">{review.comment}</p>
          <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>

          {/* Like/Dislike Buttons */}
          
        </div>
      </div>
    ))}
  </div>
      </div>

      <Footer />
    </div>
  );
};
