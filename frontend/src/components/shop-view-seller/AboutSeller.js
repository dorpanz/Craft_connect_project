import defaultImage from "./pics/no-image.jpg"; // Default for profile & gallery
import instagramIcon from "./pics/mdi_instagram.png";
import twitterIcon from "./pics/pajamas_twitter.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AboutSeller = ({ sellerData }) => {
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

  return (
    <div className="featured-items-section">
      <div className="about-seller-content">
        <img
          src={sellerData?.profileImage || defaultImage}
          alt="Seller"
          className="about-seller-image"
        />
        <div className="about-seller-details">
          <p className="about-seller-name">{sellerData?.shopName}</p>
          <p className="about-seller-description">
            {sellerData?.description || "Tell customers about your shop and what makes it special!"}
          </p>
          <p className="about-seller-story">
            {sellerData?.story || "Write your brand's story here to connect with your audience!"}
          </p>
          <div className="about-seller-socials">
            <a href={sellerData?.instagram || "#"} target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href={sellerData?.twitter || "#"} target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="about-seller-gallery">
        <p className="shop-items-section-title">Gallery</p>
        <Slider {...settings} className="gallery-carousel">
          {sellerData?.gallery?.length > 0 ? (
            sellerData.gallery.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Gallery ${index}`} className="gallery-item" />
              </div>
            ))
          ) : (
            <div>
              <img src={defaultImage} alt="No images yet" className="gallery-item" />
              <p className="empty-gallery-message">No images yet. Upload some in your profile!</p>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
};
