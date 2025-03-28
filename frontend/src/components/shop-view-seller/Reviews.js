import defaultImage from "./pics/no-image.jpg"; // Default for missing profile pictures

export const Reviews = ({ reviews }) => {
  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">Reviews:</p>
      
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-left">
              <img src={review.image || defaultImage} alt={review.name} className="reviewer-image" />
            </div>
            <div className="review-right">
              <p className="review-name">{review.name}</p>
              <p className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
              <p className="review-comment">{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews-message">You have no reviews yet...</p>
      )}
    </div>
  );
};
