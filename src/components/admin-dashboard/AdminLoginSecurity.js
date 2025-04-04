import React, { useContext } from "react";
import "../user-account-settings/LoginSecurity.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AuthContext } from "../../context/AuthContext";

const AdminLoginSecurity = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <Menu />
      <div className="login-security">
        <div className="edit-section-title">
          <Link to="/admin/admin-account" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Admin Login and Security</p>
        </div>

        <div className="login-sec-card">
          {/* Logout Button */}
          <div className="button-container">
            <button onClick={logout} className="logout-button">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLoginSecurity;
