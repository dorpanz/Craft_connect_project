import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./signin.css";
import Menu from "../menu/Menu";

const SignIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        const result = await login(formData.email, formData.password, formData.role);

        if (result?.user) {
            setMessage("Login successful!");
            navigate(result.role === "seller" ? "/your-shop-dashboard" : "/account-settings-user");
        } else {
            setMessage("Login failed. Please check your credentials.");
        }
        
    } catch (error) {
        setMessage(error.response?.data?.message || "Invalid credentials.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div>
      <Menu />
      <div className="signin-container">
        <div className="signin-box">
          <h2>SIGN IN</h2>
          {message && <p className="signin-message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="***************"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <label>Login as:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="signin-select">
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>

            <a href="#" className="forgot-password">Forgot Password?</a>

            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? "Logging in..." : "SIGN IN"}
            </button>
          </form>

          <p>New to Craft Connect? <a href="/user-register" className="join-now">JOIN NOW</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
