import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext"; // Import useAuth
import "./Recommended.css";
import { ShopLink } from "../../single-item/ShopLink";

export const Recommended = () => {
  const { user, loading } = useAuth(); // Use the useAuth hook to get user data
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [shopNames, setShopNames] = useState({});

  // Fetch user's favorite items from Firestore
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) { // Ensure user is authenticated before proceeding
          const userRef = doc(db, "favorites", user.uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            const favorites = userSnapshot.data().items || [];
            console.log("User's favorites:", favorites);
            setUserFavorites(favorites);
          } else {
            console.log("No favorite items found for the user.");
            setUserFavorites([]); // Ensure empty array if no favorites are found
          }
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

// inside useEffect
useEffect(() => {
  const fetchRecommendedItems = async () => {
    try {
      const productsRef = collection(db, "products");
      const productSnapshot = await getDocs(productsRef);

      const allProducts = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter only approved and in-stock items
      const approvedAndAvailableProducts = allProducts.filter(
        item => item.status === "approved" && item.quantity > 0
      );

      let recommended = [];

      if (userFavorites.length > 0) {
        // Extract favorite title words
        const favoriteWords = userFavorites.flatMap(fav =>
          fav.title.toLowerCase().split(' ')
        );

        // Extract categories from user's favorites
        const favCategories = new Set();
        const favSubCategories = new Set();
        const favSubSubCategories = new Set();

        userFavorites.forEach(fav => {
          if (fav.category) favCategories.add(fav.category.toLowerCase());
          if (fav.subCategory) favSubCategories.add(fav.subCategory.toLowerCase());
          if (fav.subSubCategory) favSubSubCategories.add(fav.subSubCategory.toLowerCase());
        });

        // Filter based on either title word or category match
        recommended = approvedAndAvailableProducts.filter(item => {
          const titleWords = item.title.toLowerCase().split(' ');

          const titleMatch = favoriteWords.some(word => titleWords.includes(word));

          const categoryMatch =
            (item.category && favCategories.has(item.category.toLowerCase())) ||
            (item.subCategory && favSubCategories.has(item.subCategory.toLowerCase())) ||
            (item.subSubCategory && favSubSubCategories.has(item.subSubCategory.toLowerCase()));

          return titleMatch || categoryMatch;
        });
      } else {
        // No favorites? Show random picks
        recommended = approvedAndAvailableProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);
      }

      setRecommendedItems(recommended.slice(0, 12));
    } catch (error) {
      console.error("Error fetching recommended items:", error);
    }
  };

  fetchRecommendedItems();
}, [userFavorites]);

  if (loading) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>;
  }

  return (
    <div className="rec-section">
      <div className="rec-header">
        <p>🎯 Recommended for you</p>
      </div>

      {recommendedItems.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
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
                    {item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
                  </p>
                </Link>
                <div className="item-info">
                  <Link to={`/shop/${item.sellerId}`} className="item-shopname">
                    {<ShopLink sellerId={item.sellerId} /> || "Shop Name Not Available"}
                  </Link>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
