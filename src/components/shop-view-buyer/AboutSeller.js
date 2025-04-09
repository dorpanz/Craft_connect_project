import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instagramIcon from "../shop-view-seller/pics/mdi_instagram.png";
import imagedefault from "./pics/avatar.png"
import twitterIcon from  "../shop-view-seller/pics/pajamas_twitter.png";
import defaultImage from "./pics/no-image.jpg";
export const AboutSeller = ({ shop, items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const hasGallery = shop.gallery && shop.gallery.length > 0;

  // If no gallery, collect product images instead
  const productImages = items?.flatMap((item) => item.photos || []) || [];

  return (
    <div className="featured-items-section">
      <div className="about-seller-content">
        <img src={shop.logo || imagedefault} alt={shop.shopName} className="about-seller-image" />
        <div className="about-seller-details">
          <p className="about-seller-name">{shop.shopName}</p>
          <p>📍{shop?.city}</p>
          <p className="about-seller-description">{shop.description}</p>
          <div className="about-seller-socials">
    {shop?.socialMedia?.instagramLink && (
        <a href={shop?.socialMedia?.instagramLink} target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
    )}
    {shop?.socialMedia?.xLink && (
        <a href={shop?.socialMedia?.xLink} target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
    )}
</div>

        </div>
      </div>

      <div className="about-seller-gallery">
  <p className="shop-default shop-items-section-title">Gallery</p>
  {hasGallery ? (
    <Slider {...settings} className="gallery-carousel">
      {/* Show seller's gallery images */}
      {shop.gallery.map((photo, index) => (
        <div key={`gallery-${index}`}>
          <img src={photo} alt={`Gallery Image ${index + 1}`} className="gallery-item" />
        </div>
      ))}
    </Slider>
  ) : (
    /* Show fallback if no images exist */
    <div className="empty-gallery-message">
      <img src={defaultImage} alt="No images yet" className="gallery-item" />
      <p>No images yet.</p>
    </div>
  )}
</div>

<div className="about-seller-additional-details">
        {shop?.inspiration && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What inspired you to start your shop?</p>
            <div className="sellers-answer">
              <img src={shop?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{shop?.inspiration}</p>
            </div>
          </div>
        )}
        {shop?.uniqueness && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What makes your shop different from others?</p>
            <div className="sellers-answer">
              <img src={shop?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{shop?.uniqueness}</p>
            </div>
          </div>
        )}
        {shop?.values && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What values are important to you when creating your products?</p>
            <div className="sellers-answer">
              <img src={shop?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{shop?.values}</p>
            </div>
          </div>
        )}
        {shop?.quality && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">How do you ensure quality in your work?</p>
            <div className="sellers-answer">
              <img src={shop?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{shop?.quality}</p>
            </div>
          </div>
        )}
        {shop?.process && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">Tell us something unique about your creative process:</p>
            <div className="sellers-answer">
              <img src={shop?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{shop?.process}</p>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};
