import search_icon from "./pictures/material-symbols_search.png";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const SearchBar = () => {
  const [queryText, setQueryText] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [sellerResults, setSellerResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      if (!queryText.trim()) {
        setProductResults([]);
        setSellerResults([]);
        return;
      }

      const searchLower = queryText.toLowerCase();

      try {
        const [productSnap, sellerSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "sellers")),
        ]);

        // Update filter logic to use includes for partial matching
        const filteredProducts = productSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (p) =>
              p.status === "approved" &&
              p.title?.toLowerCase().includes(searchLower) // Changed to includes()
          );

        const filteredSellers = sellerSnap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((s) =>
            s.shopName?.toLowerCase().includes(searchLower) // Changed to includes()
          );

        setProductResults(filteredProducts.slice(0, 5));
        setSellerResults(filteredSellers.slice(0, 5));
        setIsDropdownOpen(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    search();
  }, [queryText]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewAll = () => {
    navigate(`/search?query=${encodeURIComponent(queryText)}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="search-container" ref={containerRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search products or shops..."
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
        onFocus={() => (productResults.length > 0 || sellerResults.length > 0) && setIsDropdownOpen(true)}
      />
      <button className="search-btn-icon" onClick={handleViewAll}>
        <img src={search_icon} alt="search" />
      </button>

      {isDropdownOpen && (productResults.length > 0 || sellerResults.length > 0) && (
        <div className="search-dropdown">
          {productResults.length > 0 && (
            <div className="result-group">
              <div className="result-header">🛒 Products</div>
              {productResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/item-listing/${item.id}`}
                  className="search-result-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <img
                    src={item.photos?.[0] || "https://via.placeholder.com/40"}
                    alt={item.title}
                    className="result-thumb"
                  />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          )}

          {sellerResults.length > 0 && (
            <div className="result-group">
              <div className="result-header">🏪 Sellers</div>
              {sellerResults.map((seller) => (
                <Link
                  key={seller.id}
                  to={`/shop/${seller.shopName}`}
                  className="search-result-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span>{seller.shopName}</span>
                </Link>
              ))}
            </div>
          )}

          <div className="view-all" onClick={handleViewAll}>
            🔍 View all results for <strong>"{queryText}"</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
