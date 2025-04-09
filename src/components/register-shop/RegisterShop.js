import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./regshop.css";
import Menu from "../menu/Menu";

const RegisterShop = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [isInCanada, setIsInCanada] = useState(false);
  const [shopName, setShopName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "sellers", user.uid), {
        fullName,
        email,
        streetAddress,
        city,
        postCode,
        isInCanada,
        shopName,
        termsAccepted,
        newsletterSubscribed,
      });

      console.log("Seller registered:", user);
      navigate("/your-shop-dashboard");
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
    <>
      <Menu />
      {step === 1 && (
        <div className="regshop-container">
          <h1>About You</h1>
          <p>These details are all private and you can change them at any point after you've signed up.</p>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
            <label htmlFor="full-name">Full Name:</label>
            <input type="text" id="full-name" name="full-name" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="street-address">Street Address:</label>
            <input type="text" id="street-address" name="street-address" placeholder="Enter your street address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} required />

            <label htmlFor="postcode">Postcode:</label>
            <input type="text" id="postcode" name="postcode" placeholder="Enter your postal code" value={postCode} onChange={(e) => setPostCode(e.target.value)} required />

            <div className="checkbox-container">
              <input type="checkbox" id="canada-check" name="canada-check" checked={isInCanada} onChange={(e) => setIsInCanada(e.target.checked)} required />
              <label htmlFor="canada-check">
                I live in Canada - You must live and work in Canada to sell your items on Craft Connect.
              </label>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="terms-check" name="terms-check" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
              <label htmlFor="terms-check">
                I've read the <Link to="/terms-conditions">terms and conditions.</Link>
              </label>
            </div>

            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="regshop-container">
          <h1>Your Shop</h1>
          <p>You can change your shop name at any point after you've signed up.</p>
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <label htmlFor="shop-name">Shop Name:</label>
            <input type="text" id="shop-name" name="shop-name" placeholder="Enter your Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} required />

            <button type="submit">Next</button>
          </form>
          <button className="back-btn_shopreg" onClick={() => setStep(1)}>Back</button>
        </div>
      )}

      {step === 3 && (
        <div className="regshop-container">
          <h1>Account</h1>
          <p>Nearly there. Now choose your password.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Write a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Repeat your password to confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <div className="regshop-checkbox-container">
              <input type="checkbox" id="newsletter-check" name="newsletter-check" checked={newsletterSubscribed} onChange={(e) => setNewsletterSubscribed(e.target.checked)} />
              <label htmlFor="newsletter-check">
                I'd like to receive unique gift guides and competitions.
              </label>
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <button className="back-btn_shopreg" onClick={() => setStep(2)}>Back</button>
        </div>
      )}
    </>
  );
};

export default RegisterShop;
