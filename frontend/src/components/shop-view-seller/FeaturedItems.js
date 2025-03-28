export const FeaturedItems = ({ sellerData }) => {
    return (
      <div className="featured-items-section">
        <div className="featured-items-section-title">
          <p className='shop-items-section-title'>Featured Items:</p>
        </div>
        <div className="shop-items-section-list">
          {sellerData?.featuredItems?.length > 0 ? (
            sellerData.featuredItems.map((item, index) => (
              <div key={index} className='shop-items-section-list-item'>
                <img src={item.image || "/pics/no-image.jpg"} alt={item.title || "Item"} />
                <p className='shop-items-section-list-item-title'>{item.title || "Item Title"}</p>
                <p className='price'>{item.price ? `$${item.price}` : "Price not set"}</p>
              </div>
            ))
          ) : (
            <p className="empty-message">No featured items yet.</p>
          )}
        </div>
      </div>
    );
  };
  