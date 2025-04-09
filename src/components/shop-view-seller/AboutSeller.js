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
          src={sellerData?.logo || defaultImage}
          alt="Seller"
          className="about-seller-image"
        />
        <div className="about-seller-details">
          <p className="about-seller-name">{sellerData?.shopName}</p>
          <p>📍{sellerData?.city}</p>
          <p className="about-seller-description">
            {sellerData?.description || "Tell customers about your shop and what makes it special!"}
          </p>
          <div className="about-seller-socials">
    {sellerData?.socialMedia?.instagram && (
        <a href={sellerData?.socialMedia?.instagram} target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
    )}
    {sellerData?.socialMedia?.x && (
        <a href={sellerData?.socialMedia?.x} target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="social-icon" />
        </a>
    )}
</div>

        </div>
      </div>

      {/* Gallery */}
      <div className="about-seller-gallery">
        <p className="shop-items-section-title">Gallery</p>
        {sellerData?.gallery?.length > 0 ? (
          <Slider {...settings} className="gallery-carousel">
            {sellerData.gallery.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Gallery ${index}`} className="gallery-item" />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="empty-gallery-message">
            <img src={defaultImage} alt="No images yet" className="gallery-item" />
            <p>No images yet. Upload some in your profile!</p>
          </div>
        )}
      </div>

      {/* Display the additional questions only if there's an answer */}
      <div className="about-seller-additional-details">
        {sellerData?.inspiration && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What inspired you to start your shop?</p>
            <div className="sellers-answer">
              <img src={sellerData?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{sellerData?.inspiration}</p>
            </div>
          </div>
        )}
        {sellerData?.uniqueness && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What makes your shop different from others?</p>
            <div className="sellers-answer">
              <img src={sellerData?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{sellerData?.uniqueness}</p>
            </div>
          </div>
        )}
        {sellerData?.values && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">What values are important to you when creating your products?</p>
            <div className="sellers-answer">
              <img src={sellerData?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{sellerData?.values}</p>
            </div>
          </div>
        )}
        {sellerData?.quality && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">How do you ensure quality in your work?</p>
            <div className="sellers-answer">
              <img src={sellerData?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{sellerData?.quality}</p>
            </div>
          </div>
        )}
        {sellerData?.process && (
          <div className="about-seller-question-answer">
            <p className="about-seller-question">Tell us something unique about your creative process:</p>
            <div className="sellers-answer">
              <img src={sellerData?.logo} className="sellers-answer-logo" alt="Logo" />
              <p className="sellers-answer-text">{sellerData?.process}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
