import { useRef } from 'react';
import tale from "./pics/tale.jpg"; // Use appropriate images for each room type

export const GiftsByRoom = () => {
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
      <p className="gift-guide-list-title">Gifts by Room</p>
      <div className="gift-guide-list-container">
        {/* Left Arrow */}
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="gift-guide-list" ref={scrollRef}>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Living Room" />
            <p className="gift-guide-list-item-title">Living Room</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Bedroom" />
            <p className="gift-guide-list-item-title">Bedroom</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Kitchen" />
            <p className="gift-guide-list-item-title">Kitchen</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Office" />
            <p className="gift-guide-list-item-title">Office</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="Office" />
            <p className="gift-guide-list-item-title">Office</p>
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
