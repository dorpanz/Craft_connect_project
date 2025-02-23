import { useState } from "react";
import reviewer1Image from "../shop-view-seller/pics/candleitem.jpg"; 
import reviewer2Image from "../shop-view-seller/pics/candleitem.jpg";
import itemImage1 from "../shop-view-seller/pics/candleitem.jpg"; 
import itemImage2 from "../shop-view-seller/pics/candleitem.jpg"; 

export const AllReviews = () => {
  const [sortOption, setSortOption] = useState("date"); 
  const [visibleReviews, setVisibleReviews] = useState(2); 

  const reviews = [
    {
      name: "Mary Pond",
      rating: 5,
      comment:
        "Lovely Bear with great craftsmanship! These ornaments are absolutely stunning! The handcrafted details and high-quality materials make them feel so special. They're lightweight but sturdy, and the designs are just the right mix of classic and modern. I also love that they're made with sustainable materials—it's a great touch. Highly recommend to anyone looking to elevate their holiday decorations!",
      image: reviewer1Image,
      itemImages: [itemImage1, itemImage2],
      date: "2025-02-06",
    },
    {
      name: "Aisha",
      rating: 4,
      comment:
        "Perfect for a cozy occasion! I really love the designs and the eco-friendly materials used in this set. The glitter adds a beautiful sparkle to my tree, and the packaging was perfect for gifting. My only reason for giving 4 stars instead of 5 is that one of the ornaments had a slight paint smudge, but it's not very noticeable. Overall, a great addition to my holiday decor!",
      image: reviewer2Image,
      itemImages: [itemImage1],
      date: "2025-02-05",
    },
    {
      name: "John Doe",
      rating: 5,
      comment:
        "Absolutely loved these decorations! The quality is exceptional, and they bring so much charm to my space. It's clear a lot of care went into creating these items, and they make a fantastic gift as well. I will definitely be purchasing again next season. Highly recommend!",
      image: reviewer1Image,
      itemImages: [itemImage2],
      date: "2025-02-04",
    },
    {
      name: "Sarah Lee",
      rating: 5,
      comment:
        "A perfect addition to my collection! These ornaments are beautiful and unique, and I love that they are eco-friendly. The craftsmanship is amazing, and they make my Christmas tree feel extra special. Highly recommend for anyone looking to add a touch of charm to their holiday decor!",
      image: reviewer2Image,
      itemImages: [itemImage1, itemImage2],
      date: "2025-02-03",
    },
    {
      name: "Alice Smith",
      rating: 3,
      comment:
        "The product is nice, but one of the items had a small defect. Still, the design is great, and it works well as a decoration.",
      image: reviewer1Image,
      itemImages: [itemImage1],
      date: "2025-02-02",
    },
    
  ];

  
  const sortedReviews = reviews.sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date) - new Date(a.date); 
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
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2); 
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
          <div className="review-card-left">
            <img
              src={review.image}
              alt={`Review by ${review.name}`}
              className="reviewer-image"
            />
          </div>
          <div className="review-card-right">
            <p className="reviewer-name">{review.name}</p>
            <div className="review-rating">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="item-images-container">
              {review.itemImages.map((itemImage, idx) => (
                <img
                  key={idx}
                  src={itemImage}
                  alt={`Item shot ${idx + 1}`}
                  className="item-image"
                />
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
