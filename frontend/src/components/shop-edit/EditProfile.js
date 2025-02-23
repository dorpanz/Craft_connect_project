import { useState, useEffect } from "react";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import './EditProfile.css';
import { AnimatedSection } from "../animation/AnimatedSection";
import arrow from "../shop-view-seller/pics/arrow.png"
import { Link } from "react-router-dom";

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
                <OurStoryEditSection />
            </AnimatedSection>
            <AnimatedSection>
                <SecuritySection />
            </AnimatedSection>

            <AnimatedSection>
                <PrivateInformationSection />
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
    const [gallery, setGallery] = useState([]);
    const back = "Go back"
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file)); 
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGallery(files.map((file) => URL.createObjectURL(file))); 
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        
        console.log("Profile updated:", { shopName, shopDescription, logo, gallery });
    };

    return (
        <div className="account-section">


            <div className="edit-section-title">
                <Link to="/your-shop" className="go-back"><img src={arrow} alt="arrow" className="arrow"/></Link>
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                    {logo && <img src={logo} alt="Shop Logo" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                </div>
                <div className="form-group">
                    <label>Banner</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                    />
                    {gallery.length > 0 && (
                        <div className="gallery-preview">
                            {gallery.map((img, index) => (
                                <img key={index} src={img} alt={`Gallery Image ${index + 1}`} style={{ maxWidth: '100px', margin: '5px' }} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="saveChangesbtn-cont">
                <button className="saveChangesbtn" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


const SecuritySection = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="account-section">
            <h2>Security</h2>
            <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="saveChangesbtn-cont">
                <button className="saveChangesbtn" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


const PrivateInformationSection = () => {
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSaveChanges = (e) => {
        e.preventDefault();
        
    };

    return (
        <div className="account-section">
            <h2>Private Information</h2>
            <form onSubmit={handleSaveChanges}>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="saveChangesbtn-cont">
                <button className="saveChangesbtn" type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

const OurStoryEditSection = () => {
    const [about, setAbout] = useState("");
    const [gallery, setGallery] = useState([]);
    const [shortDescription, setShortDescription] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files); 
        const newGallery = files.map((file) => URL.createObjectURL(file)); 
        setGallery((prevGallery) => [...prevGallery, ...newGallery]); 
    };
    

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    return (
        <div className="account-section">
            <h2>Edit Your Story</h2>
            <form>
                <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Enter a brief description"
                    />
                </div>
                <div className="form-group">
                    <label>About</label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Tell your story..."
                        
                    />
                </div>
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                    />
                    {profilePic && <img src={profilePic} alt="Profile" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                </div>
                <div className="form-group">
                    <label>Gallery</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                    />
                    {gallery.length > 0 && (
                        <div className="gallery-preview">
                            {gallery.map((img, index) => (
                                <img key={index} src={img} alt={`Gallery Image ${index + 1}`} style={{ maxWidth: '100px', margin: '5px' }} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="saveChangesbtn-cont">
                    <button className="saveChangesbtn" type="submit" disabled={gallery.length < 3}>
                        {gallery.length < 3 ? "Select at least 3 images" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};
