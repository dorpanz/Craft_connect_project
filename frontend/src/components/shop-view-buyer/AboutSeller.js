import "./ShopBuyer.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instagramIcon from "../shop-view-seller/pics/mdi_instagram.png";

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

  
  const shopItems = items.filter((item) => item.shop_id === shop.shop_id);

  return (
    <div className="featured-items-section">
      <div className="about-seller-content">
        <img src={shop.logo} alt={shop.shop_name} className="about-seller-image" />
        <div className="about-seller-details">
          <p className="about-seller-name">{shop.shop_name}</p>
          <p className="about-seller-description">{shop.about}</p>
          <p className="about-seller-story">{shop.expanded_story}</p>
          <div className="about-seller-socials">
            {shop.social_media?.instagram && (
              <a href={shop.social_media.instagram} target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="about-seller-history">
        <p className="shop-items-section-title">Our Story</p>
        <p className="history-text">{shop.expanded_story}</p>
      </div>

      {/* Slideshow with item images */}
      <div className="about-seller-gallery">
        <p className="shop-items-section-title">Gallery</p>
        <Slider {...settings} className="gallery-carousel">
          {shopItems.flatMap((item) =>
            item.photos_videos?.map((photo, index) => (
              <div key={`${item.id}-${index}`}>
                <img src={photo} alt={item.title} className="gallery-item" />
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};
