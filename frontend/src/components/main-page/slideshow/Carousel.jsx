import React from 'react';
import Slider from 'react-slick';
import banner from "./pictures/banner.jpg";
import carft from "./pictures/carft.jpg";
import startselling from "./pictures/startselling.jpg";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 5000, 
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={banner} alt="Slide 1" />
          <div className="slide-content">
            <h2>Shop For Valentines!</h2>
            <p>Look at our chosen gift ideas to surprise your loved ones!</p>
            <Link to="/occasion-gift" className='click-me'>Click Me</Link>
          </div>
        </div>
        <div className="slide">
          <img src={startselling} alt="Slide 2" />
          <div className="slide-content">
            <h2>More About Craft Connect!</h2>
            <Link to="/About-Craft-Connect" className='click-me'>Click Me</Link>
          </div>
        </div>
        <div className="slide">
          <img src={carft} alt="Slide 3" />
          <div className="slide-content">
            <h2>Join Crafties Community</h2>
            <Link to="/About-Craft-Connect" className='click-me'>Start Selling</Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
