import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { Link } from "react-router-dom";
import './CustomizePage.css'
import custom from "./pics/custom.jpg"
import { AnimatedSection } from "../animation/AnimatedSection";
export const CustomizePage = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Recently-listed");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("customized", "==", true));


        const querySnapshot = await getDocs(q);
        const fetchedProducts = [];
        
        for (const doc of querySnapshot.docs) {
          const productData = doc.data();

          if (productData.status === "approved" && productData.quantity > 0) {
            const productReviewsRef = collection(db, "reviews");
            const reviewsQuery = query(productReviewsRef, where("itemId", "==", doc.id));
            const reviewsSnapshot = await getDocs(reviewsQuery);
            const reviews = reviewsSnapshot.docs.map((reviewDoc) => reviewDoc.data());
        
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
        
            fetchedProducts.push({
              id: doc.id,
              ...productData,
              createdAt: productData.createdAt?.toDate(),
              reviews,
              average_rating: averageRating,
            });
          }
        }
        

        setFilteredItems(fetchedProducts);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  // Sorting logic
  const sortedProducts = [...filteredItems].sort((a, b) => {
    if (sortOrder === "Recently-listed") return b.createdAt - a.createdAt;
    if (sortOrder === "Highest-price") return b.price - a.price;
    if (sortOrder === "Lowest-price") return a.price - b.price;
    return 0;
  });

  // Generate star rating display
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
      <div className="custom-page">
        <AnimatedSection>

      <div
  className="category-info"
  style={{
    backgroundImage: `url(${custom})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <h1 className="category-title">🎨 Customized Items</h1>
  <p className="category-description">
    Discover one-of-a-kind, tailor-made pieces crafted just for you. From custom jewelry to personalized decor—every item tells a story.
  </p>
  <div className="category-stats">
    <i className="fa fa-heart"></i>
    <span>{filteredItems.length} items crafted with love</span>
  </div>
</div>
  </AnimatedSection>

<AnimatedSection>

        <div className="sort">
          <p>Sort By</p>
          <input
            type="radio"
            id="recently-listed"
            name="sorts"
            value="Recently-listed"
            checked={sortOrder === "Recently-listed"}
            onChange={() => setSortOrder("Recently-listed")}
            />
          <label htmlFor="recently-listed">Recently listed</label>

          <input
            type="radio"
            id="highest-price"
            name="sorts"
            value="Highest-price"
            checked={sortOrder === "Highest-price"}
            onChange={() => setSortOrder("Highest-price")}
            />
          <label htmlFor="highest-price">Highest price</label>

          <input
            type="radio"
            id="lowest-price"
            name="sorts"
            value="Lowest-price"
            checked={sortOrder === "Lowest-price"}
            onChange={() => setSortOrder("Lowest-price")}
            />
          <label htmlFor="lowest-price">Lowest price</label>
        </div>

        </AnimatedSection>
        <AnimatedSection>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="product-list">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div key={product.id} className="all-items-section-list-item">
                  <div className="heart-icon-container">
                    <i className="fa fa-heart heart-icon"></i>
                  </div>
                  <Link to={`/item-listing/${product.id}`} style={{ textDecoration: "none" }}>
                    <img
                      src={product.photos?.[0] || "/pics/no-image.jpg"}
                      alt={product.title || "Item"}
                      className="item-lsiting-img-cat"
                      />
                  </Link>

                  <div className="all-items-section-list-item-desc">
                    <Link to={`/item-listing/${product.id}`} style={{ textDecoration: "none" }}>
                      <p className="shop-items-section-list-item-title">
                        {product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title}
                      </p>
                    </Link>

                    <div className="rating">
                      {generateStars(product.average_rating)}
                      {product.average_rating > 0 && <span> - {product.average_rating}</span>}
                    </div>

                    <div className="all-items-section-list-item-info">
                      <p className="price">CA${product.price.toFixed(2)}</p>
                      <button className="add-to-cart-2">Add</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No customized products found.</p>
            )}
          </div>
        )}

        </AnimatedSection>
        <AnimatedSection>
          
        <Footer />
        </AnimatedSection>
      </div>
    </div>
  );
};
