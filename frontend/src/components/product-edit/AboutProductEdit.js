import { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import { Link } from "react-router-dom";
import arrow from "../shop-view-seller/pics/arrow.png";
import "./EditProduct.css";
export const EditProduct = () => {
  // New state for image

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Menu />

      <div className="sellers-settings-section">
        <div className="edit-section-title">
          <Link to="/your-shop" className="go-back">
            <img src={arrow} alt="arrow" className="arrow" />
          </Link>
          <p className="edit-featured-title">Edit your product!</p>
        </div>

        <AboutProductEdit />
        <DeliveryEdit />
        <PricingInfoEdit />
        <TagsAttributeEdit />
        <DeliveryEdit />
        <ReturnsEdit />

        <div className="button-submit">
          <button>Apply Changes</button>
        </div>
      </div>
    </div>
  );
};

export const AboutProductEdit = () => {
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview
    }
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="upload-product-sections">
      <p className="main-title-section">About</p>
      <p className="main-desc-section">
        Tell the world all about your item and why they’ll love it
      </p>

      <div className="line-2"></div>
      <div className="upload-about-section">
        <p className="info-about-product">Title: </p>
        <input
          className="input-about-product"
          placeholder="Ex: Natural Baltic Amber Handmade Sterling Silver Earrings"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="upload-about-section">
        <p className="info-about-product">Description: </p>
        <textarea
          className="input-about-product-desc"
          placeholder="Enter item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="upload-about-section">
        <p className="info-about-product">Category: </p>
        <select
          className="input-about-product"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="jewelry">Jewelry</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="home_decor">Home Decor</option>
          <option value="art">Art</option>
        </select>
      </div>

      <div className="image-upload-section">
        <p className="image-upload-title">Product Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-upload-input"
        />

        {image && (
          <img src={image} alt="Product Preview" className="image-preview" />
        )}
      </div>
    </div>
  );
};

export const DeliveryEdit = () => {
  const [processingTime, setProcessingTime] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [itemSize, setItemSize] = useState("");

  return (
    <div className="upload-product-sections">
      <p className="main-title-section">Delivery</p>
      <p className="main-desc-section">
        Give shoppers clear expectations about delivery time and cost by making
        sure your delivery info is accurate, including your order processing
        schedule. You can make update any time in Delivery Settings
      </p>

      <div className="line-2"></div>
      <div className="upload-about-section">
        <p className="info-about-product">Approximate Order Processing:</p>
        <input
          className="input-about-product-price"
          placeholder="4"
          value={processingTime}
          onChange={(e) => setProcessingTime(e.target.value)}
        />

        <p className="info-about-product">Item weight:</p>
        <input
          className="input-about-product-price"
          placeholder="0.2kg"
          value={itemWeight}
          onChange={(e) => setItemWeight(e.target.value)}
        />

        <p className="info-about-product">Item size:</p>
        <input
          className="input-about-product-price"
          placeholder="2mm"
          value={itemSize}
          onChange={(e) => setItemSize(e.target.value)}
        />
      </div>
    </div>
  );
};

export const PricingInfoEdit = () => {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <div className="upload-product-sections">
      <p className="main-title-section">Price and Description</p>
      <p className="main-desc-section">
        Set a price for your item and indicates how many are available for sale{" "}
      </p>

      <div className="line-2"></div>
      <div className="upload-about-section">
        <p className="info-about-product">Price:*</p>
        <input
          className="input-about-product-price"
          placeholder="CAD$"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <p className="info-about-product">Quantity:*</p>
        <input
          className="input-about-product-price"
          placeholder="Number of items to sell"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
    </div>
  );
};

export const ReturnsEdit = () => {
  const [policy, setPolicy] = useState(true); // true for '30 days', false for custom

  return (
    <div>
      <div className="upload-product-sections">
        <p className="main-title-section">Returns and exchanges *</p>
        <div className="simple-policy-cont">
          <div>
            <p className="info-about-product">Simply Policy - 30 Days</p>
          </div>
          <div className="return-excahnge-policy-info">
            <p>
              Buyer is responsible for return postage costs and any loss in
              value if any item is not returned in original condition
            </p>
            <button onClick={() => setPolicy(!policy)}>
              {policy ? "Apply This Policy" : "Apply Custom Policy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TagsAttributeEdit = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

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
        <p className="info-about-product">Primary Colour:</p>
        <input
          className="input-about-product"
          placeholder="Enter primary colour"
        />

        <p className="info-about-product">Secondary Colour:</p>
        <input
          className="input-about-product"
          placeholder="Enter secondary colour"
        />

        <p className="info-about-product">Tags:</p>
        <p>Add up to 13 tags to help people find your listings</p>

        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button className="remove-tag" onClick={() => removeTag(tag)}>
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
          Buyers value transparency - tell them what’s used to make your item
        </p>
        <input
          className="input-about-product"
          placeholder="Enter materials used"
        />
      </div>
    </div>
  );
};
