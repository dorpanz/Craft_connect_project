import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase"; // Firebase configuration file
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import Footer from "../footer/Foooter"; // Fixed typo in Footer import
import Menu from "../menu/Menu";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./single-item.css";
import { ShopLink } from "./ShopLink";
import { SellerInfo } from "./SellerInfo"; // Assuming SellerInfo is implemented correctly
import { useAuth } from "../../context/AuthContext";
import { AnimatedSection2 } from "../animation/AnimtedSection2";
import { motion } from "framer-motion";

export const SingleItem = () => {
  const { itemId } = useParams(); // Retrieve itemId from URL params
  const [item, setItem] = useState(null); // Store product data
  const [mainImage, setMainImage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
  const { user } = useAuth();
  console.log("Current User:", user);
  
  const [sellerData, setSellerData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  // Fetch product and seller data from Firestore
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  useEffect(() => {
    setIsLoading(true); // 🛑 Start loading before fetching

    const fetchItem = async () => {
      try {
        const docRef = doc(db, "products", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setItem(productData);
          setMainImage(""); // 👈 Reset image to avoid flicker
          
          // Fetch seller data
          if (productData.sellerId) {
            const sellerRef = doc(db, "sellers", productData.sellerId);
            const sellerSnap = await getDoc(sellerRef);

            if (sellerSnap.exists()) {
              setSellerData({ sellerId: productData.sellerId, ...sellerSnap.data() });
            }
          }

          setTimeout(() => { 
            setMainImage(productData.photos?.[0]); 
            setIsLoading(false); // ✅ Stop loading after image is set
          }, 200); // Slight delay for smooth transition
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item || isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  

  // Check seller status
  const isSeller = user && user.uid === item.sellerId;
  console.log("Is Seller:", isSeller);

  const nextImages = () => {
    if (startIndex + 3 < item.photos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevImages = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };


  const generateStars = (rating) => {
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
    <div className="item-customize">
      <Menu />
      <AnimatedSection2 itemId={itemId}>
      <div className="item-container">
          {/* Image Gallery */}
          <div className="image-gallery">
            <motion.img
              key={mainImage} // 🚀 Force re-animation when mainImage changes
              className="big-image"
              src={mainImage}
              alt="Main Product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }} // 🌀 Smooth fade-in
            />

            {/* Small Images */}
            <div className="thumbnail-container">
              <button className="arrow-switch left" onClick={() => setStartIndex(startIndex - 1)}>
                &#9664;
              </button>
              <div className="thumbnails">
                {item.photos.slice(startIndex, startIndex + 3).map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index}`}
                    className={src === mainImage ? "active-thumbnail" : ""}
                    onClick={() => setMainImage(src)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }} // 🌀 Smooth fade-in
                  />
                ))}
              </div>
              <button className="arrow-switch right" onClick={() => setStartIndex(startIndex + 1)}>
                &#9654;
              </button>
            </div>
          </div>

        {/* Product Details */}
        <div className="product-details">
          <h2>{item.title}</h2>
          <div className="stars-2">
            {generateStars(item.average_rating)}{" "}
            <span className="rating">- {item.average_rating}</span>
          </div>

          {/* Seller Info */}
          <Link to={user && user.uid === item.sellerId? "/your-shop" : `/shop/${item.shopName}`} className="item-shopname">
            { user && user.uid === item.sellerId ? <p>{user.shopName}</p>: <ShopLink sellerId={item.sellerId} />}
          </Link>
          <p className="price">${item.price.toFixed(2)}</p>

          {/* Options */}
          <div className="options">
            <label>Size</label>
            <p>
              {item.height}cm x {item.width}cm
            </p>

            <label>Color</label>
            <select>
              {item.primaryColour && <option>{item.primaryColour}</option>}
              {item.secondaryColour && <option>{item.secondaryColour}</option>}
            </select>

            <label>Quantity</label>
            <input type="number" min="1" defaultValue="1" />

            {item.customized && (
              <>
                <label>Personalization</label>
                <input type="text" placeholder="Enter personalized text" />
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="buttons">
            {isSeller ? (
              <>
                <Link to={`/edit-product/${itemId}`} className="add-to-cart">
                  Edit
                </Link>
                <Link to={`/stats/${itemId}`} className="add-to-fav">
                  Stats
                </Link>
              </>
            ) : (
              <>
                <button className="add-to-cart" onClick={() => addToCart(item)}>
                  Add To Cart
                </button>
                <button
                  className="add-to-fav"
                  onClick={() => toggleFavorite(item)}
                >
                  Favorite
                </button>
              </>
            )}
          </div>
        </div>
      </div>
            </AnimatedSection2>
      {/* Item Details Section with See More / See Less */}
      <AnimatedSection2 itemId={itemId}>

      <div className="item-details">
        <p className="item-details-title">Item Details</p>
        <div>
          <span>
            <p className="description">{item.description}</p>
          </span>
        </div>
      </div>
      </AnimatedSection2>
<AnimatedSection2 itemId={itemId}>

      {/* Seller Info */}
      <div className="item-details">
        <div>
          <SellerInfo sellerData={sellerData} itemId={itemId} />
        </div>
      </div>
</AnimatedSection2>
<AnimatedSection2 itemId={itemId}>
      <Footer />

</AnimatedSection2>
    </div>
  );
};
