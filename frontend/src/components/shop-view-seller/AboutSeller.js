import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sellerImage from "./pics/candlelogo.jpg"; // Seller's portrait
import gallery1 from "./pics/candlelogo.jpg"; // Handmade candle images
import gallery2 from "./pics/candleall.jpg";
import gallery3 from "./pics/candlelogo.jpg";
import instagramIcon from "./pics/mdi_instagram.png";
import twitterIcon from "./pics/pajamas_twitter.png";

export const AboutSeller = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto-scroll every 3 seconds
    arrows: false,
  };

  return (
    <div className="featured-items-section">
      <div className="about-seller-content">
        <img src={sellerImage} alt="Seller" className="about-seller-image" />
        <div className="about-seller-details">
          <p className="about-seller-name">Dasha's Handmade Candles</p>
          <p className="about-seller-description">
            What started as a small passion project quickly became a beloved handmade candle brand. 
            Using <strong>eco-friendly wax, natural scents, and hand-poured techniques</strong>, every candle is crafted with care.
          </p>
          <p className="about-seller-story">
            Inspired by cozy winter nights and warm memories, I create candles that bring relaxation and comfort to any space.
          </p>
          <div className="about-seller-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="about-seller-history">
        <p className="shop-items-section-title">Our Story</p>
        <p className="history-text">
          Dasha's Handmade Candles was born out of a deep love for craftsmanship and a passion for creating a warm, inviting atmosphere. 
          It all started in a small kitchen, where I experimented with different wax blends, wicks, and essential oils to create the perfect candle.
        </p>
        <p className="history-text">
          Over time, what began as a hobby evolved into a full-fledged business, with each candle carefully hand-poured using 
          <strong>100% natural soy wax</strong> and <strong>phthalate-free fragrance oils</strong>. Every scent is designed to evoke memories, emotions, and a sense of calm.
        </p>
        <p className="history-text">
          Today, Dasha’s Handmade Candles are loved by customers across the country, bringing warmth, relaxation, and a touch of luxury to every home.
        </p>
      </div>

      {/* Self-Scrolling Gallery Carousel */}
      <div className="about-seller-gallery">
        <p className="shop-items-section-title">Gallery</p>
        <Slider {...settings} className="gallery-carousel">
          <div><img src={gallery1} alt="Candle 1" className="gallery-item" /></div>
          <div><img src={gallery2} alt="Candle 2" className="gallery-item" /></div>
          <div><img src={gallery3} alt="Candle 3" className="gallery-item" /></div>
        </Slider>
      </div>
    </div>
  );
};
