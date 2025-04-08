import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import "./Recommended.css";

export const Recommended = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    const fetchRandomItems = async () => {
      try {
        // Step 1: Fetch a larger pool to randomize from (e.g., 20 recent items)
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Step 2: Filter to only include approved items
        const approvedItems = items.filter(item => item.status === "approved");

        // Step 3: Randomly pick 5 approved items
        const shuffled = [...approvedItems].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12);

        setRecommendedItems(selected);
      } catch (error) {
        console.error("Error fetching random recommended items:", error);
      }
    };

    fetchRandomItems();
  }, []);

  return (
    <div className="rec-section">
      <div className="rec-header">
        <p>🎯 Recommended for you</p>
      </div>

      <div className="rec-section-list">
        {recommendedItems.map((item) => (
          <div key={item.id} className="rec-section-list-item">
            <Link
              to={`/item-listing/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src={item.photos?.[0] || "/pics/no-image.jpg"}
                alt={item.title}
                className="rec-section-list-item-img"
              />
            </Link>
            <div className="item-desc">
              <Link
                to={`/item-listing/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="item-name">
                  {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
                </p>
              </Link>
              <div className="item-info">
                <Link to={`/shop/${item.shop_id}`} className="item-shopname">
                  {item.shopName}
                </Link>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
