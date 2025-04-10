import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import Menu from "../menu/Menu"; // Importing the Menu component
import arrow from "../shop-view-seller/pics/arrow.png";
import "./adminDashboard.css";

export const AdminDashboard = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("status", "==", "pending"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPendingProducts(productsList);
        }
      } catch (error) {
        console.error("Error fetching pending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProducts();
  }, []);

  if (loading) return       <div className="loading-container">
  <div className="loading-spinner"></div>
</div>;

  return (
    <div>

      <Menu /> 
    <div className="admin-dashboard">
        <div className="edit-section-title">
          <Link to="/admin/admin-account" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Pending Product Approvals</p>
        </div>
      {pendingProducts.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        <div className="product-list">
          {pendingProducts.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/admin/review-product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                <img src={product.photos[0]} alt={product.title} className="product-img" />
                <div className="product-desc">
                  <p className="product-title" >{product.title.slice(0,25)}...</p>
                  <div className="product-info">
                    <p className="price-admin">CA${product.price.toFixed(2)}</p>
                    
                  </div>
                  <button className="review-btn">Review Product</button>
                </div>
              </Link>
              {/* Link to Seller's Account */}
              <div className="seller-info">
                <p><Link to={`/shop/${product.sellerId}`} className="seller-link">
                  {product.sellerName} {/* Display the seller's shop name here */}
                </Link></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
          </div>
  );
};
