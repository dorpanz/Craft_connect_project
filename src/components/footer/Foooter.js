import React from "react";
import "./Footer.css"; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
     
      <div className="footer-content">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>Buying on Craft Connect</h4>
            <ul>
              <li>
                <Link to="/craft-connect-info">Returns</Link>
              </li>
              <li>
                <Link to="/About-Craft-Connect#buying-faqs">Buying FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Sell on Craft Connect</h4>
            <ul>
              <li>
                <Link to="/About-Craft-Connect#ready-to-sell">Open a Craft Connect shop</Link>
              </li>
              <li>
                <Link to="mailto:contact@craftconnect.com">Help & Support</Link>
              </li>
              <li>
                <Link to="/About-Craft-Connect#buying-faqs">Why Sell on Craft Connect</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About Craft Connect</h4>
            <ul>
              <li>
              <a href="https://www.instagram.com/craftconnectt/" target="_blank" rel="noopener noreferrer">Craft Connect on Instagram</a>
              </li>
              <li>
                <a href="mailto:contact@craftconnect.com">Contact us</a>
              </li>
              <li>
                <Link to="/craft-connect-info">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/craft-connect-info">Terms of Use</Link>
              </li>
              <li>
                <a href="mailto:press@craftconnect.com">Press enquiries</a>
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
