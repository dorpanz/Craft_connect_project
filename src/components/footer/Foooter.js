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
                <a href="/craft-connect-info">Returns</a>
              </li>
              <li>
                <a href="/About-Craft-Connect#buying-faqs">Buying FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Sell on Craft Connect</h4>
            <ul>
              <li>
                <a href="/About-Craft-Connect#ready-to-sell">Open a Craft Connect shop</a>
              </li>
              <li>
                <a href="mailto:contact@craftconnect.com">Help & Support</a>
              </li>
              <li>
                <a href="/About-Craft-Connect#buying-faqs">Why Sell on Craft Connect</a>
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
                <a href="/craft-connect-info">Privacy Policy</a>
              </li>
              <li>
                <a href="/craft-connect-info">Terms of Use</a>
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
