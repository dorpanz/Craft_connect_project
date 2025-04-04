import { useState, useEffect } from "react";
import Menu from "../menu/Menu";
import { db } from "../../firebase"; // Import the Firestore database
import "./ItemCustomize.css";
import heart from "../menu/pictures/mdi_heart-outline.png";
import { Link } from "react-router-dom";
import Footer from "../footer/Foooter";

export const ItemCustomize = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await db.collection("products").get();
        const products = snapshot.docs.map(doc => doc.data());

        // Filter items with isCustomized: true
        const customizedItems = products.filter(item => item.isCustomized);
        setFilteredItems(customizedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items: ", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-customize">
      <Menu />
      <div className="item-container">
        {/* Product List for Customized Items */}
        <div className="customized-items">
          <h2>Customized Items</h2>
          <div className="products-list">
            {filteredItems.length === 0 ? (
              <p>No customized items available.</p>
            ) : (
              filteredItems.map((item, index) => (
                <div key={index} className="product-card">
                  <img
                    src={item.images[0] || "/pics/no-image.jpg"}
                    alt={item.title}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <p>{item.description}</p>
                    <Link to={`/product-details/${item.id}`} className="view-details">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
