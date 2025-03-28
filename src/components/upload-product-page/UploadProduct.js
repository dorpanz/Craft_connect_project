import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AnimatedSection } from "../animation/AnimatedSection";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./UploadProduct.css";
import { categories } from "../main-page/categories/CategoryMenu";
import ImageUploader from "./ImageUploader";

export const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [availableSubSubCategories, setAvailableSubSubCategories] = useState(
    []
  );
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [customized, setCustomized] = useState(false);
  const [primaryColour, setPrimaryColour] = useState("");
  const [secondaryColour, setSecondaryColour] = useState("");
  const [materials, setMaterials] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);
  useEffect(() => {
    // Reset subcategory and sub-subcategory when category changes
    setSubCategory("");
    setSubSubCategory("");

    // Update available subcategories based on selected category
    if (category && categories[category]) {
      const subCategories = Object.keys(categories[category]);
      setAvailableSubCategories(subCategories);

      // Clear sub-subcategory if no subcategories are available
      if (subCategories.length === 0) {
        setAvailableSubSubCategories([]);
      }
    } else {
      setAvailableSubCategories([]);
      setAvailableSubSubCategories([]);
    }
  }, [category]);

  useEffect(() => {
    // Update available sub-subcategories based on selected subcategory
    if (subCategory && categories[category][subCategory]) {
      const subSubCategories = categories[category][subCategory];
      setAvailableSubSubCategories(subSubCategories);
    } else {
      setAvailableSubSubCategories([]);
    }
  }, [category, subCategory]);

  const handleUploadComplete = (newUploadedURLs) => {
    setUploadedURLs(newUploadedURLs);
  };
  const tagOptions = [
    "Handmade",
    "Jewelry",
    "Vintage",
    "Gift",
    "Custom",
    "Unique",
    "Natural",
    "Minimalist",
    "Boho",
    "Rustic",
    "Modern",
    "Eco-friendly",
    "Luxury",
  ];

  const addTag = () => {
    if (selectedTag && tags.length < 13 && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag(""); // Reset dropdown
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };const handleSubmit = async () => {
    // List of required fields (excluding secondaryColour)
    const requiredFields = {
      title,
      description,
      customized,
      category,
      subCategory,
      subSubCategory,
      tags,
      primaryColour,
      materials,
      price,
      quantity,
      weight,
      height,
      width,
      processingTime,
      shippingCost,
      returnPolicy,
    };

    // Check for any empty required fields
    const emptyFields = Object.entries(requiredFields).filter(([key, value]) => {
      return value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    });

    if (emptyFields.length > 0) {
      alert(`Please fill out all required fields: ${emptyFields.map(([key]) => key).join(", ")}`);
      return;
    }

    if (uploadedURLs.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }

    try {
      // Submit the form data to Firestore
      await addDoc(collection(db, "products"), {
        ...requiredFields,
        materials: materials.split(",").map((m) => m.trim()), // Ensure materials are formatted properly
        price: parseFloat(price),
        quantity: parseInt(quantity),
        photos: uploadedURLs, // Use the uploaded image URLs
        secondaryColour, // Include secondaryColour even if it's optional
        createdAt: new Date(),
      });

      alert("Product uploaded successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product.");
    }
  };
  

  return (
    <div>
      <Menu />
      <div className="sellers-settings-section">
      <AnimatedSection>
          <div className="edit-section-title">
            <Link to="/your-shop-dashboard" className="go-back">
              <img src={arrow} alt="arrow" className="arrow" />
            </Link>
            <p className="edit-featured-title">Upload your product!</p>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="upload-product-sections">
            <p className="main-title-section">About</p>
            <p className="main-desc-section">
              Tell the world all about your item and why they’ll love it
            </p>

            <div className="line-2"></div>
            <div className="upload-about-section">
              <p className="info-about-product">Title: </p>
              <p>
                Include the keywords that buyers would use to search for this
                item
              </p>
              <input
                className="input-about-product"
                type="text"
                placeholder="Ex: Natural Baltic Amber Handmade Sterling Silver Earrings"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* <div className="upload-about-section">
              <p className="info-about-product">Photos and Videos: </p>
              <p>Add up to 10 photos and 1 video</p>
              <div className="picture-upload-section">
                <input type="file" multiple onChange={(e) => handlePhotoUpload(e.target.files)} />
              </div>
            </div> */}
            <ImageUploader onUploadComplete={handleUploadComplete} />
            <div className="upload-about-section">
              <p className="info-about-product">Description: </p>
              <p>
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description
              </p>
              <textarea
                className="input-about-product-desc"
                placeholder="Ex: A sweet elegant pair of earrings designed and hand crafted using 6mm round genuine Baltic Amber gemstones complemented with all 925 sterling silver components.
                  These earrings will make a much appreciated gift for ladies of all age groups whom love this natural untreated gemstone. They can be worn on a daily bases for long periods of time without bragging and damaging the ear lobs because they are comfortable and lightweight. I have made myself a pair so I am speaking from experience."
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <p className="info-about-product">Is your Item customized?</p>
            <label>
              <input
                type="checkbox"
                onChange={(e) => setCustomized(e.target.checked)}
              />
              Customized
            </label>
            <div className="upload-about-section">
              <p className="info-about-product">Category: </p>
              <select
                className="input-about-product"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {Object.keys(categories).map((categoryKey) => (
                  <option key={categoryKey} value={categoryKey}>
                    {categoryKey}
                  </option>
                ))}
              </select>
            </div>

            {category && availableSubCategories.length > 0 && (
              <div className="upload-about-section">
                <p className="info-about-product">Subcategory: </p>
                <select
                  className="input-about-product"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                >
                  <option value="">Select a subcategory</option>
                  {availableSubCategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {subCategory && availableSubSubCategories.length > 0 && (
              <div className="upload-about-section">
                <p className="info-about-product">Sub-subcategory: </p>
                <select
                  className="input-about-product"
                  value={subSubCategory}
                  onChange={(e) => setSubSubCategory(e.target.value)}
                  required
                >
                  <option value="">Select a sub-subcategory</option>
                  {availableSubSubCategories.map((subSub, index) => (
                    <option key={index} value={subSub}>
                      {subSub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="upload-product-sections">
            <p className="main-title-section">Tags and Attributes</p>
            <p className="main-desc-section">
              Share specifics about your item to make it easier to find in
              search and help buyers know what to expect.
            </p>

            <div className="line-2"></div>
            <div className="upload-about-section">
              <div className="price-quantity">
                <p className="info-about-product">Primary Colour:</p>
                <input
                  type="text"
                  placeholder="Primary Colour"
                  className="input-about-product"
                  onChange={(e) => setPrimaryColour(e.target.value)}
                  required
                />

                <p className="info-about-product">Secondary Colour:</p>
                <input
                  type="text"
                  placeholder="Secondary Colour"
                  className="input-about-product"
                  onChange={(e) => setSecondaryColour(e.target.value)}
                />
                <p className="info-about-product">Tags:</p>
                <p>Add up to 13 tags to help people find your listings</p>

                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button
                        className="remove-tag"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="tag-selection">
                  <select
                    className="input-about-product-price"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    required
                  >
                    <option value="">Select a tag</option>
                    {tagOptions.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <button
                    className="add-tag-button"
                    onClick={addTag}
                    disabled={tags.length >= 13}
                  >
                    + Add Tag
                  </button>
                </div>

                <p className="info-about-product">Materials:</p>
                <p>
                  Buyers value transparency - tell them what’s used to make your
                  item
                </p>
                <input
                  className="input-about-product"
                  type="text"
                  placeholder="Materials (comma separated)"
                  onChange={(e) => setMaterials(e.target.value)}
                  required
                />

                <p className="info-about-product">Weight:</p>
                <p>Enter weight in kg: </p>
                <input
                  className="input-about-product"
                  type="number"
                  placeholder="Ex: 0.5"
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />

                <p className="info-about-product">Size:</p>
                <p>Enter size in cm:</p>
                <input
                  className="input-about-product-hw"
                  type="number"
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <input
                  className="input-about-product-hw"
                  type="number"
                  placeholder="Width"
                  onChange={(e) => setWidth(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="upload-product-sections">
            <p className="main-title-section">Price and Description</p>
            <p className="main-desc-section">
              Set a price for your item and indicates how many are available for
              sale{" "}
            </p>

            <div className="line-2"></div>
            <div className="upload-about-section">
              <div className="price-quantity">
                <p className="info-about-product">Price:</p>
                <input
                  type="number"
                  className="input-about-product-price"
                  placeholder="CAD$"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <p className="info-about-product">Quantity:</p>
                <input
                  type="number"
                  className="input-about-product-price"
                  placeholder="Number of items to sell"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="upload-product-sections">
            <p className="main-title-section">Delievery</p>
            <p className="main-desc-section">
              Give shoppers clear expectations about delivery time and cost by
              making sure your delivery info is accurate, including your order
              processing schedule. You can make update any time in Delivery
              Settings
            </p>

            <div className="line-2"></div>
            <div className="upload-about-section">
              <div className="price-quantity">
                <p className="info-about-product">
                  Approximate Order Processing (days):
                </p>
                <input
                  type="number"
                  className="input-about-product-price"
                  placeholder="4"
                  onChange={(e) => setProcessingTime(e.target.value)}
                  required
                />

                <p className="info-about-product">Shipping Cost:</p>
                <input
                  type="number"
                  className="input-about-product-price"
                  placeholder="CAD$"
                  onChange={(e) => setShippingCost(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div>
            <div className="upload-product-sections">
              <p className="main-title-section">Returns and exchanges *</p>
              <div className="simple-policy-cont">
                <div>
                  <p className="info-about-product">Simply Policy - 30 Days</p>
                </div>
                <div className="return-excahnge-policy-info">
                  <p>
                    Buyer is responsible for return postage costs and any loss
                    in value if any item is not returned in original condition
                  </p>
                  <input
                    type="checkbox"
                    placeholder="Return Policy"
                    onChange={(e) => setReturnPolicy(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <div className="button-submit">
          <button onClick={handleSubmit}>Save and Post</button>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  );
};
