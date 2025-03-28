import React, { useEffect, useState, useContext } from "react";
import "../user-account-settings/LoginSecurity.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AuthContext } from "../../context/AuthContext";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const LoginSecurityShop = () => {
  const { user, logout } = useContext(AuthContext);
  const [fields, setFields] = useState({
    email: "",
    newsletterSubscribed: false
  });
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      const fetchSellerData = async () => {
        const sellerRef = doc(db, "sellers", user.uid);
        const sellerSnap = await getDoc(sellerRef);
        if (sellerSnap.exists()) {
          setFields({
            email: sellerSnap.data().email || "",
            newsletterSubscribed: sellerSnap.data().newsletterSubscribed || false
          });
        }
      };
      fetchSellerData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFields({ ...fields, [name]: type === "checkbox" ? checked : value });
  };

  const reauthenticateSeller = async () => {
    try {
      if (!currentPassword.trim()) {
        alert("Please enter your current password.");
        return false;
      }
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      return true;
    } catch (error) {
      alert("Re-authentication failed. Please check your current password.");
      return false;
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const sellerRef = doc(db, "sellers", user.uid);
      
      if (newPassword || confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          alert("New passwords do not match.");
          setLoading(false);
          return;
        }
        const isAuthenticated = await reauthenticateSeller();
        if (!isAuthenticated) {
          setLoading(false);
          return;
        }
        await updatePassword(auth.currentUser, newPassword);
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
      
      await updateDoc(sellerRef, {
        email: fields.email,
        newsletterSubscribed: fields.newsletterSubscribed
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating:", error);
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Menu />
      <div className="login-security">
        <div className="edit-section-title">
          <Link to="/your-shop-dashboard" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Login and Security</p>
        </div>

        <div className="login-sec-card">
          <label>Email:</label>
          <input type="email" name="email" value={fields.email} onChange={handleInputChange} />
          <div className="newsletter-container">
            <label>Newsletter Subscription:</label>
            <div className="newsletter-checkbox">
              <input type="checkbox" name="newsletterSubscribed" checked={fields.newsletterSubscribed} onChange={handleInputChange} />
              <span>Yes</span>
            </div>
          </div>


          {/* Password Update Fields */}
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label>Confirm New Password:</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

          {/* Save Button */}
          <div className="button-container">
            <button onClick={handleSave} disabled={loading} className="save-button">
              {loading ? "Saving..." : "SAVE"}
            </button>
          </div>
        </div>

        {/* Separate Logout Section */}
        <div className="logout-section">
          <button onClick={logout} className="logout-button">LOGOUT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSecurityShop;