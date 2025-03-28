import { useEffect } from 'react';
import Menu from '../menu/Menu'
import './GiftGuide.css'
import gift from "./pics/gift.jpg"
import { Seasonal } from './Seasonal';
import { GiftsByRecipient } from './GiftsByRecipient';
import { GiftsByInterest } from './GiftsByInterest';
import { GiftsByCraft } from './GiftsByCraft';
import { GiftsByRoom } from './GiftsByRoom';
import Footer from '../footer/Foooter';
import { AnimatedSection } from '../animation/AnimatedSection';

export const GiftGuide = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <div>
            <Menu/>
            <AnimatedSection>

            
            <div className='gift-guide-cont'>
                <div className='gift-guide-header'>
                    <img src={ gift } alt="gift banner"/>
                    <div className='gift-guide-header-desc'>
                        <p className='banner-title'>Gift Guide</p>
                        <p className='banner-desc'>
                        They say giving is better than receiving. Discover hand-crafted gifts for all occasions on Craft Connect.</p>
                    </div>
                    
                </div>
            </div>
            </AnimatedSection>

            <AnimatedSection>
            <Seasonal/>
            </AnimatedSection>
            <AnimatedSection>
            <GiftsByRecipient/>
            </AnimatedSection>
            <AnimatedSection>
            <GiftsByInterest/>
            </AnimatedSection>
            <AnimatedSection>
            <GiftsByCraft/>
            </AnimatedSection>
            <AnimatedSection>
            <GiftsByRoom/>
            </AnimatedSection>
            <AnimatedSection>
            <div className='line'></div>
            <Footer/>
            </AnimatedSection>
        </div>
    )
}