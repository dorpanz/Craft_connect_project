import React, { useEffect, useState, useContext } from "react";
import "../user-account-settings/LoginSecurity.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AuthContext } from "../../context/AuthContext";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

const LoginSecurityShop = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    newsletterSubscribed: false,
    streetAddress: "",
    city: ""
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
          const data = sellerSnap.data();
          setFields({
            email: data.email || "",
            newsletterSubscribed: data.newsletterSubscribed || false,
            streetAddress: data.streetAddress || "",
            city: data.city || ""
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
        newsletterSubscribed: fields.newsletterSubscribed,
        streetAddress: fields.streetAddress,
        city: fields.city
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating:", error);
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmDelete) return;

    try {
      // Delete from Firestore 'sellers' collection
      await deleteDoc(doc(db, "sellers", user.uid));

      // Delete from Firebase Auth
      await deleteUser(auth.currentUser);

      alert("Your account has been deleted.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Account deletion failed. Please re-authenticate and try again.");
    }
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

          <label>Address:</label>
          <input type="text" name="streetAddress" value={fields.streetAddress} onChange={handleInputChange} />

          <div className="newsletter-container">
            <label>Newsletter Subscription:</label>
            <div className="newsletter-checkbox">
              <input type="checkbox" name="newsletterSubscribed" checked={fields.newsletterSubscribed} onChange={handleInputChange} />
              <span>Yes</span>
            </div>
          </div>

          <label>City:</label>
          <input type="text" name="city" value={fields.city} onChange={handleInputChange} />
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label>Confirm New Password:</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

          <div className="button-container">
            <button onClick={handleSave} disabled={loading} className="save-button">
              {loading ? "Saving..." : "SAVE"}
            </button>
          </div>
        </div>

        <div className="logout-section">
          <button onClick={logout} className="logout-button">LOGOUT</button>
          <button onClick={handleDeleteAccount} className="delete-account-button">DELETE ACCOUNT</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSecurityShop;
