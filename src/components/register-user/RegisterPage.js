import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./RegisterPage.css";
import Menu from "../menu/Menu";

const RegisterPage = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        role: "user",
      });

      console.log("User registered:", user);
      navigate("/account-settings-user");
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered. Please use a different email or sign in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Your password must be at least 6 characters long.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
      };

      setErrorMessage(errorMessages[error.code] || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Menu />
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
            <input type="password" placeholder="Repeat your password" onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />

            <div className="checkbox-container">
              <input type="checkbox" id="terms-check" name="terms-check" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
              <label htmlFor="terms-check">I've read the <a href="/terms-conditions">terms and conditions.</a></label>
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
