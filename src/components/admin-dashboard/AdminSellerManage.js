import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase"; // assuming db is configured correctly
import "./AdminUserManage.css";

export const AdminSellerManage = () => {
  const [sellers, setSellers] = useState([]);
  const [expandedSellerId, setExpandedSellerId] = useState(null);
  const [sellerActivity, setSellerActivity] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const sellersSnap = await getDocs(collection(db, "sellers"));
        const sellersData = sellersSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSellers(sellersData);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleToggleActivity = async (seller) => {
    const alreadyExpanded = expandedSellerId === seller.id;
    setExpandedSellerId(alreadyExpanded ? null : seller.id);

    if (!alreadyExpanded && !sellerActivity[seller.id]) {
      try {
        const productsSnap = await getDocs(
          query(collection(db, "products"), where("sellerId", "==", seller.id))
        );

        const products = productsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSellerActivity((prev) => ({
          ...prev,
          [seller.id]: { products },
        }));
      } catch (error) {
        console.error("Error fetching seller activity:", error);
      }
    }
  };

  const handleBanSeller = async (seller) => {
    try {
      await updateDoc(doc(db, "sellers", seller.id), { status: "banned" });
      alert(`Seller ${seller.shopName} has been banned.`);
    } catch (error) {
      console.error("Error banning seller:", error);
    }
  };

  const handleContactSeller = (seller) => {
    const subject = `Inquiry about your shop: ${seller.shopName}`;
    const body = `Hi ${seller.shopName},\n\nI would like to discuss something related to your products or shop.`;

    window.location.href = `mailto:${seller.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="admin-user-manage-container">
      <div className="admin-user-manage-container-top">
          <Link to="/admin/admin-account" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
        
          </Link>
          <h2 className="admin-user-manage-title">Seller Management</h2>
      </div>

      <div className="user-list-container">
        <div className="user-list-header">
          <div>Shop Name</div>
          <div>Email</div>
          <div>Desc</div>
          <div className="text-right">Actions</div>
        </div>

        {sellers.map((seller) => (
          <div key={seller.id} className="user-list-row">
            <div>{seller.shopName}</div>
            <div>{seller.email}</div>
            <div>{seller.description}</div>
            <div className="text-right action-buttons">
              <button
                onClick={() => handleToggleActivity(seller)}
                className="user-actions-button"
              >
                {expandedSellerId === seller.id
                  ? "Hide Products"
                  : "View Products"}
              </button>
              <button
                onClick={() => handleBanSeller(seller)}
                className="ban-button"
              >
                Ban Seller
              </button>
              <button
                onClick={() => handleContactSeller(seller)}
                className="contact-button"
              >
                Contact Seller
              </button>
            </div>

            {expandedSellerId === seller.id && sellerActivity[seller.id] && (
              <div className="activity-modal-container">
                <div className="activity-section">
                  <h3>Products</h3>
                  {sellerActivity[seller.id].products.length > 0 ? (
                    <ul>
                      {sellerActivity[seller.id].products.map((product) => (
                        <li key={product.id} className="activity-item">
<div className="all-items-section-list-item-images">
  {product.photos?.map((photo, index) => (
    <img
      key={index}
      className="all-items-section-list-item-img"
      src={photo}
      alt={`Product image ${index + 1}`}
    />
  ))}
</div>

                          <p>{product.title}</p>
                          <p>CA${product.price}</p>
                          <p><strong>Catgeory: </strong>{product.category} - {product.subCategory} - {product.subSubcategory}  </p>
<p>{product.description}</p>
<p><strong>Quantity: </strong>{product.quantity}</p>
<p><strong>Sales Count: </strong>{product.salesCount}</p>
<p><strong>Status: </strong>{product.status}</p>
                          {/* You can add more product info here */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Full view" />
            <button
              onClick={() => setSelectedImage(null)}
              className="close-button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
