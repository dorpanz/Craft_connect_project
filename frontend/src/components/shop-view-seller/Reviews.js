
import reviewer1Image from "./pics/candleitem.jpg"; // Replace with actual image paths
import reviewer2Image from "./pics/candleitem.jpg";

export const Reviews = () => {
  const reviews = [
    {
      name: "Mary Pond",
      rating: 5,
      comment:
        "Lovely Bear with great craftsmanship! These ornaments are absolutely stunning! The handcrafted details and high-quality materials make them feel so special. They're lightweight but sturdy, and the designs are just the right mix of classic and modern. I also love that they're made with sustainable materials—it's a great touch. Highly recommend to anyone looking to elevate their holiday decorations!",
      image: reviewer1Image,
    },
    {
      name: "Aisha",
      rating: 4,
      comment:
        "Perfect for a cozy occasion! I really love the designs and the eco-friendly materials used in this set. The glitter adds a beautiful sparkle to my tree, and the packaging was perfect for gifting. My only reason for giving 4 stars instead of 5 is that one of the ornaments had a slight paint smudge, but it's not very noticeable. Overall, a great addition to my holiday decor!",
      image: reviewer2Image,
    },
  ];

  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">Reviews:</p>
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-left">
            <img src={review.image} alt={review.name} className="reviewer-image" />
          </div>
          <div className="review-right">
            <p className="review-name">{review.name}</p>
            <p className="review-rating">★★★★☆</p>
            <p className="review-comment">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
