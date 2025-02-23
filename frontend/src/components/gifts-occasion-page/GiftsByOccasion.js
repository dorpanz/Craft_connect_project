import Menu from "../menu/Menu";
import "./GiftsByOccasion.css";
import { Link } from "react-router-dom";
import heartbanner from "./pics/heartsbanner.jpg";
import exampleimage from "../main-page/recommended/pictures/candle.jpg";
import Footer from "../footer/Foooter";
import { AnimatedSection } from "../animation/AnimatedSection";
import { useEffect } from "react";

export const GiftByOccasion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const decorations = [
    {
      id: 1,
      name: "Balloon Set",
      image: exampleimage,
      shop: "PartyDecor",
      price: "$19.99",
    },
    {
      id: 2,
      name: "Fairy Lights",
      image: exampleimage,
      shop: "GlowWorld",
      price: "$24.99",
    },
    {
      id: 3,
      name: "Table Centerpiece",
      image: exampleimage,
      shop: "ElegantEvents",
      price: "$29.99",
    },
    {
      id: 4,
      name: "Wall Banner",
      image: exampleimage,
      shop: "FestiveFabrics",
      price: "$14.99",
    },
    {
      id: 5,
      name: "Confetti Pack",
      image: exampleimage,
      shop: "CelebrationCentral",
      price: "$9.99",
    },
    {
      id: 6,
      name: "Lanterns",
      image: exampleimage,
      shop: "GlowWorld",
      price: "$34.99",
    },
    {
      id: 7,
      name: "Floral Garland",
      image: exampleimage,
      shop: "BloomDecor",
      price: "$22.99",
    },
    {
      id: 8,
      name: "Candles",
      image: exampleimage,
      shop: "CandleHaven",
      price: "$12.99",
    },
  ];

  return (
    <div>
      <Menu />
      <div className="gift-occasion-cont">
        <AnimatedSection>
          <div className="header-about">
            <img
              src={heartbanner}
              alt="banner-about-occasion"
              className="banner-occasion-img"
            />
            <div className="banner-about-desc-gift">
              <p className="banner-title">Valentines Gifts Ideas</p>
              <p className="banner-desc">14 February</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="gift-occasio-list-title">Craft Connect's Choice</p>
          <div className="rec-section-list">
            {decorations.slice(0, 5).map((item) => (
              <div key={item.id} className="rec-section-list-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rec-section-list-item-img"
                />
                <div className="item-desc">
                  <p className="item-name">{item.name}</p>
                  <div className="item-info">
                    <div>
                      <Link to="/Shop" className="item-shopname">
                        {item.shop}
                      </Link>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="gift-occasio-list-title">Gifts For Her</p>
          <div className="decorations-container">
            <div className="decorations-grid">
              {decorations.map((item) => (
                <div key={item.id} className="decoration-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="decoration-image"
                  />
                  <p className="decoration-name">{item.name}</p>
                  <p className="decoration-shop">{item.shop}</p>
                  <p className="decoration-price">{item.price}</p>
                </div>
              ))}
            </div>
            <div className="gift-more">
              <Link className="seeMorebtn">SEE MORE</Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="gift-occasio-list-title">Gifts For Him</p>
          <div className="decorations-container">
            <div className="decorations-grid">
              {decorations.map((item) => (
                <div key={item.id} className="decoration-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="decoration-image"
                  />
                  <p className="decoration-name">{item.name}</p>
                  <p className="decoration-shop">{item.shop}</p>
                  <p className="decoration-price">{item.price}</p>
                </div>
              ))}
            </div>
            <div className="gift-more">
              <Link className="seeMorebtn">SEE MORE</Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  );
};
