import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instagramIcon from "../shop-view-seller/pics/mdi_instagram.png";
import imagedefault from "./pics/avatar.png"

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
          <p className="about-seller-description">{shop.description}</p>
          <p className="about-seller-story">
            {shop.expandedStory ? shop.expandedStory : "No story added yet"}
          </p>

          <div className="about-seller-socials">
            {shop.socialMedia?.instagram && (
              <a href={shop.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
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
  ) : productImages.length > 0 ? (
    <Slider {...settings} className="gallery-carousel">
      {/* Show product images if gallery is empty */}
      {productImages.map((photo, index) => (
        <div key={`product-${index}`}>
          <img src={photo} alt={`Product Image ${index + 1}`} className="gallery-item" />
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


      
    </div>
  );
};
