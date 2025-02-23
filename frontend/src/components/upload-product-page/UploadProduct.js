import { AnimatedSection } from "../animation/AnimatedSection";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { AboutProduct } from "./AboutProduct";
import { Delievery } from "./Delievery";
import { PricingInfo } from "./PricingInfo";
import { Returns } from "./Returns";
import { TagsAttribute } from "./TagsAttribute";
import "./UploadProduct.css";
import arrow from "../shop-view-seller/pics/arrow.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const UplooadProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Menu />

      <div className="sellers-settings-section">
        <AnimatedSection>
          <div className="edit-section-title">
            <Link to="/your-shop-dashboard" className="go-back">
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <p className="edit-featured-title">Upload your product!</p>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <AboutProduct />
        </AnimatedSection>

        <AnimatedSection>
          <PricingInfo />
        </AnimatedSection>

        <AnimatedSection>
          <TagsAttribute />
        </AnimatedSection>
        <AnimatedSection>
          <Delievery />
        </AnimatedSection>

        <AnimatedSection>
          <Returns />
        </AnimatedSection>
        <AnimatedSection>
          <div className="button-submit">
            <button>Save and Post</button>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </div>
  );
};
