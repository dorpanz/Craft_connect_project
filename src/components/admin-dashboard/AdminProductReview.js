import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./productReview.css"; // Importing CSS file

export const AdminProductReview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [seller, setSeller] = useState(null); // New state to hold seller data
  const [aiClassification, setAiClassification] = useState(null); // New state for AI data
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product data
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct(productData);
          setMainImage(productData.photos[0]);
          console.log("Product data:", productData); // Log product data

          // Fetch seller data
          const sellerRef = doc(db, "sellers", productData.sellerId);
          const sellerSnap = await getDoc(sellerRef);
          if (sellerSnap.exists()) {
            setSeller(sellerSnap.data());
            console.log("Seller data:", sellerSnap.data()); // Log seller data
          }

          // Fetch AI classification data using ai_answer from product
          const aiRef = doc(db, "ai_classifications", productData.ai_answer); // Use ai_answer to fetch classification
          const aiSnap = await getDoc(aiRef);
          if (aiSnap.exists()) {
            setAiClassification(aiSnap.data()); // Store AI classification in the state
            console.log("AI classification data:", aiSnap.data()); // Log AI classification data
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productId) fetchProductData();
  }, [productId]);

  const handleApproval = async () => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { status: "approved" });
      alert("Product approved successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error approving product:", error);
      alert("Failed to approve product.");
    }
  };

  const handleDenial = async () => {
    try {
      await deleteDoc(doc(db, "products", productId));
      alert("Product denied and removed.");
      navigate("/admin-dashboard");
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

  if (!product || !seller) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="admin-review-container">
      <div className="edit-section-title">
        <Link to="/admin-dashboard" className="go-back">
          <img src={arrow} alt="arrow" className="arrow" />
        </Link>
        <p className="edit-featured-title">Review Product</p>
      </div>
      {aiClassification && aiClassification.aisay && (
        <div className="ai-classification-info">
  <h4>AI Classification Information</h4>
  <div className="classification-details">
    <p><strong>Label:</strong> {aiClassification.aisay.label}</p>
    <p><strong>Probability:</strong> {aiClassification.aisay.probability.toFixed(2)}</p>
    <p 
      className={`handmade-likely ${aiClassification.aisay.handmadeLikely ? "green" : "red"}`}
    >
      <strong>Handmade Likely:</strong> {aiClassification.aisay.handmadeLikely ? "Yes" : "No"}
    </p>
  </div>
</div>

)}

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

        {/* AI Classification Data */}

      </div>

      <div className="admin-review-buttons">
        <button className="approve-btn" onClick={handleApproval}>Approve</button>
        <button className="deny-btn" onClick={handleDenial}>Deny</button>
      </div>
    </div>
  );
};
