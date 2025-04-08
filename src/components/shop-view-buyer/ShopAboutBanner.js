import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import info from "./pics/about.png";
import contact from "./pics/contact.png";
import imagedefault from "./pics/avatar.png";
import banner from "./pics/default-banner.jpg";

export const ShopAboutBanner = ({ shop, scrollToAboutSeller }) => {
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchShopRatings = async () => {
      try {
        const itemsRef = collection(db, "products");
        const q = query(itemsRef, where("sellerId", "==", shop.sellerId));
        const querySnapshot = await getDocs(q);

        let totalRating = 0;
        let itemsCount = 0;
        let allReviews = [];

        for (const docSnap of querySnapshot.docs) {
          const itemReviewsRef = collection(db, "reviews");
          const reviewsQuery = query(itemReviewsRef, where("itemId", "==", docSnap.id));
          const reviewsSnapshot = await getDocs(reviewsQuery);

          reviewsSnapshot.forEach((reviewDoc) => {
            const reviewData = reviewDoc.data();
            totalRating += reviewData.rating;
            itemsCount++;
            allReviews.push(reviewData);
          });
        }

        setAverageRating(itemsCount > 0 ? (totalRating / itemsCount).toFixed(1) : 0);
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching shop ratings:", error);
      }
    };

    const checkIfSubscribed = async () => {
      if (!user || !shop?.sellerId) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setIsSubscribed(data.subscriptions?.includes(shop.sellerId));
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
      }
    };

    if (shop?.sellerId) {
      fetchShopRatings();
      checkIfSubscribed();
    }
  }, [shop, user]);

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

  const handleFollow = async () => {
    if (!user) {
      alert("Please sign in to follow a shop.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        subscriptions: arrayUnion(shop.sellerId),
      });
      setIsSubscribed(true);
    } catch (err) {
      console.error("Failed to subscribe:", err);
    }
  };

  const handleUnfollow = async () => {
    if (!user) {
      alert("Please sign in to unfollow a shop.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        subscriptions: arrayRemove(shop.sellerId),
      });
      setIsSubscribed(false);
    } catch (err) {
      console.error("Failed to unsubscribe:", err);
    }
  };

  const handleContact = () => {
    if (!user) {
      alert("Please sign in to message the seller.");
      return;
    }

    navigate("/account-settings-user/chat", {
      state: {
        sellerId: shop.sellerId,
        shopName: shop.shopName,
      },
    });
  };

  return (
    <div className='shop-buyer-banner'>
      <div className='shop-buyer-banner-image-cont'>
        <img src={shop.banner || banner} alt="banner" className='shop-buyer-banner-image' />
      </div>
      <div className='shop-buyer-banner-about-logo'>
        <img src={shop.logo || imagedefault} alt="logo" className='shop-buyer-banner-about-logo-image' />
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
        <div className='shop-buyer-banner-about-section'>
          <div className='shop-buyer-about-section-links' onClick={handleContact} style={{ cursor: "pointer" }}>
            <img src={contact} alt="contact" className='icons-shop' />
            <p>Contact</p>
          </div>
          <div className='shop-buyer-about-section-links' onClick={scrollToAboutSeller} style={{ cursor: "pointer" }}>
            <img src={info} alt="info" className='icons-shop' />
            <p>About</p>
          </div>
        </div>
        <div className='line-shop'></div>
        <div className='shop-buyer-banner-about-section'>
          <p>{shop.description || "This shop hasn’t added a description yet."}</p>
          {user?.uid !== shop.sellerId && (
            isSubscribed ? (
              <button className='follow-btn' onClick={handleUnfollow}>Unfollow</button>
            ) : (
              <button className='follow-btn' onClick={handleFollow}>Follow</button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
