export const Reviews = ({ reviews }) => {
  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">Reviews:</p>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-right">
            <p className="review-name">{review.user}</p>
            <p className="review-rating">★★★★☆</p>
            <p className="review-comment">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );

};
