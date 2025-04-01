import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListing } from "./ItemsListing";
import { Reviews } from "./Reviews";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";

export const ShopBuyer = () => {
  const { shopName } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    window.scrollTo(0, 0);
  
    const fetchShopData = async () => {
      try {
        console.log("Fetching shop with name:", shopName);
        
        const sellersRef = collection(db, "sellers");
        const q = query(sellersRef, where("shopName", "==", shopName.trim()));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const shopData = querySnapshot.docs[0].data();
          setShop(shopData);
          console.log("Shop found:", shopData);
        } else {
          console.log("No shop found with that name.");
          setShop(null);
        }
      } catch (error) {
        console.error("Error fetching shop data:", error);
        setShop(null);
      }
    };
  
    if (shopName) {
      fetchShopData();
    }
  }, [shopName]);
  
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
        <FeaturedItems shopId={shop.sellerId} items={items} />
      </AnimatedSection>
      <AnimatedSection>
        <ItemsListing shopId={shop.sellerId} items={items} />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSeller shop={shop} />
      </AnimatedSection>
      {/* <AnimatedSection>
        <Reviews reviews={reviews} />
      </AnimatedSection> */}
      <Footer />
    </div>
  );
};
