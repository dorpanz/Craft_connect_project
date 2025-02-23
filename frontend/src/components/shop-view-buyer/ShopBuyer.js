import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListing } from "./ItemsListing";
import { Reviews } from "./Reviews";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";
import { shops } from "../../data/shop";
import { data } from "../../data/products";

export const ShopBuyer = () => {
  const { shopId } = useParams(); // Get shopId from URL
  const [shop, setShop] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    // Find the shop that matches the shopId
    const foundShop = shops.find((s) => s.shop_id === parseInt(shopId));
    setShop(foundShop);
  }, [shopId]);

  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <div>
      <Menu />
      <AnimatedSection>
        <ShopAboutBanner shop={shop} />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturedItems shopId={shop.shop_id} items={data.filter((item) => shop.featured_items.includes(item.id))} />
      </AnimatedSection>
      <AnimatedSection>
        <ItemsListing shopId={shop.shop_id} items={data.filter((item) => item.shop_id === shop.shop_id)} />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSeller shop={shop} items={data} />
      </AnimatedSection>
      <AnimatedSection>
        <Reviews reviews={shop.reviews} />
      </AnimatedSection>
      <Footer />
    </div>
  );
};
