import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

  // Confirmation state
  const [showConfirm, setShowConfirm] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const handleDeleteImage = async (imageUrl) => {
    // Show confirmation window before deleting
    setImageToDelete(imageUrl);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    // Proceed with deletion if confirmed
    const storageRef = ref(storage, imageToDelete);
    await deleteObject(storageRef);
    setUploadedURLs(uploadedURLs.filter((url) => url !== imageToDelete));
    setShowConfirm(false); // Hide confirmation window
    setImageToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false); // Close confirmation window
    setImageToDelete(null);
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
        processingTime: processingTime || "",
        shippingCost: shippingCost || "",
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
            <div className="image-upload-section">
              <DndContext onDragEnd={handleReorder}>
                <SortableContext items={uploadedURLs} strategy={closestCenter}>
                  {uploadedURLs.map((imageUrl, index) => (
                    <DraggableImage
                      key={imageUrl}
                      index={index}
                      imageUrl={imageUrl}
                      handleDelete={handleDeleteImage}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>

            {/* ✅ Confirm Deletion Dialog */}
            {showConfirm && (
              <div className="confirmation-dialog">
                <p>Are you sure you want to delete this image?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            )}
          </div>
        </AnimatedSection>

        <div className="submit-btn">
          <button className="submit-button" onClick={handleUpdate}>
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};
