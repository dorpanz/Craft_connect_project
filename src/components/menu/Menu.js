import "./Menu.css";
import liked_goods from "./pictures/mdi_heart-outline.png";
import basket from "./pictures/Vector.png";
import search_icon from "./pictures/material-symbols_search.png";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase"; // Firestore import
import { collection, query, where, getDocs } from "firebase/firestore";
import SearchBar from "./SearchBar";
const Menu = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { user, role, loading } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("Account");

  // 🔍 Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (user) {
      if (role === "seller") {
        setDisplayName(user.shopName || "Shop");
      } else if (role === "admin") {
        setDisplayName("Admin");
      } else {
        setDisplayName(user.username || "Account");
      }
    } else {
      setDisplayName("Account");
    }
  }, [user, role]);

  // 🔍 Firestore search function (Live Search)
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]); // Clear results if query is empty
        return;
      }

      try {
        const searchLower = searchQuery.toLowerCase(); // Convert query to lowercase

        // Query for products (case-sensitive)
        const productsQuery = query(
          collection(db, "products"),
          where("name", ">=", searchLower),
          where("name", "<=", searchLower + "\uf8ff")
        );

        // Query for sellers (case-sensitive)
        const sellersQuery = query(
          collection(db, "sellers"),
          where("shopName", ">=", searchQuery),
          where("shopName", "<=", searchQuery + "\uf8ff")
        );

        const [productsSnapshot, sellersSnapshot] = await Promise.all([
          getDocs(productsQuery),
          getDocs(sellersQuery),
        ]);

        const products = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "product",
        }));

        const sellers = sellersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "seller",
        }));

        setSearchResults([...products, ...sellers]);
        console.log("Search Results:", [...products, ...sellers]); // Debugging
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    handleSearch();
  }, [searchQuery]); // 🔹 Runs automatically when user types

  return (
    <div>
      <div className="menu">
        <Link to="/" className="logo">CRAFT CONNECT</Link>

        <div className="searchbar-cont-comp">
        <SearchBar/>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <Link to={role === "seller" ? "/your-shop-dashboard" : role === "admin" ? "/admin/admin-account" : "/account-settings-user"} className="menu-personal">
              {displayName}
            </Link>
            {role !== "seller" && role !== "admin" && (
              <Link to="/start-selling" className="menu-personal">START SELLING</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/start-selling" className="menu-personal">START SELLING</Link>
            <Link to="/user-login" className="menu-personal">ACCOUNT</Link>
          </>
        )}

{role !== "seller" && (
          <>
            <Link to="/favorites" className="menu-personal">
              <img
                src={liked_goods}
                alt="liked goods"
                className="menu-personal-img-liked"
              />
              {favorites.length > 0 && (
                <span className="fav-count">{favorites.length}</span>
              )}
            </Link>
            <Link to="/cart" className="menu-personal">
              <img
                src={basket}
                alt="basket"
                className="menu-personal-img-basket"
              />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </Link>
          </>
        )}
      </div>

      {/* 🔍 Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <Link
              key={result.id}
              to={result.type === "product" ? `/product/${result.id}` : `/shop/${result.id}`}
              className="search-item"
            >
              {result.type === "product" ? `🛒 ${result.name}` : `🏪 ${result.shopName}`}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
