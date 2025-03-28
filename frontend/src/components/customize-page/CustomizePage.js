import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '../menu/Menu';
import Footer from '../footer/Foooter';
import { AnimatedSection } from '../animation/AnimatedSection';
import './CustomizePage.css';
import { data } from '../../data/products';
 // Import the items data

export const CustomizePage = () => {
    const navigate = useNavigate();
    const [personalizedItems, setPersonalizedItems] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        // Filter only personalized (customizable) items
        const filteredItems = data.filter(item => item.customized === true);
        setPersonalizedItems(filteredItems);
    }, []);

    const handleRedirect = (itemId) => {
        navigate(`/item-listing/${itemId}`); // Redirects to customize page for that item
    };

    return (
        <div className='customize-page'>
            <Menu />
            <AnimatedSection>
                <p className='customize-title'>Customize Your Goods</p>
                <div className='customize-section'>
                    {personalizedItems.map(item => (
                        <div 
                            key={item.id} 
                            className='customize-section-item' 
                            onClick={() => handleRedirect(item.id)}
                        >
                            <img src={item.photos_videos[0]} alt={item.title} />
                            <p className='customize-section-item-name'>{item.title}</p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>
            <div className='line'></div>
            <Footer />
        </div>
    );
};
