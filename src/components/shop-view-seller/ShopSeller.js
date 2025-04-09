import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListingSeller } from "./ItemsListingSeller";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";
import imagedefault from "./pics/avatar.png";
import banner from "./pics/default-banner.jpg";

export const ShopSeller = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const sellerRef = doc(db, "sellers", user.uid);
          const sellerSnap = await getDoc(sellerRef);

          if (sellerSnap.exists()) {
            const sellerData = sellerSnap.data();
            setSeller({
              id: user.uid, 
              fullName: sellerData.fullName || "Seller Name",
              shopName: sellerData.shopName || "Your Shop Name",
              banner: sellerData.banner || banner,
              city: sellerData.city || "Canada",
              logo: sellerData.logo || imagedefault,
              tagline: sellerData.tagline || "Add a tagline for your shop!",
              description: sellerData.description || "Tell customers about your shop!",
              story: sellerData.story || "Write your brand's story here to connect!",
              gallery: sellerData.gallery || [],
              instagram: sellerData.instagram || "#",
              twitter: sellerData.twitter || "#",
              featuredItems: sellerData.featuredItems || [],
              products: sellerData.products || [],
              inspiration: sellerData.inspiration || "",
              uniqueness: sellerData.uniqueness || "",
              values: sellerData.values || "",
              quality: sellerData.quality || "",
              process: sellerData.process || "",
              socialMedia: {
                instagram: sellerData.socialMedia?.instagram || "", // Default Instagram URL
                x: sellerData.socialMedia?.x || "", // Default X (Twitter) URL
              },
            });
          } else {
            console.log("No seller profile found!");
            setSeller(null);
          }
        } catch (error) {
          console.error("Error fetching seller data:", error);
        }

        try {
          const productsRef = collection(db, "products");
          const productsSnap = await getDocs(productsRef);
          const productsList = productsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      } else {
        setSeller(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  // Save featured items
  const handleSaveFeaturedItems = async (selectedItems) => {
    if (!seller) return;

    try {
      const sellerRef = doc(db, "sellers", seller.id);
      await updateDoc(sellerRef, { featuredItems: selectedItems });

      setSeller((prev) => ({
        ...prev,
        featuredItems: selectedItems,
      }));

      console.log("Featured items updated successfully");
    } catch (error) {
      console.error("Error updating featured items:", error);
    }
  };
  const featuredItemIds = JSON.parse(localStorage.getItem("featuredItems")) || [];

  if (loading || !seller) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Menu />
      <AnimatedSection>
        <ShopAboutBanner shopData={seller} />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturedItems sellerId={seller?.id} items={products} />
      </AnimatedSection>
      <AnimatedSection>
        <ItemsListingSeller sellerData={seller} />
      </AnimatedSection>
      <AnimatedSection>
        <AboutSeller sellerData={seller} />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
};
