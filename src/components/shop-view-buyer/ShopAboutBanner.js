import { useNavigate } from "react-router-dom";
import info from "./pics/about.png";
import contact from "./pics/contact.png";

export const ShopAboutBanner = ({ shop }) => {
    const navigate = useNavigate();

    return (
        <div className='shop-buyer-banner'>
            <div className='shop-buyer-banner-image-cont'>
                <img src={shop.banner_image} alt="banner" className='shop-buyer-banner-image'/>
            </div>
            <div className='shop-buyer-banner-about-logo'>
                <img src={shop.logo} alt="logo" className='shop-buyer-banner-about-logo-image'/>
            </div>
            <div className='shop-buyer-banner-about'>
                <div className='shop-buyer-banner-about-section'>
                    <p className='shop-buyer-banner-name'>{shop.shop_name}</p>
                </div>
                <div className='line-shop'></div>
                <div className='shop-buyer-banner-about-section'>
                    <div 
                        className='shop-buyer-about-section-links' 
                        onClick={() => navigate(`/account-settings-user/chat?sellerId=${shop.shop_id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={contact} alt="contact" className='icons-shop'/>
                        <p>Contact</p>
                    </div>

                    <div className='shop-buyer-about-section-links'>
                        <img src={info} alt="info" className='icons-shop'/>
                        <p>About</p>
                    </div>
                </div>
                <div className='line-shop'></div>
                <div className='shop-buyer-banner-about-section'>
                    <p>{shop.about}</p>
                    <button className='follow-btn'>Follow</button>
                </div>
            </div>
        </div>
    );
};
