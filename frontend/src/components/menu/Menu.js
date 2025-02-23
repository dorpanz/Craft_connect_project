import './Menu.css';
import liked_goods from "./pictures/mdi_heart-outline.png";
import basket from "./pictures/Vector.png";
import search_icon from "./pictures/material-symbols_search.png";
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 
import { useFavorites } from '../../context/FavoritesContext'; 
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Menu = () => {
    const { cart } = useCart(); 
    const { favorites } = useFavorites(); 
    const { user, role, loading } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState("Account");
  
    useEffect(() => {
      if (user) {
        setDisplayName(role === "seller" ? user.shopName || "Shop" : user.username || "Account");
      } else {
        setDisplayName("Account");
      }
    }, [user, role]);
    return (
        <div>
            <div className="menu">
                <Link to="/" className='logo'>CRAFT CONNECT</Link>
                <li className="input_search">
                    <input placeholder="Search" />
                    <button className="search-btn"><img src={search_icon} alt="search"/></button>
                </li>
                {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <Link to={role === "seller" ? "/your-shop-dashboard" : "/account-settings-user"} className="menu-personal">
              {displayName}
            </Link>
            {role !== "seller" && (
              <Link to="/start-selling" className="menu-personal">START SELLING</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/start-selling" className="menu-personal">START SELLING</Link>
            <Link to="/user-login" className="menu-personal">ACCOUNT</Link>
          </>
        )}
                <Link to="/favorites" className="menu-personal">
                    <img src={liked_goods} alt='liked goods' className="menu-personal-img-liked"/>
                    {favorites.length > 0 && <span className="fav-count">{favorites.length}</span>}
                </Link>
                <Link to="/cart" className="menu-personal">
                    <img src={basket} alt='basket' className="menu-personal-img-basket"/>
                    {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </Link>
            </div>
        </div>
    );
};

export default Menu;
