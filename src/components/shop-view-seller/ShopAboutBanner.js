import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";
import defaultImage from "./pics/no-image.jpg"; // Default image for profile, banner, etc.
import info from "./pics/about.png";
import contact from "./pics/contact.png";
import { Link, useNavigate } from "react-router-dom";

export const ShopAboutBanner = ({ shopData }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchShopRatings = async () => {
      try {
        // Get all products from the shop using sellerId
        const itemsRef = collection(db, "products");
        const q = query(itemsRef, where("sellerId", "==", shopData.id)); // Use sellerId
        const querySnapshot = await getDocs(q);
  
        let totalRating = 0;
        let itemsCount = 0;
        let allReviews = [];
  
        // Fetch reviews for each product
        for (const doc of querySnapshot.docs) {
          const itemReviewsRef = collection(db, "reviews");
          const reviewsQuery = query(itemReviewsRef, where("itemId", "==", doc.id)); // Reviews filtered by itemId
          const reviewsSnapshot = await getDocs(reviewsQuery);
  
          reviewsSnapshot.forEach((reviewDoc) => {
            const reviewData = reviewDoc.data();
            totalRating += reviewData.rating;
            itemsCount++;
            allReviews.push(reviewData);
          });
        }
  
        // After processing all reviews, calculate the average rating
        if (itemsCount > 0) {
          setAverageRating((totalRating / itemsCount).toFixed(1)); // Set average rating
        } else {
          setAverageRating(0); // No reviews found
        }
        setReviews(allReviews); // Set all reviews for display
  
      } catch (error) {
        console.error("Error fetching shop ratings:", error);
      }
    };
  
    if (shopData?.id) {
      fetchShopRatings(); // Fetch ratings for the shop
    }
  }, [shopData]);  // Make sure to properly trigger when `shopData` changes
  
  

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
    <div className="shop-buyer-banner">
      <div className="shop-buyer-banner-image-cont">
        <img
          src={shopData?.banner || defaultImage}
          alt="banner"
          className="shop-buyer-banner-image"
        />
      </div>
      <div className="shop-buyer-banner-about-logo">
        <img
          src={shopData?.logo || defaultImage}
          alt="logo"
          className="shop-buyer-banner-about-logo-image"
        />
      </div>
      <div className="shop-buyer-banner-about">
        <div className="shop-buyer-banner-about-section">
          <p className="shop-buyer-banner-name">{shopData?.shopName}</p>
          <span className="stars-3">
            {generateStars(averageRating)}{" "}
            {averageRating !== null && <span className="rating">- {averageRating}</span>}
          </span>
        </div>
        <div className="line-shop"></div>
        <div className="shop-buyer-banner-about-section-small">
          <div className="shop-buyer-about-section-links">
            <img src={contact} alt="contact" className="icons-shop" />
            <p>Contact</p>
          </div>
          <div className="shop-buyer-about-section-links">
            <img src={info} alt="info" className="icons-shop" />
            <p>About</p>
          </div>
        </div>
        <div className="line-shop"></div>
        <div className="shop-buyer-banner-about-section">
          <p>{shopData?.description || "Add a tagline for your shop!"}</p>
          <Link to="/Shop/Edit" className="edit-seller-btn">
            Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
};
