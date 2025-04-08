import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import banner from './pictures/banner.jpg';
import craft from './pictures/carft.jpg';
import startselling from './pictures/startselling.jpg';
import './Slideshow.css'
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const slides = [
    {
      image: craft,
      title: "Explore Craft Connect",
      subtitle: "Connect with artisans and discover unique, handcrafted treasures made with skill and passion.",
      buttonText: "Learn More",
      link: "/About-Craft-Connect",
    },    
    {
      image: startselling,
      title: "Share Your Craft",
      subtitle: "Turn your creativity into income. Join a growing marketplace.",
      buttonText: "Start Selling",
      link: "/start-selling",
    },
    {
      image: banner,
      title: "Made Just For You",
      subtitle: "Personalize your gifts and creations with a unique touch. Crafted with love by artisans for every special moment.",
      buttonText: "Start Personalizing",
      link: "/Customize-goods",
    }
    
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="slide">
            <img src={slide.image} alt={slide.title} className="slide-img" />
            <div className="slide-glass">
              <div className="slide-text">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <Link to={slide.link} className="slide-btn">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
