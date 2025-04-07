import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Menu from "../menu/Menu";
import defaultpic from "../category-page/pics/shirt.jpg";
import './Menu.css'
import Footer from "../footer/Foooter"; 
import { useCart } from "../../context/CartContext";
import imagedefault from "./pictures/avatar.png"
import { AnimatedSection2 } from "../animation/AnimtedSection2";
import { AnimatedSection } from "../animation/AnimatedSection";
const SearchResultsPage = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("query") || "";
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      const searchLower = queryParam.toLowerCase();
      const fetchedProducts = [];
      const fetchedSellers = [];

      try {
        const productSnap = await getDocs(collection(db, "products"));
        const sellerSnap = await getDocs(collection(db, "sellers"));

        // Loop through products and fetch reviews for each product
        for (const doc of productSnap.docs) {
          const productData = doc.data();

          // Apply the search filter to product title
          if (productData.title?.toLowerCase().includes(searchLower) ) {
            const productReviewsRef = collection(db, "reviews");
            const reviewsQuery = query(
              productReviewsRef,
              where("itemId", "==", doc.id)
            );

            const reviewsSnapshot = await getDocs(reviewsQuery);
            const reviews = reviewsSnapshot.docs.map((reviewDoc) =>
              reviewDoc.data()
            );

            // Calculate average rating for the product
            const totalRating = reviews.reduce(
              (acc, review) => acc + review.rating,
              0
            );
            const averageRating =
              reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

            if (productData.status === "approved") {
              fetchedProducts.push({
                id: doc.id,
                ...productData,
                reviews,
                average_rating: averageRating,
              });
            }
          }
        }

        // Loop through sellers and fetch reviews for each seller
        for (const doc of sellerSnap.docs) {
          const sellerData = doc.data();

          // Apply the search filter to seller shopName
          if (sellerData.shopName?.toLowerCase().includes(searchLower)) {
            const sellerReviewsRef = collection(db, "reviews");
            const sellerReviewsQuery = query(
              sellerReviewsRef,
              where("shopId", "==", doc.id)
            );

            const sellerReviewsSnapshot = await getDocs(sellerReviewsQuery);
            const sellerReviews = sellerReviewsSnapshot.docs.map((reviewDoc) =>
              reviewDoc.data()
            );

            // Calculate average rating for the seller
            const totalSellerRating = sellerReviews.reduce(
              (acc, review) => acc + review.rating,
              0
            );
            const averageSellerRating =
              sellerReviews.length > 0
                ? (totalSellerRating / sellerReviews.length).toFixed(1)
                : 0;

            fetchedSellers.push({
              id: doc.id,
              ...sellerData,
              averageRating: averageSellerRating,
            });
          }
        }

        setProducts(fetchedProducts);
        setSellers(fetchedSellers);
      } catch (err) {
        console.error("Search error:", err);
      }

      setLoading(false);
    };

    fetchSearchResults();
  }, [queryParam]);

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
    <div>
      <Menu />

      <div className="category-page">
        <div className="category-info">
          <h1>Search results for "{queryParam}"</h1>
        </div>

        {loading ? (
                <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
        ) : (
          <>
            <div className="result-section">
              <AnimatedSection>

              <h2>🛒 Products</h2>
              {products.length > 0 ? (
                <div className="product-list">
                  {products.map((product) => (
                    <div className="all-items-section-list-item">

                    <Link
                      key={product.id}
                      to={`/item-listing/${product.id}`}
                      style={{ textDecoration: "none" }}
                      >
                      <img
                        src={product.photos?.[0] || defaultpic}
                        alt={product.title}
                        className="item-lsiting-img-cat"
                        />
                        </Link>

                    <Link
                      key={product.id}
                      to={`/item-listing/${product.id}`}
                      style={{ textDecoration: "none" }}
                      >
                      <p className="shop-items-section-list-item-title">
                        {product.title.length > 20
                          ? product.title.substring(0, 20) + "..."
                          : product.title}
                      </p>
                          </Link>
                      <span className="stars-2">
                        {generateStars(product.average_rating)}{" "}
                        {product.average_rating && (
                          <span className="rating">- {product.average_rating}</span>
                        )}
                      </span>
                      {/* Display product rating */}
                      <div className="all-items-section-list-item-info">
                    <p className="price">CA${product.price.toFixed(2)}</p>
                    <button
                      className="add-to-cart-2"
                      onClick={() => addToCart(product)}
                      >
                      Add
                    </button>
                      </div>
                  </div>
                  ))}
                </div>
              ) : (
                <p>No products found.</p>
              )}
              </AnimatedSection>
            </div>

            <div className="result-section">
              <AnimatedSection>

              <h2>🏪 Sellers</h2>
              {sellers.length > 0 ? (
                <div className="seller-list">
                  {sellers.map((seller) => (
                    <Link
                      key={seller.id}
                      to={`/shop/${seller.shopName}`}
                      className="search-result-item"
                    >
                                  <img src={seller.logo || imagedefault} alt={seller.shop_name} className="shop-logo" />

                      <div className="seller-info">
                        <p>{seller.shopName}</p>
                        <p>{seller.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>No sellers found.</p>
              )}
        </AnimatedSection>
            </div>
          </>
        )}
      </div>
      <AnimatedSection>

      <Footer/>
      </AnimatedSection>
    </div>
  );
};

export default SearchResultsPage;
