import { Link, useParams } from "react-router-dom";
import Menu from "../menu/Menu";
import CategoryMenu, { categories } from "../main-page/categories/CategoryMenu";
import "./CategoryPage.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions
import { useCart } from "../../context/CartContext";
import defaultpic from "./pics/shirt.jpg";
import { AnimatedSection } from "../animation/AnimatedSection";

const CategoryPage = () => {
  const { categoryName, subCategory, subSubCategory } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 200]); // Default price range
  const [sortOrder, setSortOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products from Firestore based on category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, "products");
        let q = query(productsRef, where("category", "==", categoryName));

        if (subCategory) {
          q = query(q, where("subCategory", "==", subCategory));
        }
        if (subSubCategory) {
          q = query(q, where("subSubCategory", "==", subSubCategory));
        }

        const querySnapshot = await getDocs(q);
        const fetchedProducts = [];

        for (const doc of querySnapshot.docs) {
          const productData = doc.data();
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

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryName, subCategory, subSubCategory]);

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

  // Apply filters
  const filteredProducts = products.filter(
    (product) =>
      product.price >= selectedPriceRange[0] &&
      product.price <= selectedPriceRange[1]
  );

  // Apply sorting
  const sortedProducts = [...filteredProducts];
  if (sortOrder === "Highest-price") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "Lowest-price") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "Recently-listed") {
    sortedProducts.sort(
      (a, b) => new Date(b.listedDate) - new Date(a.listedDate)
    );
  }

  return (
    <div>
      <Menu />
      <CategoryMenu />

      <div className="category-page">
<AnimatedSection>
        <div className="category-info">
          <h1>{categoryName}</h1>
          {subCategory && <h2>{subCategory}</h2>}
          {subSubCategory && <h3>{subSubCategory}</h3>}
        </div>

        <div className="sort">
          <p>Sort By</p>
          <input
            type="radio"
            id="recently-listed"
            name="sorts"
            value="Recently-listed"
            onChange={() => setSortOrder("Recently-listed")}
            />
          <label htmlFor="recently-listed">Recently listed</label>

          <input
            type="radio"
            id="highest-price"
            name="sorts"
            value="Highest-price"
            onChange={() => setSortOrder("Highest-price")}
            />
          <label htmlFor="highest-price">Highest price</label>

          <input
            type="radio"
            id="lowest-price"
            name="sorts"
            value="Lowest-price"
            onChange={() => setSortOrder("Lowest-price")}
            />
          <label htmlFor="lowest-price">Lowest price</label>
        </div>
          </AnimatedSection>

        <div className="product-list">
          {loading ? (
                  <div className="loading-container">
                  <div className="loading-spinner"></div>
                </div>
          ) : sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="all-items-section-list-item">
                <AnimatedSection>

                <div className="heart-icon-container">
                  <i className="fa fa-heart heart-icon"></i>
                </div>
                <Link
                  to={`/item-listing/${product.id}`}
                  style={{ textDecoration: "none" }}
                  >
                  <img
                    src={
                      product.photos && product.photos.length > 0
                      ? product.photos.find((photo) => photo)
                      : defaultpic
                    }
                    alt={product.title || "Item"}
                    className="item-lsiting-img-cat"
                  />
                </Link>

                <div className="all-items-section-list-item-desc">
                  <Link
                    to={`/item-listing/${product.id}`}
                    style={{ textDecoration: "none" }}
                    >
                    <p className="shop-items-section-list-item-title">
                      {product.title.length > 30
                        ? product.title.substring(0, 20) + "..."
                        : product.title}
                    </p>
                  </Link>

                  <span className="stars-2">
                    {generateStars(product.average_rating)}{" "}
                    {product.average_rating !== null && (
                      <span className="rating">- {product.average_rating}</span>
                    )}
                  </span>

                  <div className="all-items-section-list-item-info">
                    <p className="price">CA${product.price.toFixed(2)}</p>
                    <button
  className="add-to-cart-2"
  onClick={() => addToCart({ ...product, amount: 1 })}
>
  Add
</button>

                  </div>
                </div>
                      </AnimatedSection>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
