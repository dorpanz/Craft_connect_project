import defaultImage from "./pics/no-image.jpg"; // Default image for profile, banner, etc.
import info from "./pics/about.png";
import contact from "./pics/contact.png";
import { Link } from "react-router-dom";

export const ShopAboutBanner = ({ shopData }) => {
  return (
    <div className="shop-buyer-banner">
      <div className="shop-buyer-banner-image-cont">
        <img
          src={shopData?.banner || defaultImage}
          alt="banner"
          className="shop-buyer-banner-image"
        />
      </div>
      <div className="shop-buyer-banner-about-logo">
        <img
          src={shopData?.logo || defaultImage}
          alt="logo"
          className="shop-buyer-banner-about-logo-image"
        />
      </div>
      <div className="shop-buyer-banner-about">
        <div className="shop-buyer-banner-about-section">
          <p className="shop-buyer-banner-name">{shopData?.shopName}</p>
          <span className="stars">★★★★☆</span>
        </div>
        <div className="line-shop"></div>
        <div className="shop-buyer-banner-about-section">
          <div className="shop-buyer-about-section-links">
            <img src={contact} alt="contact" className="icons-shop" />
            <p>Contact</p>
          </div>
          <div className="shop-buyer-about-section-links">
            <img src={info} alt="info" className="icons-shop" />
            <p>About</p>
          </div>
        </div>
        <div className="line-shop"></div>
        <div className="shop-buyer-banner-about-section">
          <p>{shopData?.tagline || "Add a catchy tagline for your shop!"}</p>
          <Link to="/Shop/Edit" className="edit-seller-btn">
            Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
};
