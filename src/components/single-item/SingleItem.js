import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase"; // Firebase configuration file
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore"; // Firestore functions
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
import { AddReview } from "./AddReview";
import { increment, updateDoc } from "firebase/firestore";
import { useRef } from "react";

export const SingleItem = () => {
  const { itemId } = useParams(); // Retrieve itemId from URL params
  const [item, setItem] = useState(null); // Store product data
  const [mainImage, setMainImage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleFavorite } = useFavorites();
  const { user } = useAuth();
  console.log("Current User:", user);
  const [reviews, setReviews] = useState([]);
  const [sellerData, setSellerData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [sortOption, setSortOption] = useState("rating-desc"); // Default: Rating High to Low
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [amount, setAmount] = useState(1); // Track how many units the user wants to buy
  const [stockQuantity, setStockQuantity] = useState();
  const [personalization, setPersonalization] = useState(""); // Track personalization input
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color

  const hasIncrementedRef = useRef(false);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchPurchaseStatus = async () => {
        const hasPurchased = await checkUserPurchased(user.uid, itemId);
        setCanReview(hasPurchased);
      };

      fetchPurchaseStatus();
    }
  }, [user, itemId]);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setIsLoading(true);

      try {
        const docRef = doc(db, "products", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setItem(productData);
          setStockQuantity(productData.quantity);
          setMainImage("");

          if (!hasIncrementedRef.current) {
            hasIncrementedRef.current = true;
            await updateDoc(docRef, {
              views: increment(1),
            });
          }

          if (productData.sellerId) {
            const sellerRef = doc(db, "sellers", productData.sellerId);
            const sellerSnap = await getDoc(sellerRef);

            if (sellerSnap.exists()) {
              setSellerData({
                sellerId: productData.sellerId,
                ...sellerSnap.data(),
              });
            }
          }

          setTimeout(() => {
            setMainImage(productData.photos?.[0]);
          }, 200);

          const reviewsRef = collection(db, "reviews");
          const q = query(reviewsRef, where("itemId", "==", itemId));
          const querySnapshot = await getDocs(q);

          const fetchedReviews = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const sortedReviews = sortReviews(fetchedReviews, sortOption);
          setReviews(sortedReviews);

          if (sortedReviews.length > 0) {
            const totalRating = sortedReviews.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            const avgRating = totalRating / sortedReviews.length;
            setAverageRating(avgRating.toFixed(1));
          } else {
            setAverageRating(null);
          }
        }
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [itemId, sortOption]);
  // Re-fetch when itemId or sortOption changes

  // Sorting Reviews Function
  const sortReviews = (reviews, option) => {
    return reviews.sort((a, b) => {
      switch (option) {
        case "rating-desc":
          return b.rating - a.rating; // Rating High to Low
        case "rating-asc":
          return a.rating - b.rating; // Rating Low to High
        case "date-desc":
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // Date Newest to Oldest
        case "date-asc":
          const dateAAsc = new Date(a.date);
          const dateBAsc = new Date(b.date);
          return dateAAsc - dateBAsc; // Date Oldest to Newest
        default:
          return 0;
      }
    });
  };
  const handleAddToCart = () => {
    if (amount <= stockQuantity) {
      addToCart({
        ...item,
        id: itemId,
        amount,
        personalization,
        selectedColor,
      }); // Pass amount instead of quantity
    } else {
      alert("Not enough stock available.");
    }
  };
  const generateStars = (rating) => {
    if (rating === null) return "No ratings yet"; // Handle case with no reviews

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
  const checkUserPurchased = async (userId, itemId) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    console.log("Query Snapshot:", querySnapshot);

    let hasPurchased = false;
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      console.log("Order Data:", order);

      // Ensure 'products' is an array and contains the 'itemId'
      if (Array.isArray(order.items)) {
        console.log("Order Products:", order.items);
        if (order.items.some((product) => product.id === itemId)) {
          console.log("User has purchased this item:", itemId);
          hasPurchased = true;
        }
      } else {
        console.log("No 'products' array found in the order.");
      }
    });

    return hasPurchased;
  };

  // Loading spinner while fetching data
  if (isLoading || !item) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  const handleReviewAdded = async () => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("itemId", "==", itemId));
        const querySnapshot = await getDocs(q);

        const fetchedReviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    await fetchReviews(); // ✅ Refetch reviews after adding a new one
  };
  // Check seller status
  const isSeller = user && user.uid === item.sellerId;
  console.log("Is Seller:", isSeller);

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
              <button
                className="arrow-switch left"
                onClick={() => setStartIndex(startIndex - 1)}
              >
                &#9664;
              </button>
              <div className="thumbnails">
                {item.photos
                  .slice(startIndex, startIndex + 3)
                  .map((src, index) => (
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
              <button
                className="arrow-switch right"
                onClick={() => setStartIndex(startIndex + 1)}
              >
                &#9654;
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h2>{item.title}</h2>
            <div className="stars-3">
              {generateStars(averageRating)}{" "}
              {averageRating !== null && (
                <span className="rating">- {averageRating}</span>
              )}
            </div>

            {/* Seller Info */}
            <Link
              to={
                user && user.uid === item.sellerId
                  ? "/your-shop"
                  : `/shop/${item.shopName}`
              }
              className="item-shopname"
            >
              {user && user.uid === item.sellerId ? (
                <p>{user.shopName}</p>
              ) : (
                <ShopLink sellerId={item.sellerId} />
              )}
            </Link>
            <p className="price">${item.price.toFixed(2)}</p>

            {/* Options */}
            <div className="options">
              <label>Size</label>
              <p>
                {item.height}cm x {item.width}cm
              </p>

              <label>Color</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {item.primaryColour && (
                  <option value={item.primaryColour}>
                    {item.primaryColour}
                  </option>
                )}
                {item.secondaryColour && (
                  <option value={item.secondaryColour}>
                    {item.secondaryColour}
                  </option>
                )}
              </select>

              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={amount} // Controlled input for amount
                onChange={(e) =>
                  setAmount(Math.min(Number(e.target.value), stockQuantity))
                } // Limit to available stock
              />

              {item.customized && (
                <>
                  <label>Personalization</label>
                  <input
                    type="text"
                    value={personalization} // Controlled input
                    onChange={(e) => setPersonalization(e.target.value)} // Update personalization state
                    placeholder="Enter personalized text"
                  />
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="buttons">
              {user && user.uid === item.sellerId ? (
                <>
                  <Link to={`/edit-product/${itemId}`} className="add-to-cart">
                    Edit
                  </Link>
                  <Link
                    to={`/item-statistics/${itemId}`}
                    className="add-to-fav"
                  >
                    Stats
                  </Link>
                </>
              ) : (
                <>
                  {stockQuantity === 0 ? (
                    <button className="add-to-cart out-of-stock" disabled>
                      Out of Stock
                    </button>
                  ) : (
                    <button className="add-to-cart" onClick={handleAddToCart}>
                      Add To Cart
                    </button>
                  )}

                  <button
                    className="add-to-fav"
                    onClick={() => toggleFavorite({ ...item, id: itemId })}
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
            <SellerInfo
              item={item}
              user={user}
              sellerData={sellerData}
              itemId={itemId}
            />
          </div>
        </div>
      </AnimatedSection2>
      <AnimatedSection2 itemId={itemId}>
        <div className="item-details">
          <p className="item-details-title">Customer Reviews</p>

          {/* Sorting Controls */}
          <div className="sorting-options">
            <label>Sort by: </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="date-desc">Date: Newest to Oldest</option>
              <option value="date-asc">Date: Oldest to Newest</option>
            </select>
          </div>

          {/* Reviews */}
          <div>
            {reviews.length > 0 ? (
              reviews.slice(0, visibleReviews).map((review) => (
                <div key={review.id} className="review">
                  <div className="review-header">
                    <strong className="review-username">
                      {review.username}
                    </strong>
                    <div className="review-rating">
                      {generateStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {/* Display multiple images if available */}
                  {review.imageUrls && review.imageUrls.length > 0 && (
                    <div className="review-images">
                      {review.imageUrls.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Review ${index + 1}`}
                          className="review-image"
                          onClick={() => setSelectedImage(imageUrl)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave one!</p>
            )}
          </div>

          {/* Show More Button */}
          {visibleReviews < reviews.length && (
            <button
              className="show-more-btn"
              onClick={() => setVisibleReviews(visibleReviews + 3)}
            >
              Show More (+{Math.min(3, reviews.length - visibleReviews)})
            </button>
          )}

          {/* Pop-up Modal for Image */}
          {selectedImage && (
            <div className="image-popup" onClick={() => setSelectedImage(null)}>
              <div className="popup-content">
                <img src={selectedImage} alt="Expanded Review" />
              </div>
            </div>
          )}

          {user && canReview ? (
            <AddReview itemId={itemId} onReviewAdded={handleReviewAdded} />
          ) : (
            <p>You need to purchase this item before you can leave a review.</p>
          )}
        </div>
      </AnimatedSection2>

      <AnimatedSection2 itemId={itemId}>
        <Footer />
      </AnimatedSection2>
    </div>
  );
};
