export const ItemsListingSeller = ({ sellerData }) => {
  return (
    <div className="featured-items-section">
      <p className="shop-items-section-title">All Items:</p>
      <div className="shop-items-section-list-all">
        {sellerData?.products?.length > 0 ? (
          sellerData.products.map((item, index) => (
            <div key={index} className="all-items-section-list-item">
              <img src={item.image || "/pics/no-image.jpg"} alt={item.title || "Item"} />
              <p className="shop-items-section-list-item-title">{item.title || "Item Title"}</p>
              <p className="price">{item.price ? `$${item.price}` : "Price not set"}</p>
            </div>
          ))
        ) : (
          <p className="empty-message">No items listed yet.</p>
        )}
      </div>
    </div>
  );
};
