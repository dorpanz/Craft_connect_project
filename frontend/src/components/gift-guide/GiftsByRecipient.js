import { useRef } from 'react';
import tale from "./pics/giftsrec.jpg"; 

export const GiftsByRecipient = () => {
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
      <p className="gift-guide-list-title">Gifts by Recipient</p>
      <div className="gift-guide-list-container">
        {/* Left Arrow */}
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="gift-guide-list" ref={scrollRef}>
          <div className="gift-guide-list-item">
            <img src={tale} alt="For Him" />
            <p className="gift-guide-list-item-title">For Him</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="For Her" />
            <p className="gift-guide-list-item-title">For Her</p>
          </div>

          <div className="gift-guide-list-item">
            <img src={tale} alt="For Him" />
            <p className="gift-guide-list-item-title">Unisex</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="For Kids" />
            <p className="gift-guide-list-item-title">For Kids</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="For Pets" />
            <p className="gift-guide-list-item-title">For Pets</p>
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
