import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { AnimatedSection } from "../animation/AnimatedSection";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./EditProfile.css";

export const EditProfile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Menu />
            <AnimatedSection>
                <ProfileEditSection />
            </AnimatedSection>
            <AnimatedSection>
                <Footer />
            </AnimatedSection>
        </div>
    );
};

const ProfileEditSection = () => {
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [shopInspiration, setShopInspiration] = useState(""); // New state for shop inspiration
    const [shopUniqueness, setShopUniqueness] = useState(""); // New state for uniqueness
    const [shopValues, setShopValues] = useState(""); // New state for values
    const [shopQuality, setShopQuality] = useState(""); // New state for quality
    const [shopProcess, setShopProcess] = useState(""); // New state for creative process
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [instagramLink, setInstagramLink] = useState(""); // State for Instagram link
    const [xLink, setXLink] = useState(""); 
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const sellerRef = doc(db, "sellers", user.uid);
                const sellerSnap = await getDoc(sellerRef);
                if (sellerSnap.exists()) {
                    const data = sellerSnap.data();
                    setShopName(data.shopName || "");
                    setShopDescription(data.description || "");
                    setShopInspiration(data.inspiration || ""); // Load the existing inspiration
                    setShopUniqueness(data.uniqueness || ""); // Load uniqueness
                    setShopValues(data.values || ""); // Load values
                    setShopQuality(data.quality || ""); // Load quality
                    setShopProcess(data.process || ""); // Load creative process
                    setLogo(data.logo || null);
                    setBanner(data.banner || null);
                    setGallery(data.gallery || []);
                    setInstagramLink(data.socialMedia?.instagram || ""); // Load Instagram link
                    setXLink(data.socialMedia?.x || ""); 
                }
            }
        });
    }, [auth, db]);

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (file && auth.currentUser) {
            setLoading(true);
            try {
                const storageRef = ref(storage, `logos/${auth.currentUser.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                const logoUrl = await getDownloadURL(storageRef);
                setLogo(logoUrl);
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
            setLoading(false);
        }
    };

    const handleBannerChange = async (e) => {
        const file = e.target.files[0];
        if (file && auth.currentUser) {
            setLoading(true);
            try {
                const storageRef = ref(storage, `banners/${auth.currentUser.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                const bannerUrl = await getDownloadURL(storageRef);
                setBanner(bannerUrl);
                const sellerRef = doc(db, "sellers", auth.currentUser.uid);
                await updateDoc(sellerRef, { banner: bannerUrl });
            } catch (error) {
                console.error("Error uploading banner:", error);
            }
            setLoading(false);
        }
    };

    const handleGalleryChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0 && auth.currentUser) {
            setLoading(true);
            try {
                const newGallery = await Promise.all(
                    files.map(async (file) => {
                        const storageRef = ref(storage, `gallery/${auth.currentUser.uid}/${file.name}`);
                        await uploadBytes(storageRef, file);
                        return await getDownloadURL(storageRef);
                    })
                );
    
                const updatedGallery = [...gallery, ...newGallery];
                setGallery(updatedGallery);
    
                const sellerRef = doc(db, "sellers", auth.currentUser.uid);
                await updateDoc(sellerRef, { gallery: updatedGallery });
    
            } catch (error) {
                console.error("Error uploading gallery images:", error);
            }
            setLoading(false);
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        setLoading(true);
        try {
            const sellerRef = doc(db, "sellers", auth.currentUser.uid);
            await updateDoc(sellerRef, {
                shopName,
                description: shopDescription,
                inspiration: shopInspiration, // Save inspiration
                uniqueness: shopUniqueness, // Save uniqueness
                values: shopValues, // Save values
                quality: shopQuality, // Save quality
                process: shopProcess, // Save creative process
                logo,
                banner,
                gallery,
                socialMedia: {
                    instagram: instagramLink, // Save Instagram link
                    x: xLink, // Save X link
                },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
        setLoading(false);
    };

    return (
        <div className="account-section">
            <div className="edit-section-title">
                <Link to="/your-shop" className="go-back">
                    <img src={arrow} alt="arrow" className="arrow" />
                </Link>
                <p className="edit-featured-title">Edit Profile</p>
            </div>

            <form onSubmit={handleSaveChanges}>
                <div className="form-group">
                    <label>Shop Name</label>
                    <input
                        type="text"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="Enter your shop name"
                        
                    />
                </div>
                <div className="form-group">
                    <label>Shop Description</label>
                    <textarea
                        value={shopDescription}
                        onChange={(e) => setShopDescription(e.target.value)}
                        placeholder="Enter a brief description of your shop"
                        
                    />
                </div>

                {/* New Questions */}
                <div className="form-group">
                    <label>What inspired you to start your shop?</label>
                    <textarea
                        value={shopInspiration}
                        onChange={(e) => setShopInspiration(e.target.value)}
                        placeholder="Tell us what inspired you to start your shop"
                        
                    />
                </div>

                <div className="form-group">
                    <label>What makes your shop different from others?</label>
                    <textarea
                        value={shopUniqueness}
                        onChange={(e) => setShopUniqueness(e.target.value)}
                        placeholder="Explain what makes your shop stand out"
                        
                    />
                </div>

                <div className="form-group">
                    <label>What values are important to you when creating your products?</label>
                    <textarea
                        value={shopValues}
                        onChange={(e) => setShopValues(e.target.value)}
                        placeholder="Share the values that guide your product creation"
                        
                    />
                </div>

                <div className="form-group">
                    <label>How do you ensure quality in your work?</label>
                    <textarea
                        value={shopQuality}
                        onChange={(e) => setShopQuality(e.target.value)}
                        placeholder="Describe how you ensure the quality of your products"
                        
                    />
                </div>

                <div className="form-group">
                    <label>Tell us something unique about your creative process.</label>
                    <textarea
                        value={shopProcess}
                        onChange={(e) => setShopProcess(e.target.value)}
                        placeholder="Share your unique creative process"
                        
                    />
                </div>
{/* Social Media Links */}
<div className="form-group">
                    <label>Instagram Link</label>
                    <input
                        type="text"
                        value={instagramLink}
                        onChange={(e) => setInstagramLink(e.target.value)}
                        placeholder="Enter your Instagram link"
                    />
                </div>

                <div className="form-group">
                    <label>X (formerly Twitter) Link</label>
                    <input
                        type="text"
                        value={xLink}
                        onChange={(e) => setXLink(e.target.value)}
                        placeholder="Enter your X (formerly Twitter) link"
                    />
                </div>

                {/* Logo, Banner, Gallery */}
                <div className="form-group">
                    <label>Shop Logo</label>
                    <input type="file" accept="image/*" onChange={handleLogoChange} />
                    {logo && <img src={logo} alt="Shop Logo" style={{ maxWidth: "200px", marginTop: "10px" }} />}
                </div>
                <div className="form-group">
                    <label>Shop Banner</label>
                    <input type="file" accept="image/*" onChange={handleBannerChange} />
                    {banner && <img src={banner} alt="Shop Banner" style={{ maxWidth: "100%", marginTop: "10px" }} />}
                </div>
                <div className="form-group">
                    <label>Gallery</label>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
                    {gallery.length > 0 && (
                        <div className="gallery-preview">
                            {gallery.map((img, index) => (
                                <img key={index} src={img} alt={`Gallery ${index + 1}`} style={{ maxWidth: "100px", margin: "5px" }} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="saveChangesbtn-cont">
                    <button className="saveChangesbtn" type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};
