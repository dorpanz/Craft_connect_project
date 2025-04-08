import React, { useEffect, useState } from "react";
import "./SubscriptionPage.css";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import arrow from "../shop-view-seller/pics/arrow.png";

const SubscriptionPage = () => {
  const [subscribedSellers, setSubscribedSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopRatings, setShopRatings] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSubscriptions = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const subscriptions = data.subscriptions || [];

          if (subscriptions.length === 0) {
            setSubscribedSellers([]);
            setLoading(false);
            return;
          }

          const sellerDocRefs = subscriptions.map((id) => doc(db, "sellers", id));
          const sellerSnapshots = await Promise.all(
            sellerDocRefs.map((ref) => getDoc(ref))
          );
          const sellersList = sellerSnapshots
            .filter((docSnap) => docSnap.exists())
            .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

          setSubscribedSellers(sellersList);
          fetchShopRatings(sellersList); // Fetch ratings for sellers
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // Fetch and calculate average rating for each seller
  const fetchShopRatings = async (sellerList) => {
    const ratingsData = {};

    for (const seller of sellerList) {
      try {
        const itemsRef = collection(db, "products");
        const q = query(itemsRef, where("sellerId", "==", seller.id));
        const querySnapshot = await getDocs(q);

        let totalRating = 0;
        let reviewsCount = 0;

        const reviewPromises = querySnapshot.docs.map(async (doc) => {
          const reviewsRef = collection(db, "reviews");
          const reviewsQuery = query(reviewsRef, where("itemId", "==", doc.id));
          const reviewsSnapshot = await getDocs(reviewsQuery);

          reviewsSnapshot.forEach((reviewDoc) => {
            totalRating += reviewDoc.data().rating;
            reviewsCount++;
          });
        });

        await Promise.all(reviewPromises);

        ratingsData[seller.id] = reviewsCount > 0 ? (totalRating / reviewsCount).toFixed(1) : "N/A";
      } catch (error) {
        console.error(`Error fetching ratings for seller ${seller.id}:`, error);
      }
    }

    setShopRatings(ratingsData);
  };

  return (
    <div>
      <Menu />
      <div className="subscription-container">
        <div className="edit-section-title">
          <Link to="/account-settings-user" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Your subscriptions</p>
        </div>
        <p>Manage your favorite shops and newsletter subscriptions.</p>

        {loading ? (
          <p>Loading...</p>
        ) : subscribedSellers.length > 0 ? (
          <div className="shops-section">
            {subscribedSellers.map((shop) => (
              <Link to={`/shop/${shop.shopName}`} key={shop.id} className="shop-info-section">
                {/* Shop Logo */}
                <img
                  src={shop.logo || "default.png"}
                  alt={shop.shopName}
                  className="shop-logo"
                />

                {/* Shop Name & Rating */}
                <div className="shop-name-products">
                  <div className="shop-name">
                    {shop.shopName}
                  </div>
                  <div className="shop-rating">
                    <span>
                      {"★".repeat(Math.floor(shopRatings[shop.id] || 0)) +
                        "☆".repeat(5 - Math.floor(shopRatings[shop.id] || 0))}
                    </span>
                    <p className="review-count">
                      {shopRatings[shop.id] !== "N/A"
                        ? `${shopRatings[shop.id]} stars`
                        : "No reviews yet"}
                    </p>
                  </div>

                  {/* Sales Count */}
                  <p className="sales-count">{shop.sales || 0} sales</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>You are not following any shops yet.</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
