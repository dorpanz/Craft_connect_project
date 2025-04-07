import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase"; // Firestore setup
import "./ShopBest.css";
import { Link } from "react-router-dom";
import imagedefault from "./pics/avatar.png"
export const ShopsBest = () => {
  const [shops, setShops] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [shopRatings, setShopRatings] = useState({});

  // Fetch shops from Firestore
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopSnapshot = await getDocs(collection(db, "sellers"));
        const fetchedShops = shopSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort shops by sales or reviews count
        const sortedShops = fetchedShops.sort((a, b) =>
          (b.sales || b.reviews?.length || 0) - (a.sales || a.reviews?.length || 0)
        );
        
        setShops(sortedShops);

        // Fetch ratings for all shops
        fetchShopRatings(sortedShops);
      } catch (error) {
        console.error("❌ Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  // Fetch and calculate average rating for each shop
  const fetchShopRatings = async (shopList) => {
    const ratingsData = {};

    for (const shop of shopList) {
      try {
        const itemsRef = collection(db, "products");
        const q = query(itemsRef, where("sellerId", "==", shop.id));
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

        ratingsData[shop.id] = reviewsCount > 0 ? (totalRating / reviewsCount).toFixed(1) : "N/A";
      } catch (error) {
        console.error(`❌ Error fetching ratings for shop ${shop.id}:`, error);
      }
    }

    setShopRatings(ratingsData);
  };

  // Function to load more shops
  const loadMoreShops = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className="best-sel-shop-sec">
      <div className="rec-header">
        <p>Best Selling Shops</p>
      </div>

      <div className="shops-section">
        {shops.slice(0, visibleCount).map((shop) => (
          <div key={shop.id} className="shop-info-section">
            {/* Shop Logo */}
            <img src={shop.logo || imagedefault} alt={shop.shop_name} className="shop-logo" />

            {/* Shop Name & Rating */}
            <div className="shop-name-products">
            <Link to={`/shop/${shop.shopName}`} className="shop-name">
            {shop.shopName}
            </Link>
              <div className="shop-rating">
                <span>{"★".repeat(Math.floor(shopRatings[shop.id] || 0)) + "☆".repeat(5 - Math.floor(shopRatings[shop.id] || 0))}</span>
                <p className="review-count">({shopRatings[shop.id] !== "N/A" ? `${shopRatings[shop.id]} stars` : "No reviews yet"})</p>
              </div>

              {/* Featured Products */}
              <p className="sales-count">{shop.sales || 0} sales</p>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
