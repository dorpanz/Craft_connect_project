import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
     
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>Buying on Craft Connect</h4>
            <ul>
              <li>
                <a href="#">How it works</a>
              </li>
              <li>
                <a href="#">Delivery</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Contact the seller</a>
              </li>
              <li>
                <a href="#">Buying FAQ</a>
              </li>
              <li>
                <a href="#">Subscribe for Gifts & Offers</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Sell on Craft Connect</h4>
            <ul>
              <li>
                <a href="#">Open a Craft Connect shop</a>
              </li>
              <li>
                <a href="#">Help & Support</a>
              </li>
              <li>
                <a href="#">Why Sell on Craft Connect</a>
              </li>
              <li>
                <a href="#">Subscribe to Seller Tips</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About Craft Connect</h4>
            <ul>
              <li>
                <a href="#">The Craft Connect Story</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms of use</a>
              </li>
              <li>
                <a href="#">Press enquiries</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-subscription">
          <p>Discover gift ideas, new makers & special offers</p>
          <form className="footer-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
