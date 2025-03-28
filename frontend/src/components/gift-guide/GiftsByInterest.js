import { useRef } from 'react';
import tale from "./pics/tale.jpg"; // Use appropriate images for each interest

export const GiftsByInterest = () => {
  const scrollRef = useRef(null);

  // Function to handle scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  // Function to handle scroll right
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
      <p className="gift-guide-list-title">Gifts by Interest</p>
      <div className="gift-guide-list-container">
        {/* Left Arrow */}
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="gift-guide-list" ref={scrollRef}>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Art" />
            <p className="gift-guide-list-item-title">Art</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Technology" />
            <p className="gift-guide-list-item-title">Technology</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Music" />
            <p className="gift-guide-list-item-title">Music</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Sports" />
            <p className="gift-guide-list-item-title">Sports</p>
          </div>

          <div className="gift-guide-list-item">
            <img src={tale} alt="Sports" />
            <p className="gift-guide-list-item-title">Sports</p>
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
