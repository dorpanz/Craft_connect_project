import { useRef } from 'react';
import tale from "./pics/tale.jpg";

export const Seasonal = () => {
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
      <p className="gift-guide-list-title">Seasonal Finds</p>
      <div className="gift-guide-list-container">
        <button className="scroll-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div className="gift-guide-list" ref={scrollRef}>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>

          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>

          <div className="gift-guide-list-item">
            <img src={tale} alt="tale section" />
            <p className="gift-guide-list-item-title">Fairytale</p>
          </div>
        </div>
        <button className="scroll-arrow right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>
    </div>
  );
};
