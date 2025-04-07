
import { AnimatedSection } from "../animation/AnimatedSection";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { AboutBanner } from "./about-banner/AboutBanner";
import { ShopsBest } from "./best-sel-shops/ShopsBest";
import CategoryMenu from "./categories/CategoryMenu";
import { Customize } from "./cuztomize/Customize";
import "./Main.css";
import { GiftOccasion } from "./occasion-gift/GiftOccasion";
import { GiftIdeas } from "./recommended/GiftIdeas";
import { PopularProduct } from "./recommended/PopularProduct";
import { Recommended } from "./recommended/Recommended";
import Slideshow from "./slideshow/Slideshow";


const Main = () => {
  return (
    <div>
        <Menu />
      <AnimatedSection>
        <Slideshow />
      </AnimatedSection>
      <AnimatedSection>
        <CategoryMenu />
      </AnimatedSection>
      <AnimatedSection>
        <Recommended />
      </AnimatedSection>
      <AnimatedSection>
        <GiftOccasion />
      </AnimatedSection>
      <AnimatedSection>
        <Customize />
      </AnimatedSection>
      <AnimatedSection>
        <PopularProduct />
      </AnimatedSection>
      <AnimatedSection>
      <ShopsBest/>
      </AnimatedSection>
      <AnimatedSection>
        <AboutBanner />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Main;
