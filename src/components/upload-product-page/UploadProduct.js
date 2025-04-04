import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { ref,deleteObject } from "firebase/storage";
import { AnimatedSection } from "../animation/AnimatedSection";
import Footer from "../footer/Foooter";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./UploadProduct.css";
import { categories } from "../main-page/categories/CategoryMenu";
import ImageUploader from "./ImageUploader";
import { auth } from "../../firebase"; // Ensure Firebase auth is imported
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DraggableImage } from "../product-edit/EditProduct";


export const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [availableSubSubCategories, setAvailableSubSubCategories] = useState([]);
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
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Generate a new product ID when the component loads
    const newProductRef = doc(collection(db, "products"));
    setProductId(newProductRef.id);
  }, []);

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
  const occasionTags = [
    "Gift",
    "Birthday",
    "Christmas",
    "Valentine's Day",
    "Wedding",
    "Anniversary",
    "Baby Shower",
    "Housewarming",
    "Graduation",
    "Mother's Day",
    "Father's Day",
    "Bridal Shower",
    "Halloween",
    "Thanksgiving",
    "Easter",
    "New Year",
    "Hanukkah",
  ];

  const recipientTags = [
    "For Him",
    "For Her",
    "For Kids",
    "For Pets",
    "For Couples",
    "For Friends",
    "For Family",
    "For Parents",
    "For Grandparents",
    "For Teachers",
    "For Boss",
  ];

  const regularTags = [
    "Minimalist",
    "Boho",
    "Rustic",
    "Modern",
    "Vintage",
    "Classic",
    "Chic",
    "Trendy",
    "Abstract",
    "Industrial",
    "Cottagecore",
    "Aesthetic",
    "Kawaii",
    "Steampunk",
    "Wooden",
    "Metal",
    "Leather",
    "Resin",
    "Beaded",
    "Fabric",
    "Glass",
    "Ceramic",
  ];

  const [selectedOccasionTag, setSelectedOccasionTag] = useState("");
  const [selectedRecipientTag, setSelectedRecipientTag] = useState("");
  const [selectedRegularTag, setSelectedRegularTag] = useState("");
  const handleAddTag = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < 13) {
      setTags([...tags, newTag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDeleteImage = async (imageUrl) => {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    setUploadedURLs(uploadedURLs.filter((url) => url !== imageUrl));
  };

  const handleReorder = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = uploadedURLs.indexOf(active.id);
    const newIndex = uploadedURLs.indexOf(over.id);
    const newArray = arrayMove(uploadedURLs, oldIndex, newIndex);
    
    setUploadedURLs(newArray);
  };


  const handleSubmit = async () => {
    const user = auth.currentUser; // Get the logged-in user
  
    if (!user) {
      alert("You must be logged in to upload a product.");
      return;
    }
  
    const sellerId = user.uid; // Get the seller's unique Firebase UID
  
    // List of required fields (excluding secondaryColour)
    const requiredFields = {
      title,
      description,
      customized,
      category,
      subCategory,
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
    
    // Only require subSubCategory if options exist
    if (availableSubSubCategories.length > 0) {
      requiredFields.subSubCategory = subSubCategory;
    }
    
    const emptyFields = Object.entries(requiredFields).filter(
      ([key, value]) => value === undefined || value === "" || (Array.isArray(value) && value.length === 0)
    );
  
    if (emptyFields.length > 0) {
      alert(`Please fill out all required fields: ${emptyFields.map(([key]) => key).join(", ")}`);
      return;
    }
  
    if (uploadedURLs.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }
  
    try {
      await addDoc(collection(db, "products"), {
        ...requiredFields,
        materials: materials.split(",").map((m) => m.trim()),
        price: parseFloat(price),
        quantity: parseInt(quantity),
        photos: uploadedURLs, // Save uploaded image URLs in the product document
        secondaryColour,
        createdAt: new Date(),
        sellerId, // Attach the seller's ID to the product
        sales: 0,
        status: "pending"
      });
      navigate("/your-shop");
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

            <ImageUploader productId={productId} onUploadComplete={(newURLs) => setUploadedURLs((prev) => [...prev, ...newURLs])} />

{/* ✅ Styled Image Upload Section */}
<div className="image-upload-section-2">
  <p>Uploaded Images:</p>
  <DndContext collisionDetection={closestCenter} onDragEnd={handleReorder}>
    <SortableContext items={uploadedURLs}>
      <div className="image-preview-list-2">
        {uploadedURLs.map((imageUrl, index) => (
          <DraggableImage key={imageUrl} imageUrl={imageUrl} index={index} handleDelete={handleDeleteImage} />
        ))}
      </div>
    </SortableContext>
  </DndContext>
</div>
            <div className="upload-about-section">
              <p className="info-about-product">Description: </p>
              <p>
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description
              </p>
              <textarea
                className="input-about-product-desc"
                placeholder="Ex: A sweet elegant pair of earrings designed and hand crafted using 6mm round genuine Baltic Amber gemstones complemented with all 925 sterling silver components."
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
      required={availableSubSubCategories.length > 0} // Only required if there are options
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
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Occasion Tags */}
                  <div className="tag-selection">
                    <p>Occasion Tags:</p>
                    <select
                      className="input-about-product"
                      value={selectedOccasionTag}
                      onChange={(e) => {
                        setSelectedOccasionTag(e.target.value);
                        handleAddTag(e.target.value);
                      }}
                    >
                      <option value="">Select an occasion</option>
                      {occasionTags.map((tag, index) => (
                        <option key={index} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recipient Tags */}
                  <div className="tag-selection">
                    <p>Recipient Tags:</p>
                    <select
                      className="input-about-product"
                      value={selectedRecipientTag}
                      onChange={(e) => {
                        setSelectedRecipientTag(e.target.value);
                        handleAddTag(e.target.value);
                      }}
                    >
                      <option value="">Select a recipient</option>
                      {recipientTags.map((tag, index) => (
                        <option key={index} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Regular Tags */}
                  <div className="tag-selection">
                    <p>Regular Tags:</p>
                    <select
                      className="input-about-product"
                      value={selectedRegularTag}
                      onChange={(e) => {
                        setSelectedRegularTag(e.target.value);
                        handleAddTag(e.target.value);
                      }}
                    >
                      <option value="">Select a tag</option>
                      {regularTags.map((tag, index) => (
                        <option key={index} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
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
