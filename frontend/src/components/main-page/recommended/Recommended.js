import { Link } from 'react-router-dom'
import './Recommended.css'
import { data } from '../../../data/products';
export const Recommended = () => {
    return (
        <div className='rec-section'>
            <div className='rec-header'>
                <p>Recommended by us</p>
            </div>

            <div className='rec-section-list'>
                {data.slice(6,11).map((item) => (
                    <div key={item.id} className='rec-section-list-item'>
                        <Link to={`/item-listing/${item.id}`} style={{ textDecoration: 'none' }}>
                        <img src={item.photos_videos[0]} alt={item.title} className='rec-section-list-item-img' />
                        </Link>
                        <div className='item-desc'>
                        <Link to={`/item-listing/${item.id}`} style={{ textDecoration: 'none', color:'black' }}>
                            <p className='item-name'>{item.title.slice(0, 40)}...</p>
                        </Link>
                            <div className='item-info'>
                                <div>
                                    <Link to={`/shop/${item.shop_id}`} className='item-shopname'>
                                        {item.shop_name}
                                    </Link>
                                    <p className='item-price'>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}