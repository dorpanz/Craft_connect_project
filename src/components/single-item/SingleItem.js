import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase"; // Firebase configuration file
import { doc, getDoc,collection, addDoc, serverTimestamp,query, where, getDocs, orderBy } from "firebase/firestore"; // Firestore functions
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
  // Fetch product and seller data from Firestore
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setIsLoading(true); // Start loading
  
      try {
        // Fetch Product Data
        const docRef = doc(db, "products", itemId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setItem(productData);
          setMainImage(""); // Reset image to avoid flicker
  
          // Fetch Seller Data
          if (productData.sellerId) {
            const sellerRef = doc(db, "sellers", productData.sellerId);
            const sellerSnap = await getDoc(sellerRef);
  
            if (sellerSnap.exists()) {
              setSellerData({ sellerId: productData.sellerId, ...sellerSnap.data() });
            }
          }
  
          setTimeout(() => {
            setMainImage(productData.photos?.[0]); // Smooth image transition
          }, 200);
  
          // Fetch Reviews for the Product
          const reviewsRef = collection(db, "reviews");
          const q = query(reviewsRef, where("itemId", "==", itemId));
          const querySnapshot = await getDocs(q);
  
          const fetchedReviews = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          // Sort reviews based on selected option
          const sortedReviews = sortReviews(fetchedReviews, sortOption);
          setReviews(sortedReviews);
  
          // Calculate average rating
          if (sortedReviews.length > 0) {
            const totalRating = sortedReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / sortedReviews.length;
            setAverageRating(avgRating.toFixed(1)); // Rounded to 1 decimal place
          } else {
            setAverageRating(null); // No reviews yet
          }
        }
  
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProductAndReviews(); // Execute the combined fetch
  
  }, [itemId, sortOption]); // Re-fetch when itemId or sortOption changes
  
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
  
        const fetchedReviews = querySnapshot.docs.map(doc => ({
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
          <div className="stars-3">
  {generateStars(averageRating)}{" "}
  {averageRating !== null && <span className="rating">- {averageRating}</span>}
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

<div className="item-details">
  <p className="item-details-title">Customer Reviews</p>

  {/* Sorting Controls */}
  <div className="sorting-options">
    <label>Sort by: </label>
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
            <strong className="review-username">{review.username}</strong>
            <div className="review-rating">{generateStars(review.rating)}</div>
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
    <button className="show-more-btn" onClick={() => setVisibleReviews(visibleReviews + 3)}>
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

  {user && <AddReview itemId={itemId} onReviewAdded={handleReviewAdded} />}
</div>



<AnimatedSection2 itemId={itemId}>
      <Footer />

</AnimatedSection2>
    </div>
  );
};
