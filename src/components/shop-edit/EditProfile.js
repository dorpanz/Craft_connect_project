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
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    setLogo(data.logo || null);
                    setBanner(data.banner || null);
                    setGallery(data.gallery || []);
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
    
                // Ensure Firestore updates with the new banner URL
                const sellerRef = doc(db, "sellers", auth.currentUser.uid);
                await updateDoc(sellerRef, { banner: bannerUrl });
    
                console.log("Banner updated successfully!");
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
    
                // Ensure Firestore updates with the new gallery
                const sellerRef = doc(db, "sellers", auth.currentUser.uid);
                await updateDoc(sellerRef, { gallery: updatedGallery });
    
                console.log("Gallery updated successfully!");
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
                logo,
                banner,
                gallery,
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
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Shop Description</label>
                    <textarea
                        value={shopDescription}
                        onChange={(e) => setShopDescription(e.target.value)}
                        placeholder="Enter a brief description of your shop"
                        required
                    />
                </div>
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
