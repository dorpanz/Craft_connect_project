import React, { useEffect, useState, useContext } from "react";
import "./LoginSecurity.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AuthContext } from "../../context/AuthContext";
import { db, auth } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const LoginSecurity = () => {
  const { user, logout } = useContext(AuthContext);
  const [fields, setFields] = useState({ name: "", email: "", mobile: "" });
  const [loading, setLoading] = useState(false);
  
  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFields({
            name: userSnap.data().username || "",
            email: userSnap.data().email || "",
            mobile: userSnap.data().mobile || "",
          });
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const reauthenticateUser = async () => {
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
      const userRef = doc(db, "users", user.uid);
      
      // Update password if provided
      if (newPassword || confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          alert("New passwords do not match.");
          setLoading(false);
          return;
        }
        const isAuthenticated = await reauthenticateUser();
        if (!isAuthenticated) {
          setLoading(false);
          return;
        }
        await updatePassword(auth.currentUser, newPassword);
        alert("Password updated successfully!");
        // Reset password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
      
      // Update other user info
      await updateDoc(userRef, {
        username: fields.name,
        email: fields.email,
        mobile: fields.mobile,
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
          <Link to="/account-settings-user" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Login and Security</p>
        </div>

        <div className="login-sec-card">
          <label>Name:</label>
          <input type="text" name="name" value={fields.name} onChange={handleInputChange} />
          <label>Email:</label>
          <input type="email" name="email" value={fields.email} onChange={handleInputChange} />
          <label>Mobile:</label>
          <input type="text" name="mobile" value={fields.mobile} onChange={handleInputChange} />

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

export default LoginSecurity;
