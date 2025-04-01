import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import candleall from "./pics/candleall.jpg";

export const ItemsListingSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">All Items:</p>

      {products.length > 0 ? (
        <div className="shop-items-section-list-all">
          {products.map((product) => (
            <Link
              to={`/item-listing/${product.id}`}
              key={product.id}
              className="all-items-section-list-item"
            >
              <img
                src={
                  product.photos && product.photos.length > 0
                    ? product.photos.find((photo) => photo)
                    : candleall
                }
                alt={product.title || "Item"}
                className="all-items-section-list-item-img"
              />

              <div className="all-items-section-list-item-desc">
                <p className="shop-items-section-list-item-title">
                  {product.title || "Untitled Product"}
                </p>
                <div className="stars-2">★★★★☆</div>
                <div className="all-items-section-list-item-info">
                  <p className="price">${product.price.toFixed(2) || "N/A"}</p>
                  <Link
                    to={`/edit-product/${product.id}`}
                    className="edit-item-btn"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/item-statistics/${product.id}`}
                    className="stats-item-btn"
                  >
                    Stats
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products uploaded yet.</p>
      )}
    </div>
  );
};
