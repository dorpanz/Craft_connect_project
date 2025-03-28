import React, { useState } from "react";
import candleall from "./pics/candleall.jpg";
import Menu from "../menu/Menu";
import arrow from "./pics/arrow.png"
import { Link } from "react-router-dom";
const items = [...Array(7)].map((_, index) => ({
  id: index,
  name: `Winter Candle ${index + 1}`,
  price: "$31.99",
  image: candleall,
}));

export const EditFeaturedItems = ({ onSave }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <div>
        <Menu/>

    <div className="edit-featured-items">
        <div className="edit-section-title">
        <Link to="/your-shop" className="go-back"><img src={arrow} alt="arrow" className="arrow"/></Link>
      <p className="edit-featured-title">Select 3 Featured Items</p>
        </div>
      <div className="edit-featured-save">

      <p className="selected-count">Selected: {selectedItems.length} / 3</p>
      <button
        className={`save-featured-btn ${selectedItems.length !== 3 ? "disabled" : ""}`}
        disabled={selectedItems.length !== 3}
        onClick={() => onSave(selectedItems)}
        title={selectedItems.length !== 3 ? "Select exactly 3 items" : ""}
      >
        Save Featured Items
      </button>
            </div>
      <div className="shop-items-section-list-all">
        {items.map((item) => (
            <div key={item.id} className="all-items-section-list-item">
            <img src={item.image} alt="item to sell" />
            <div className="all-items-section-list-item-desc">
              <p className="shop-items-section-list-item-title">{item.name}</p>
              <div className="stars-2">★★★★☆</div>
              <div className="all-items-section-list-item-info">
                <p className="price">{item.price}</p>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelection(item.id)}
                  disabled={!selectedItems.includes(item.id) && selectedItems.length >= 3}
                  />
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
          </div>
  );
};

export default EditFeaturedItems;
