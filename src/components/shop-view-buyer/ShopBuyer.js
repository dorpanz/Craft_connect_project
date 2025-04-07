import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import Menu from "../menu/Menu";
import Footer from "../footer/Foooter";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListing } from "./ItemsListing";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";

export const ShopBuyer = () => {
  const { shopName } = useParams();
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
          const docSnap = querySnapshot.docs[0];
          const shopData = docSnap.data();
          const sellerId = docSnap.id; // Use the document ID as sellerId
    
          // Increment views
          const shopRef = doc(db, "sellers", sellerId);
          await updateDoc(shopRef, {
            views: (shopData.views || 0) + 1,
          });
    
          setShop({ ...shopData, sellerId }); // Ensure sellerId is included
          console.log("Shop found:", { ...shopData, sellerId });
    
          // Fetch Listings for this Shop
          fetchItems(sellerId);
        } else {
          console.log("No shop found with that name.");
          setShop(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        setShop(null);
      }
    };
    

    const fetchItems = async (sellerId) => {
      try {
        console.log("Fetching listings for seller:", sellerId);

        const listingsRef = collection(db, "products");
        const q = query(listingsRef, where("sellerId", "==", sellerId));
        const querySnapshot = await getDocs(q);

        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(itemsList);
        console.log("Fetched items:", itemsList);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    if (shopName) {
      fetchShopData();
    }
  }, [shopName]);

  // Function to scroll to the AboutSeller component using ID
  const scrollToAboutSeller = () => {
    const element = document.getElementById('about-seller');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <div>
      <Menu />
      <AnimatedSection>
        <ShopAboutBanner shop={shop} scrollToAboutSeller={scrollToAboutSeller} />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturedItems shopId={shop.sellerId} items={items} />
      </AnimatedSection>
      <AnimatedSection>
        <ItemsListing items={items} />
      </AnimatedSection>
      <AnimatedSection>
        {/* Add an id to the AboutSeller component */}
        <div id="about-seller">
          <AboutSeller shop={shop} items={items} />
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
};
