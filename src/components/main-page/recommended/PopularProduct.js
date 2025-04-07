import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import "./GiftPopular.css";
import { useAuth } from "../../../context/AuthContext";
import { ShopLink } from "../../single-item/ShopLink";

export const PopularProduct = () => {
  const [popularItems, setPopularItems] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("status", "==", "approved"));
        const querySnapshot = await getDocs(q);

        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sortedByViews = fetchedItems
          .filter((item) => typeof item.views === "number")
          .sort((a, b) => b.views - a.views)
          .slice(0, 8);

        const itemsWithExtras = await Promise.all(
          sortedByViews.map(async (item) => {
            // Fetch seller info
            let shopName = "Unknown Shop";
            if (item.sellerId) {
              const sellerRef = doc(db, "sellers", item.sellerId);
              const sellerSnap = await getDoc(sellerRef);
              if (sellerSnap.exists()) {
                shopName = sellerSnap.data().shopName || shopName;
              }
            }

            // Fetch reviews
            const reviewsRef = collection(db, "reviews");
            const reviewQuery = query(
              reviewsRef,
              where("itemId", "==", item.id)
            );
            const reviewSnapshot = await getDocs(reviewQuery);

            const reviews = reviewSnapshot.docs.map((doc) => doc.data());
            const totalRating = reviews.reduce(
              (sum, r) => sum + (r.rating || 0),
              0
            );
            const averageRating =
              reviews.length > 0
                ? (totalRating / reviews.length).toFixed(1)
                : null;

            return {
              ...item,
              shopName,
              averageRating,
            };
          })
        );

        setPopularItems(itemsWithExtras);
      } catch (error) {
        console.error(
          "Error fetching popular items, sellers, or reviews:",
          error
        );
      }
    };

    fetchPopularItems();
  }, []);
  const generateStars = (rating) => {
    if (rating === null) return "No ratings yet"; // Handle case with no reviews

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
    <div className="popular-section">
      <div className="rec-header">
        <p>Popular right now</p>
      </div>

      <div className="rec-section-list">
        {popularItems.map((item) => (
          <div key={item.id} className="rec-section-list-item">
            <Link
              to={`/item-listing/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={item.photos?.[0]}
                alt={item.title}
                className="rec-section-list-item-img"
              />
            </Link>
            <div className="item-desc">
              <Link
                to={`/item-listing/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="item-name">{item.title?.slice(0, 50)}...</p>
              </Link>
              <div className="item-info">
                <div>
                  <Link
                    to={
                      user && user.uid === item.sellerId
                        ? "/your-shop"
                        : `/shop/${item.shopName}`
                    }
                    className="item-shopname"
                  >
                    {user && user.uid === item.sellerId ? (
                      <p>{user.shopName}</p>
                    ) : (
                      <ShopLink sellerId={item.sellerId} />
                    )}
                  </Link>
                  <p className="item-rating">
                    {generateStars(item.averageRating)} (
                    {item.averageRating || "0"})
                  </p>

                  <p className="item-price">${item.price?.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
