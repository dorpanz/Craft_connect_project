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
    const [loading, setLoading] = useState(true); // Track loading state
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
                        });
                    } else {
                        console.log("No seller profile found!");
                        setSeller(null);
                    }
                } catch (error) {
                    console.error("Error fetching seller data:", error);
                }
            } else {
                setSeller(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show a loading state
    }

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
