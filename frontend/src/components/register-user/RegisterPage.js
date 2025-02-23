import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import Menu from "../menu/Menu";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [giftsSubscribed, setGiftsSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!termsAccepted) {
      setErrorMessage("You must accept the Terms and Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/signup", {
        username,
        email,
        password,
        termsAccepted,
      });
      console.log("User registered:", res.data);
      navigate("/user-login");
    } catch (error) {
      console.error("Error registering user:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div>
      <Menu/>
    <div className="signin-container">
      

      <div className="signin-box">
        <h2>Register</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />

          <label>Username:</label>
          <input type="text" placeholder="Enter your username" onChange={(e) => setName(e.target.value)} required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required minLength={8} />

          <label>Confirm Password:</label>
          <input type="password" placeholder="Repeat your password please" onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />

          <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="terms-check" 
                name="terms-check" 
                checked={termsAccepted} 
                onChange={(e) => setTermsAccepted(e.target.checked)} 
                required 
              />
              <label htmlFor="terms-check">
                I've read the 
                <Link to="/terms-conditions"> terms and conditions.</Link>
              </label>
            </div>

            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="newsletter-check" 
                name="newsletter-check" 
                checked={giftsSubscribed} 
                onChange={(e) => setGiftsSubscribed(e.target.checked)} 
                />
              <label htmlFor="newsletter-check">
                I'd like to receive unique gift guides and competitions.
              </label>
            </div>

          <button type="submit" className="signin-button">Register</button>
        </form>

        <p className="already-member">
          Already a member? <a href="/user-login" className="sign-in-link">Sign In</a>
        </p>
      </div>
                </div>
    </div>
  );
};

export default RegisterPage;
