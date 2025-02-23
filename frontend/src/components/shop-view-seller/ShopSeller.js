import { useEffect } from "react"
import Footer from "../footer/Foooter"
import Menu from "../menu/Menu"
import { AboutSeller } from "./AboutSeller"
import { FeaturedItems } from "./FeaturedItems"
import { ItemsListingSeller } from "./ItemsListingSeller"
import { Reviews } from "./Reviews"
import { ShopAboutBanner } from "./ShopAboutBanner"
import { AnimatedSection } from "../animation/AnimatedSection"

export const ShopSeller = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <div>
            <Menu/>
            <AnimatedSection>
                <ShopAboutBanner/>
            </AnimatedSection>

            <AnimatedSection>
                <FeaturedItems/>
            </AnimatedSection>

            <AnimatedSection>
                <ItemsListingSeller/>
            </AnimatedSection>
            {/* <div className="line-divide"></div> */}

            <AnimatedSection>
                <AboutSeller/>
            </AnimatedSection>

            <AnimatedSection>
                <Reviews/>
            </AnimatedSection>
            
            <AnimatedSection>
                <Footer/>
            </AnimatedSection>
        </div>
    )
}