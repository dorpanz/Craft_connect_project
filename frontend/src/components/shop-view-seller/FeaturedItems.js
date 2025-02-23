
import { Link } from "react-router-dom"
import candleitem from "./pics/candleitem.jpg"
export const FeaturedItems = () =>{
    return(
        <div className="featured-items-section">
            <div className="featured-items-section-title">
                <p className='shop-items-section-title'>Featured Items:</p>
                <Link to="/edit-featured-items" className="featured-items-section-edit">Change Featured Items</Link>
            </div>
            <div className="shop-items-section-list">
                <div className='shop-items-section-list-item'>
                    <img src={ candleitem } alt='candle item'/>
                    <p className='shop-items-section-list-item-title'>Great Candle with Great Aroma of Home Scent Clean</p>
                    <p className='price'>$36.99</p>
                </div>

                <div className='shop-items-section-list-item'>
                    <img src={ candleitem } alt='candle item'/>
                    <p className='shop-items-section-list-item-title'>Great Candle with Great Aroma of Home Scent Clean</p>
                    <p className='price'>$36.99</p>
                </div>

                <div className='shop-items-section-list-item'>
                    <img src={ candleitem } alt='candle item'/>
                    <p className='shop-items-section-list-item-title'>Great Candle with Great Aroma of Home Scent Clean</p>
                    <p className='price'>$36.99</p>
                </div>
            </div>      
        </div>
    )
}