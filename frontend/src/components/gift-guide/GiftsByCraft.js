import { useRef } from 'react';
import tale from "./pics/tale.jpg"; 

export const GiftsByCraft = () => {
  const scrollRef = useRef(null);

  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="gift-guide-section">
      <p className="gift-guide-list-title">Gifts by Craft</p>
      <div className="gift-guide-list-container">
        {/* Left Arrow */}
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="gift-guide-list" ref={scrollRef}>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Woodworking" />
            <p className="gift-guide-list-item-title">Woodworking</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Pottery" />
            <p className="gift-guide-list-item-title">Pottery</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Knitting" />
            <p className="gift-guide-list-item-title">Knitting</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Jewelry" />
            <p className="gift-guide-list-item-title">Jewelry</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Jewelry" />
            <p className="gift-guide-list-item-title">Jewelry</p>
          </div>
        </div>

        {/* Right Arrow */}
        <button className="scroll-arrow right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
};
