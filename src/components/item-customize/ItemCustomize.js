import { useState } from "react";
import Menu from "../menu/Menu";
import "./ItemCustomize.css";
import img1 from "./images/image.jpg";
import img2 from "./images/image2.jpeg";
import img3 from "./images/image3.jpg";
import img4 from "./images/image4.jpeg";
import img5 from "./images/image.jpg";
import img6 from "./images/image2.jpeg";
import heart from "../menu/pictures/mdi_heart-outline.png";
import { Link } from "react-router-dom";
import Footer from "../footer/Foooter";

const data = {
  title: "Custom Leather Tags for Crochet Items",
  price: "$29.99",
  rating: "★★★★☆",
  reviews: 57,
  seller: {
    name: "Cro4ka",
    products: [
      { title: "Crochet Hook Set", price: "$19.99", img: img1 },
      { title: "Knitting Needles Set", price: "$24.99", img: img2 },
      { title: "Wool Yarn Bundle", price: "$15.99", img: img3 },
    ],
  },
  description:
    "Personalized tags for handmade items, knits, and crochet with rivets. Great gift for knitters and crocheters - washable and easy to use.",
  colors: ["Red", "Green", "Blue"],
  images: [img1, img2, img3, img4, img5, img6],
  details:
    "Customized Crochet Faux Leather Tags, add your name and symbol to these handmade tags to enhance your knitted or crocheted creations with the perfect finishing touch. Size: 2.85 x 0.55 inches (7.25x1.4cm). Material: Faux leather - 1mm thickness. Color: Choose when adding to the cart, black fabric on the back. Personalization: Please add a note with your text, we can write anything as long as it is short, to ensure readability. We can also use logos! Rivets: your order comes with Bronze Rivets. The size of the Snap Rivets is 6mm.",
  reviewsData: [
    {
      id: 1,
      name: "Anna Smith",
      rating: "★★★★★",
      reviewText: "Great quality and fast shipping! Perfect for my crochet items.",
      userImage: img1,
      date: "2025-02-01",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      name: "John Doe",
      rating: "★★★★☆",
      reviewText: "Good product, but it took a while to arrive. Worth the wait!",
      userImage: img2,
      date: "2025-02-05",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      name: "Jane Doe",
      rating: "★★★★★",
      reviewText: "I love these tags! They add the perfect touch to my handmade scarves.",
      userImage: img3,
      date: "2025-02-07",
      likes: 0,
      dislikes: 0,
    },
  ],
};

export const ItemCustomize = () => {
  const [mainImage, setMainImage] = useState(data.images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [reviewsData, setReviewsData] = useState(data.reviewsData);

  const nextImages = () => {
    if (startIndex + 3 < data.images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevImages = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const toggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  const sortReviews = (option) => {
    let sortedReviews;
    if (option === "date") {
      sortedReviews = [...data.reviewsData].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (option === "rating") {
      sortedReviews = [...data.reviewsData].sort((a, b) => b.rating - a.rating);
    }
    return sortedReviews;
  };

  const handleLike = (id) => {
    setReviewsData((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };

  const handleDislike = (id) => {
    setReviewsData((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, dislikes: review.dislikes + 1 }
          : review
      )
    );
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="item-customize">
      <Menu />
      <div className="item-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          {/* Big Image */}
          <img className="big-image" src={mainImage} alt="Main Product" />

          {/* Small Images with Arrows */}
          <div className="thumbnail-container">
            <button className="arrow-switch left" onClick={prevImages}>
              &#9664;
            </button>
            <div className="thumbnails">
              {data.images.slice(startIndex, startIndex + 3).map((src, index) => (
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
        <div className="product-details">
          <h2>{data.title}</h2>
          <div className="rating">{data.rating}</div>
          <p className="price">{data.price}</p>

          {/* Seller Info */}
          <div className="seller-info">
            <p className="seller-name">{data.seller.name}</p>
          </div>

          {/* Description */}
          <p className="description">{data.description}</p>

          {/* Options */}
          <div className="options">
            <label>Size</label>
            <select>
              <option>One size</option>
            </select>

            <label>Color</label>
            <select>
              {data.colors.map((color, index) => (
                <option key={index}>{color}</option>
              ))}
            </select>

            <label>Personalization</label>
            <textarea placeholder="Enter your text here"></textarea>

            <label>Quantity</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          {/* Action Buttons */}
          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="add-to-fav">
              <img src={heart} className="cart-add" />
            </button>
          </div>
        </div>
      </div>

      {/* Item Details Section with See More / See Less */}
      <div className="item-details">
        <p className="item-details-title">Item Details</p>
        <div>
          <p>
            {isDetailsExpanded
              ? data.details
              : `${data.details.substring(0, 150)}...`}
          </p>
          <button className="see-more-less" onClick={toggleDetails}>
            {isDetailsExpanded ? "See Less" : "See More"}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-item-section">
        <p className="reviews-title">{data.reviews} Reviews</p>
        <div className="sort-options">
          <label>Sort By:</label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="date">Date (Newest to Oldest)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
        <div className="reviews-list">
          {sortReviews(sortOption).map((review) => (
            <div className="review-item-single" key={review.id}>
              <div className="review-text">
                <div>
                  <p className="review-name">{review.name}</p>
                  <p className="review-rating">{review.rating}</p>
                  <p className="review-message">{review.reviewText}</p>
                  <p className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <img
                    className="review-user-image"
                    src={review.userImage}
                    alt={review.name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More from this Seller Section */}
      <div className="more-from-seller">
        <p className="more-from-seller-title">More from this Seller</p>
        <div className="more-products">
          {data.seller.products.map((product, index) => (
            <div className="product-card-more" key={index}>
              <img src={product.img} alt={product.title} />
              <p>{product.title}</p>
              <p className="product-price-more">{product.price}</p>
              <Link to="#" className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Items You Might Like Section */}
      <div className="more-from-seller">
        <p className="more-from-seller-title">Items you might like</p>
        <div className="more-products">
          {data.seller.products.map((product, index) => (
            <div className="product-card-more" key={index}>
              <img src={product.img} alt={product.title} />
              <p>{product.title}</p>
              <p className="product-price-more">{product.price}</p>
              <Link to="#" className="view-details">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};
