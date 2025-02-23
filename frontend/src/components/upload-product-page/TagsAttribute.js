import { useState } from "react";

export const TagsAttribute = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");

    const tagOptions = [
        "Handmade", "Jewelry", "Vintage", "Gift", "Custom", "Unique", "Natural", 
        "Minimalist", "Boho", "Rustic", "Modern", "Eco-friendly", "Luxury"
    ];

    const addTag = () => {
        if (selectedTag && tags.length < 13 && !tags.includes(selectedTag)) {
            setTags([...tags, selectedTag]);
            setSelectedTag(""); // Reset dropdown
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="upload-product-sections">
            <p className="main-title-section">Tags and Attributes</p>
            <p className="main-desc-section">
                Share specifics about your item to make it easier to find in search and 
                help buyers know what to expect.
            </p>

            <div className="line-2"></div>
            <div className="upload-about-section">
                <div className="price-quantity">
                    <p className="info-about-product">Primary Colour:</p>
                    <input className="input-about-product" placeholder="Enter primary colour" />

                    <p className="info-about-product">Secondary Colour:</p>
                    <input className="input-about-product" placeholder="Enter secondary colour" />

                    <p className="info-about-product">Tags:</p>
                    <p>Add up to 13 tags to help people find your listings</p>

                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <span key={index} className="tag">
                                {tag}
                                <button className="remove-tag" onClick={() => removeTag(tag)}>×</button>
                            </span>
                        ))}
                    </div>

                    <div className="tag-selection">
                        <select className="input-about-product-price" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                            <option value="">Select a tag</option>
                            {tagOptions.map((tag, index) => (
                                <option key={index} value={tag}>{tag}</option>
                            ))}
                        </select>
                        <button className="add-tag-button" onClick={addTag} disabled={tags.length >= 13}>+ Add Tag</button>
                    </div>

                    <p className="info-about-product">Materials:</p>
                    <p>Buyers value transparency - tell them what’s used to make your item</p>
                    <input className="input-about-product" placeholder="Enter materials used" />
                </div>
            </div>
        </div>
    );
};
