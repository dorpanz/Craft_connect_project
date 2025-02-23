import "./ShopBest.css";

export const ShopsBest = ({ shops, items }) => {
  return (
    <div className="best-sel-shop-sec">
      <div className="rec-header">
        <p>Best Selling Shops</p>
      </div>
      <div className="shops-section">
        {shops.slice(2,6).map((shop) => {
          const shopItems = items.filter((item) => shop.featured_items.includes(item.id));
          return (
            <div key={shop.shop_id} className="shop-info-section">
              <img src={shop.logo} alt={shop.shop_name} className="shop-logo" />
              <div className="shop-name-products">
                <p className="shop-name">{shop.shop_name}</p>
                <div className="shop-rating">
                  <span>{"★".repeat(Math.floor(shop.rating)) + "☆".repeat(5 - Math.floor(shop.rating))}</span>
                  <p className="review-count">({shop.reviews.length} reviews)</p>
                </div>
                <div className="shop-products">
                  {shopItems.slice(0, 4).map((item) =>
                    item.photos_videos.slice(0, 1).map((photo, index) => (
                      <img key={`${item.id}-${index}`} src={photo} alt={item.title} className="shop-product-image" />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
