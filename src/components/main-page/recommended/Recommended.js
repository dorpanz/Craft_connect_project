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

  useEffect(() => {
    const fetchRecommendedItems = async () => {
      try {
        // Fetch products from the "products" collection
        const productsRef = collection(db, "products");
        const productSnapshot = await getDocs(productsRef);

        // Get the list of products
        const allProducts = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("All products fetched:", allProducts);

        let recommended = [];

        if (userFavorites.length > 0) {
          // Step 1: Get the list of favorite product titles from user's favorites
          const favoriteWords = userFavorites.flatMap(fav => fav.title.toLowerCase().split(' '));

          console.log("Favorite words:", favoriteWords);

          // Step 2: Filter all products based on whether their titles contain any of the favorite words
          recommended = allProducts.filter(item => {
            const itemTitleWords = item.title.toLowerCase().split(' '); // Split product title into words

            // Check if the product title contains any of the favorite words
            return favoriteWords.some(favWord => itemTitleWords.includes(favWord));
          });

          console.log("Recommended items based on favorite words:", recommended);
        } else {
          // If no favorites, pick random products
          recommended = allProducts.sort(() => Math.random() - 0.5).slice(0, 12); // Shuffle and take the first 12
        }

        // Step 3: Limit to 12 recommended items
        const selectedItems = recommended.slice(0, 12);
        setRecommendedItems(selectedItems);
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
                    {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
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
