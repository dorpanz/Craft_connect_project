import { Link } from 'react-router-dom';
import './ShopBuyer.css';
import candleitem from "./pics/candleitem.jpg";

export const FeaturedItems = ({ shopId, items }) => {
    return (
        <div className="featured-items-section">
            <div>
                <p className='shop-items-section-title'>Featured Items:</p>
            </div>
            <div className="shop-items-section-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className='shop-items-section-list-item'>
                            <Link to={`/item-listing/${item.id}`} style={{ textDecoration: 'none'}}>
                            <img 
                                src={item.photos_videos?.[0] || candleitem} 
                                alt={item.title} 
                                />
                            </Link>
                            <Link to={`/item-listing/${item.id}`} style={{ textDecoration: 'none', color:'black' }}>
                            <p className='shop-items-section-list-item-title'>{item.title}</p>
                            </Link>
                            <p className='price'>${item.price.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>No featured items available for this shop.</p>
                )}
            </div>      
        </div>
    );
};
