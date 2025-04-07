import { Link } from "react-router-dom";

export const FeaturedItems = ({ items = [], sellerId }) => {
  console.log("Seller ID:", sellerId);
  console.log("Items:", items);

  const featuredItems = items.filter(
    (item) =>
      item.isFeatured &&
      item.status === "approved" &&
      String(item.sellerId) === String(sellerId)
  );

  console.log("Filtered Items:", featuredItems);

  return (
    <div className="featured-items-section">
      <div className="edit-featured-container">
        <p className="shop-items-section-title">Featured Items</p>
        <Link to="/edit-featured-items" state={{ items, sellerId }}>
          <button className="edit-featured-btn">Edit</button>
        </Link>
      </div>
      <div className="shop-items-section-list">
        {featuredItems.length === 0 ? (
          <p>No featured items available.</p>
        ) : (
          featuredItems.map((item) => (
            <div key={item.id} className="shop-items-section-list-item">
              <Link to={`/item-listing/${item.id}`} style={{ textDecoration: "none" }}>
                <img
                  src={item.photos?.[0] || "/pics/no-image.jpg"}
                  alt={item.title}
                />
              </Link>
              <p className="shop-items-section-list-item-title">
                {item.title.substring(0, 25)}
                {item.title.length > 20 ? "..." : ""}
              </p>
              <p className="price">${item.price?.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
