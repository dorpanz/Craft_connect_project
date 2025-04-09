import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import defaultImage from "../shop-view-seller/pics/no-image.jpg"; // Default for profile & gallery
import instagramIcon from "../shop-view-seller/pics/mdi_instagram.png";
import twitterIcon from "../shop-view-seller/pics/pajamas_twitter.png";
import { Link } from "react-router-dom";
import './single-item.css'
import { ShopLink } from "./ShopLink";
export const SellerInfo = ({ item,user,sellerData, itemId }) => {
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
}, [itemId]);
  useEffect(() => {
    console.log("Fetching products for seller:", sellerData);

    if (sellerData?.sellerId) {
        const fetchShopProducts = async () => {
            setLoading(true);
            try {
              const productsRef = collection(db, "products");
              const q = query(productsRef, where("sellerId", "==", sellerData.sellerId));
          
              const querySnapshot = await getDocs(q);
          
              // Exclude the current product by filtering it out
              const products = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(product => product.id !== itemId && product.status === "approved" && product.quantity > 0);

          
              setShopProducts(products);
            } catch (error) {
              console.error("Error fetching shop products:", error);
            } finally {
              setLoading(false);
            }
          };
      fetchShopProducts();
    }
}, [sellerData?.sellerId, itemId]); // Add itemId as a dependency

  if (!sellerData) {
    return <div>Loading seller information...</div>; // Show a loading message until sellerData is available
  }

  return (
    <div className="seller-info-container">
      <p className="item-details-title">Shop Details</p>
      <div className="seller-info-content">
        {/* Shop Logo */}
        <img
          src={sellerData?.logo || defaultImage}
          alt="Seller"
          className="about-seller-image"
        />

        {/* Shop Details */}
        <div className="about-seller-details">
        <Link to={user && user.uid === item.sellerId? "/your-shop" : `/shop/${item.shopName}`} className="item-shopname">
            { user && user.uid === item.sellerId ? <p>{user.shopName}</p>: <ShopLink sellerId={item.sellerId} />}
          </Link>

          <p className="about-seller-description">
            {sellerData?.description || "Tell customers about your shop and what makes it special!"}
          </p>

          {/* Social Links */}
          <div className="about-seller-socials">
            <a href={sellerData?.instagram || "#"} target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href={sellerData?.twitter || "#"} target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* More from this shop */}
      <div className="more-from-shop">
        <h3>More from {sellerData?.shopName}</h3>

        {/* Display products or loading message */}
        {loading ? (
          <p>Loading products...</p>
        ) : shopProducts.length > 0 ? (
          <div className="more-shop-items">
            {shopProducts.slice(0,5).map((product) => (
                <Link to={`/item-listing/${product.id}`} key={product.id} className="more-shop-item"
                >
              <img
                src={
                  product.photos && product.photos.length > 0
                    ? product.photos.find((photo) => photo)
                    : null
                }
                alt={product.title || "Item"}
                className="more-shop-item-img"
              />
                  <div className="more-shop-item-desc">
                  <p className="more-shop-item-title">                  {product.title.substring(0, 20)}{product.title.length > 20 ? "..." : ""}</p>
                  <div className="more-shop-item-info">
                  <p className="price">${product.price.toFixed(2)}</p>
                  </div>
                  
                  </div>
                </Link>
            ))}
          </div>
        ) : (
          <p>No other products found from this shop.</p>
        )}
      </div>
    </div>
  );
};