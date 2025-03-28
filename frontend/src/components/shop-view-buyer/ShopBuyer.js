import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"; // Firestore imports
import { getAuth } from "firebase/auth"; // Auth imports
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListing } from "./ItemsListing";
import { Reviews } from "./Reviews";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";

export const ShopBuyer = () => {
  const { shopId } = useParams(); // Get shopId from URL
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const db = getFirestore(); // Firebase Firestore instance
  const auth = getAuth(); // Firebase Auth instance

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchShopData = async () => {
      try {
        const shopRef = doc(db, "sellers", shopId); // Use 'sellers' collection in Firestore
        const shopSnap = await getDoc(shopRef);
        if (shopSnap.exists()) {
          const shopData = shopSnap.data();
          const updatedShop = {
            shopId: shopData.shopId,
            shopName: shopData.shopName || "Shop Name", // Default values in case data is missing
            banner: shopData.banner || "/default-banner.jpg",
            logo: shopData.logo || "/default-logo.jpg",
            about: shopData.about || "No description available",
            featuredItems: shopData.featuredItems || [],
            reviews: shopData.reviews || [],
            socialMedia: shopData.socialMedia || {},
            expandedStory: shopData.expandedStory || "Tell your shop story here...",
          };
          setShop(updatedShop);
          
          // Fetch items associated with the shop
          const itemsQuery = collection(db, "items");
          const itemsSnap = await getDocs(itemsQuery);
          const itemsList = itemsSnap.docs.map(doc => doc.data()).filter(item => item.shopId === shopId);
          setItems(itemsList);

          // Fetch reviews associated with the shop
          const reviewsQuery = collection(db, "reviews");
          const reviewsSnap = await getDocs(reviewsQuery);
          const reviewsList = reviewsSnap.docs.map(doc => doc.data()).filter(review => review.shopId === shopId);
          setReviews(reviewsList);
        } else {
          console.log("Shop not found");
        }
      } catch (error) {
        console.log("Error fetching shop data: ", error);
      }
    };

    fetchShopData();
  }, [shopId, db]);

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
        <FeaturedItems shopId={shop.shopId} items={shop.featuredItems} />
      </AnimatedSection>
      <AnimatedSection>
        <ItemsListing shopId={shop.shopId} items={items} />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSeller shop={shop} />
      </AnimatedSection>
      <AnimatedSection>
        <Reviews reviews={reviews} />
      </AnimatedSection>
      <Footer />
    </div>
  );
};
