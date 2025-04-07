import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your setup

export const AllReviews = ({ itemId }) => {
  const [sortOption, setSortOption] = useState("date");
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), where("itemId", "==", itemId));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [itemId]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "date") {
      return b.timestamp?.toDate() - a.timestamp?.toDate();
    }
    if (sortOption === "low-to-high") {
      return a.rating - b.rating;
    }
    if (sortOption === "high-to-low") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const reviewsToDisplay = sortedReviews.slice(0, visibleReviews);

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 2);
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <p className="reviews-title">Customer Reviews</p>
        <div className="sort-options">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date">By Date</option>
            <option value="low-to-high">From Low to High Rating</option>
            <option value="high-to-low">From High to Low Rating</option>
          </select>
        </div>
      </div>

      {reviewsToDisplay.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-card-right">
            <p className="reviewer-name">{review.username}</p>
            <div className="review-rating">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="item-images-container">
              {review.imageUrls?.map((url, idx) => (
                <img key={idx} src={url} alt={`Item review ${idx + 1}`} className="item-image" />
              ))}
            </div>
          </div>
        </div>
      ))}

      {visibleReviews < reviews.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};
