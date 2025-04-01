import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export const ShopLink = ({ sellerId, shopName: directShopName }) => {
  const [shopName, setShopName] = useState(directShopName || "");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // If no shopName is passed directly, fetch it using sellerId
    if (!directShopName && sellerId) {
      const fetchShopName = async () => {
        setLoading(true);  // Start loading when fetching data

        const sellerRef = doc(db, "sellers", sellerId);  // Firestore reference
        const sellerSnap = await getDoc(sellerRef);

        if (sellerSnap.exists()) {
          setShopName(sellerSnap.data().shopName);  // Set shopName from the fetched seller document
        } else {
          console.log("No such document!");
        }

        setLoading(false);  // Stop loading after fetching
      };

      fetchShopName();
    } else {
      setLoading(false);  // No need to load if shopName is passed directly
    }
  }, [sellerId, directShopName]);  // Re-run only if sellerId or directShopName changes

  if (loading) {
    return <span>Loading...</span>; // Show loading text while fetching data
  }

  return shopName ? (
    <Link to={`/shop/${shopName}`} className="item-shopname">
      {shopName}
    </Link>
  ) : (
    <span>Shop not found</span> // Fallback if shopName is not found
  );
};
