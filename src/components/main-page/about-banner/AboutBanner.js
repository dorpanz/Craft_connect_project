import { Link } from 'react-router-dom'
import './AboutBanner.css'
import { useEffect } from 'react';
export const AboutBanner = () =>{
    return(
        <div className='about-section'>
            <p className='about-title'>Craft Connect</p>
            <p className='about-info'>Welcome to Craft Connect—your gateway to discovering the world of local artistry. Our mission is to empower talented artisans by giving them a platform to showcase their unique creations and connect with a global audience. We bridge the gap between tradition and 
                modernity, creating a vibrant community for artisans and enthusiasts alike.</p>
            <p className='about-question'>Have a question? Well, we’ve got some answers.</p>
            <div className='read-more-btn-cont'>
                <Link to='/About-Craft-Connect' className='read-more-btn'>Read More...</Link>

            </div>
        </div>
    )
}