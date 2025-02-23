import { Link } from "react-router-dom";
import candleall from "./pics/candleall.jpg";

export const ItemsListingSeller = () => {
    return (
        <div className="featured-items-section">
            <p className="shop-items-section-title">All Items:</p>

            <div className="shop-items-section-list-all">
  {[...Array(7)].map((_, index) => (
    <div key={index} className="all-items-section-list-item">
      <img src={candleall} alt="item to sell" />
      <div className="all-items-section-list-item-desc">
        <p className="shop-items-section-list-item-title">Winter Candle Dummy</p>
        <div className="stars-2">★★★★☆</div> {/* Properly placed stars */}
        <div className="all-items-section-list-item-info">
          <p className="price">$31.99</p>
          <Link to="/edit-product" className="edit-item-btn">Edit</Link>
          <Link to="/item-statistics" className="stats-item-btn">Stats
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
    );
};
