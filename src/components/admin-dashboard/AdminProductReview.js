import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./productReview.css"; // Importing CSS file

export const AdminProductReview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [seller, setSeller] = useState(null); // New state to hold seller data
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setMainImage(docSnap.data().photos[0]);

          // Fetching the seller data
          const sellerDocRef = doc(db, "sellers", docSnap.data().sellerId);
          const sellerDocSnap = await getDoc(sellerDocRef);
          if (sellerDocSnap.exists()) {
            setSeller(sellerDocSnap.data());
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleApproval = async () => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { status: "approved" });
      alert("Product approved successfully!");
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } catch (error) {
      console.error("Error approving product:", error);
      alert("Failed to approve product.");
    }
};


  const handleDenial = async () => {
    try {
      await deleteDoc(doc(db, "products", productId));
      alert("Product denied and removed.");
      navigate("/admin");
    } catch (error) {
      console.error("Error denying product:", error);
      alert("Failed to deny product.");
    }
  };

  const nextImages = () => {
    if (startIndex + 3 < product.photos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevImages = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  if (!product || !seller) return       <div className="loading-container">
  <div className="loading-spinner"></div>
</div>;

  return (
    <div className="admin-review-container">
        <div className="edit-section-title">
          <Link to="/admin-dashboard" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Review Product</p>
        </div>
      <div className="admin-review-content">
        {/* Image Gallery */}
        <div className="image-gallery">
          <img className="big-image" src={mainImage} alt="Main Product" />
          <div className="thumbnail-container">
            <button className="arrow-switch left" onClick={prevImages}>
              &#9664;
            </button>
            <div className="thumbnails">
              {product.photos.slice(startIndex, startIndex + 3).map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index}`}
                  className={src === mainImage ? "active-thumbnail" : ""}
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
            <button className="arrow-switch right" onClick={nextImages}>
              &#9654;
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="admin-product-details">
          <h3>{product.title}</h3>
                {/* Link to Seller's Account */}
            <div className="seller-info">
                <p>Shop: <Link to={`/shop/${product.sellerId}`} className="seller-link">
                {seller.shopName}
                </Link></p>
            </div>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Size:</strong> {product.height}cm x {product.width}cm</p>
          <p><strong>Color:</strong> {product.primaryColour} {product.secondaryColour && `/ ${product.secondaryColour}`}</p>
        </div>
      </div>

      <div className="admin-review-buttons">
        <button className="approve-btn" onClick={handleApproval}>Approve</button>
        <button className="deny-btn" onClick={handleDenial}>Deny</button>
      </div>
    </div>
  );
};
