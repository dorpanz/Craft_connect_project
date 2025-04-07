import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import info from "./pics/about.png";
import contact from "./pics/contact.png";
import imagedefault from "./pics/avatar.png"
import banner from "./pics/default-banner.jpg"

export const ShopAboutBanner = ({ shop, scrollToAboutSeller }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShopRatings = async () => {
      try {
        // Get all products from the shop using sellerId
        const itemsRef = collection(db, "products");
        const q = query(itemsRef, where("sellerId", "==", shop.sellerId)); // Use sellerId
        const querySnapshot = await getDocs(q);

        let totalRating = 0;
        let itemsCount = 0;
        let allReviews = [];

        querySnapshot.forEach((doc) => {
          const itemData = doc.data();

          // Fetch the reviews for each item and calculate the average rating
          const itemReviewsRef = collection(db, "reviews");
          const reviewsQuery = query(itemReviewsRef, where("itemId", "==", doc.id)); // Reviews filtered by itemId
          getDocs(reviewsQuery).then((reviewsSnapshot) => {
            reviewsSnapshot.forEach((reviewDoc) => {
              const reviewData = reviewDoc.data();
              totalRating += reviewData.rating;
              itemsCount++;
              allReviews.push(reviewData);
            });
            // After processing all reviews, calculate the average rating
            if (itemsCount > 0) {
              setAverageRating((totalRating / itemsCount).toFixed(1)); // Set average rating
            } else {
              setAverageRating(0); // No reviews found
            }
            setReviews(allReviews); // Set all reviews for display
          });
        });
      } catch (error) {
        console.error("Error fetching shop ratings:", error);
      }
    };

    if (shop?.sellerId) {
      fetchShopRatings(); // Fetch ratings for the shop
    }
  }, [shop]);

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

  return (
    <div className='shop-buyer-banner'>
      <div className='shop-buyer-banner-image-cont'>
        <img src={shop.banner || banner} alt="banner" className='shop-buyer-banner-image'/>
      </div>
      <div className='shop-buyer-banner-about-logo'>
        <img src={shop.logo || imagedefault} alt="logo" className='shop-buyer-banner-about-logo-image'/>
      </div>
      <div className='shop-buyer-banner-about'>
        <div className='shop-buyer-banner-about-section'>
          <p className='shop-buyer-banner-name'>{shop.shopName}</p>
          <span className="stars-3">
            {generateStars(averageRating)}{" "}
            {averageRating !== null && <span className="rating">- {averageRating}</span>}
          </span>
        </div>
        <div className='line-shop'></div>
        <div className='shop-buyer-banner-about-section-small'>
          <div 
            className='shop-buyer-about-section-links' 
          >
            <img src={contact} alt="contact" className='icons-shop'/>
            <p>Contact</p>
          </div>

          <div className='shop-buyer-about-section-links'
                      onClick={scrollToAboutSeller} // Trigger the scroll
                      style={{ cursor: "pointer" }}>
            <img src={info} alt="info" className='icons-shop'/>
            <p>About</p>
          </div>
        </div>
        <div className='line-shop'></div>
        <div className='shop-buyer-banner-about-section'>
          <p>{shop.description}</p>
          <button className='follow-btn'>Follow</button>
        </div>

        {/* Reviews Section */}
      </div>
    </div>
  );
};
