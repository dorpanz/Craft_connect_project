import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import arrow from "./pics/arrow.png";
import Menu from "../menu/Menu";

export const EditFeaturedItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const db = getFirestore();

  // Extract sellerId and items from state
  const sellerId = location.state?.sellerId;
  const { items = [] } = location.state || {};

  // Only consider approved items for featured
  const approvedItems = items.filter(
    (item) => item.sellerId === sellerId && item.status === "approved" && item.quantity > 0
  );

  const initialFeatured = approvedItems
    .filter((item) => item.isFeatured)
    .map((item) => item.id);

  const [selectedItems, setSelectedItems] = useState(initialFeatured);

  if (!sellerId) {
    console.warn("Seller ID is missing! Redirecting...");
    navigate("/your-shop");
    return null;
  }

  // Toggle selection function
  const toggleSelection = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : prevSelected.length < 4
        ? [...prevSelected, itemId]
        : prevSelected
    );
  };

  // Save featured items to Firebase
  const handleSave = async () => {
    try {
      const productsRef = collection(db, "products");
      const allProductsSnap = await getDocs(productsRef);

      const updatePromises = allProductsSnap.docs
        .filter((productDoc) => productDoc.data().sellerId === sellerId)
        .map((productDoc) => {
          const productId = productDoc.id;
          const isFeatured = selectedItems.includes(productId);
          return updateDoc(doc(db, "products", productId), { isFeatured });
        });

      await Promise.all(updatePromises);
      console.log("Featured items updated successfully!");
      navigate("/your-shop");
    } catch (error) {
      console.error("Error updating featured items:", error);
    }
  };

  return (
    <div>
      <Menu />
      <div className="edit-featured-items">
        <div className="edit-section-title">
          <Link to="/your-shop" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Select up to 4 Featured Items</p>
        </div>

        <div className="edit-featured-save">
          <p className="selected-count">Selected: {selectedItems.length} / 4</p>
          <button className="save-featured-btn" onClick={handleSave}>
            Save Featured Items
          </button>
        </div>

        <div className="shop-items-section-list-all">
          {approvedItems.length === 0 ? (
            <p>No approved items available for featuring.</p>
          ) : (
            approvedItems.map((item) => (
              <div key={item.id} className="all-items-section-list-item">
                <img src={item.photos?.[0] || "/pics/no-image.jpg"} alt={item.title} />
                <div className="all-items-section-list-item-desc">
                  <p className="shop-items-section-list-item-title">{item.title}</p>
                  <p className="price">${item.price?.toFixed(2)}</p>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                    disabled={selectedItems.length >= 4 && !selectedItems.includes(item.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
