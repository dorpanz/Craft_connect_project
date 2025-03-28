import './ReadySell.css'
import custom from "./pics/handmade1.jpg"
import { Link } from 'react-router-dom'
export const ReadySell = () =>{
    return(
        <div className="sell-sec-cont">
        <div className='sell-sec'>
        <div className='sell-pic'>
            <img src={ custom } alt='Custom'/>
        </div>
        <div class="sell-info">
            <p class="sell-info-title">Ready to Sell?</p>
            <p class="sell-info-desc">
                    Turn your passion into profit! Start selling your <b>unique creations</b> today and reach customers who love handcrafted goods. 
                    Our platform makes it easy to showcase your talent and grow your business.
            </p>
    <div class="sell-try-cont">
        <Link to="/register-shop" class="sell-try">Get Started!</Link>
    </div>
</div>

        </div>
        </div>
    )
}