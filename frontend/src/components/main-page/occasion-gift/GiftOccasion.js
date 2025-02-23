import valentines from "./pictures/heart.jpg"
import birthday from "./pictures/birthday.jpg"
import anniversary from "./pictures/anniversary.jpg"
import easter from "./pictures/easter.jpg"
import graduation from "./pictures/graduation.jpg"
import './GiftOccasion.css'
import { Link } from "react-router-dom"
export const GiftOccasion = () =>{
    return(
        <div className="rec-section">
            <div className="rec-header">
                <p>Shop gifts perfect for the occasion!</p>
            </div>
            
            <div className="occasion-categories-sec">
                <div className="ocasssion-category-item">
                    <img src={valentines} alt="valentines heart" className="occasion-img"/>
                    <Link to="/occasion-gift" className="ocasssion-category-item-link">Valentines</Link>
                </div>

                <div className="ocasssion-category-item">
                    <img src={birthday} alt="valentines heart" className="occasion-img"/>
                    <Link className="ocasssion-category-item-link">Birthday</Link>
                </div>

                <div className="ocasssion-category-item">
                    <img src={easter} alt="valentines heart" className="occasion-img"/>
                    <Link className="ocasssion-category-item-link">Easter</Link>
                </div>

                <div className="ocasssion-category-item">
                    <img src={graduation} alt="valentines heart" className="occasion-img"/>
                    <Link className="ocasssion-category-item-link">Graduation</Link>
                </div>

                <div className="ocasssion-category-item">
                    <img src={anniversary} alt="valentines heart" className="occasion-img"/>
                    <Link className="ocasssion-category-item-link">Anniversary</Link>
                </div>
            </div>

            
        </div>
    )
}