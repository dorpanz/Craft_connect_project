import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { AboutSeller } from "./AboutSeller";
import { FeaturedItems } from "./FeaturedItems";
import { ItemsListingSeller } from "./ItemsListingSeller";
import { Reviews } from "./Reviews";
import { ShopAboutBanner } from "./ShopAboutBanner";
import { AnimatedSection } from "../animation/AnimatedSection";

export const ShopSeller = () => {
    const [seller, setSeller] = useState(null);
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const sellerRef = doc(db, "sellers", user.uid);
                const sellerSnap = await getDoc(sellerRef);
                
                if (sellerSnap.exists()) {
                    const sellerData = sellerSnap.data();
                    
                    // Apply default placeholders for missing data
                    const updatedSeller = {
                        fullName: sellerData.fullName || "Seller Name",
                        shopName: sellerData.shopName || "Your Shop Name",
                        banner: sellerData.banner || "/pics/no-image.jpg",
                        logo: sellerData.logo || "/pics/no-image.jpg",
                        tagline: sellerData.tagline || "Add a catchy tagline for your shop!",
                        description: sellerData.description || "Tell customers about your shop!",
                        story: sellerData.story || "Write your brand's story here to connect!",
                        profileImage: sellerData.profileImage || "/pics/no-image.jpg",
                        gallery: sellerData.gallery || [],
                        instagram: sellerData.instagram || "#",
                        twitter: sellerData.twitter || "#",
                        featuredItems: sellerData.featuredItems || [],
                        products: sellerData.products || [],
                        reviews: sellerData.reviews || []
                    };

                    setSeller(updatedSeller);
                } else {
                    console.log("No seller profile found!");
                }
            }
        });
    }, []);

    return (
        <div>
            <Menu />
            <AnimatedSection>
                <ShopAboutBanner shopData={seller} />
            </AnimatedSection>
            <AnimatedSection>
                <FeaturedItems sellerData={seller} />
            </AnimatedSection>
            <AnimatedSection>
                <ItemsListingSeller sellerData={seller} />
            </AnimatedSection>
            <AnimatedSection>
                <AboutSeller sellerData={seller} />
            </AnimatedSection>
            <AnimatedSection>
                <Reviews reviews={seller?.reviews} />
            </AnimatedSection>
            <AnimatedSection>
                <Footer />
            </AnimatedSection>
        </div>
    );
};
