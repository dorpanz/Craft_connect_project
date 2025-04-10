import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./EditProduct.css";
import ImageUploader from "../upload-product-page/ImageUploader";
import arrow from "../shop-view-seller/pics/arrow.png";
import { AnimatedSection } from "../animation/AnimatedSection";
import Menu from "../menu/Menu";
import "../upload-product-page/UploadProduct.css";
import { categories } from "../main-page/categories/CategoryMenu";
import Footer from "../footer/Foooter";

// ✅ Draggable Image Component
export const DraggableImage = ({ imageUrl, index, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageUrl });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="image-preview-item-2"
    >
      <img
        src={imageUrl}
        alt={`Uploaded ${index}`}
        className="image-preview-2"
      />
      <button
        onClick={() => handleDelete(imageUrl)}
        className="delete-image-btn"
      >
        &times;
      </button>
    </div>
  );
};

export const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [uploadedURLs, setUploadedURLs] = useState([]);
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
  const [customized, setCustomized] = useState();
  const [primaryColour, setPrimaryColour] = useState("");
  const [secondaryColour, setSecondaryColour] = useState("");
  const [materials, setMaterials] = useState("");
  const [quantity, setQuantity] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const product = productSnap.data();
        setUploadedURLs(product.photos);
        setTitle(product.title || "");
        setPrice(product.price || "");
        setDescription(product.description || "");
        setCategory(product.category || "");
        setSubCategory(product.subCategory || "");
        setSubSubCategory(product.subSubCategory || "");
        setTags(product.tags || []);
        setPrimaryColour(product.primaryColour || "");
        setSecondaryColour(product.secondaryColour || "");
        setHeight(product.height || "");
        setWidth(product.width || "");
        setMaterials(product.materials || "");
        setWeight(product.weight || "");
        setCustomized(product.customized || false);
        setQuantity(product.quantity || "");
        setShippingCost(product.shippingCost || "");
        setProcessingTime(product.processingTime || "");
      }
    };

    fetchProduct();
  }, [productId]);

  // Update available subcategories when category changes
  useEffect(() => {
    if (category && categories[category]) {
      setAvailableSubCategories(Object.keys(categories[category]));
    } else {
      setAvailableSubCategories([]);
      setAvailableSubSubCategories([]);
    }
  }, [category]);
  // Function to add a tag
  const occasionTags = [
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
    "Halloween",
    "Thanksgiving",
    "Easter",
    "New Year",
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
  const handleDeleteProduct = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");

    if (!isConfirmed) return;

    try {
      if (!productId) return;

      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);  // Delete product document from Firestore

      alert("Product deleted successfully!");
      navigate("/your-shop");  // Redirect to your shop or another page after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };
  // Function to remove a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  // Update available sub-subcategories when subcategory changes
  useEffect(() => {
    if (subCategory && categories[category]?.[subCategory]) {
      setAvailableSubSubCategories(categories[category][subCategory]);
    } else {
      setAvailableSubSubCategories([]);
    }
  }, [subCategory, category]);

  const handleUpdate = async () => {
    try {
      if (!productId) return;

      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        photos: uploadedURLs || [],
        title: title || "",
        description: description || "",
        category: category || "",
        subCategory: subCategory || "",
        subSubCategory: subSubCategory || "",
        tags: tags || [],
        primaryColour: primaryColour || "",
        secondaryColour: secondaryColour || "",
        height: height || "",
        width: width || "",
        materials: materials || "",
        weight: weight || "",
        customized: customized || false,
        quantity: quantity || 0,
        processingTime: parseFloat(processingTime) || "",
        shippingCost: parseFloat(shippingCost) || "",
        price: parseFloat(price) || 0
      });

      alert("Product updated successfully!");
      navigate("/your-shop");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
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
            <p className="edit-featured-title">Edit your product!</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="upload-product-sections">
            <p className="main-title-section">About</p>
            <div className="line-2"></div>

            {/* ✅ Input Fields for Existing Product Details */}
            <div className="upload-about-section">
              <p className="info-about-product">Title:</p>
              <input
                className="input-about-product"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="upload-about-section">
              <p className="info-about-product">Description:</p>
              <textarea
                className="input-about-product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="upload-about-section">
              <p className="info-about-product">Price:</p>
              <input
                className="input-about-product"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="info-about-product">Quantity:</p>
              <input
                type="number"
                value={quantity}
                className="input-about-product-price"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            {/* ✅ Image Uploader */}
            <ImageUploader
              productId={productId}
              onUploadComplete={(newURLs) =>
                setUploadedURLs((prev) => [...prev, ...newURLs])
              }
            />

            {/* ✅ Draggable Image List */}
            <div className="image-upload-section-2">
              <p>Uploaded Images:</p>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleReorder}
              >
                <SortableContext items={uploadedURLs}>
                  <div className="image-preview-list-2">
                    {uploadedURLs.map((imageUrl, index) => (
                      <DraggableImage
                        key={imageUrl}
                        imageUrl={imageUrl}
                        index={index}
                        handleDelete={handleDeleteImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

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

            <p className="info-about-product">Is your Item customized?</p>
            <label>
              <input
                type="checkbox"
                checked={customized}
                onChange={(e) => setCustomized(e.target.checked)}
              />
              Customized
            </label>
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
                  value={primaryColour}
                  className="input-about-product"
                  onChange={(e) => setPrimaryColour(e.target.value)}
                  required
                />

                <p className="info-about-product">Secondary Colour:</p>
                <input
                  type="text"
                  value={secondaryColour}
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
                <input
                  className="input-about-product"
                  value={materials}
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
                  value={weight}
                  placeholder="Ex: 0.5"
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />

                <p className="info-about-product">Size:</p>
                <p>Enter size in cm:</p>
                <label>Height: </label>
                <input
                  className="input-about-product-hw"
                  type="number"
                  value={height}
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <label>Width: </label>
                <input
                  className="input-about-product-hw"
                  type="number"
                  value={width}
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
            <p className="main-title-section">Delievery</p>

            <div className="line-2"></div>
            <div className="upload-about-section">
              <div className="price-quantity">
                <p className="info-about-product">
                  Approximate Order Processing (days):
                </p>
                <input
                  type="number"
                  className="input-about-product-price"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                  required
                />

                <p className="info-about-product">Shipping Cost:</p>
                <input
                  type="number"
                  className="input-about-product-price"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="button-submit">
            <button onClick={handleUpdate}>Apply Changes</button>
          </div>
          <div className="center-cont">
          <button onClick={handleDeleteProduct} className="delete-product-btn">
            Delete Product
          </button>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </div>
  );
};
