import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase"; 
import { useAuth } from "../../context/AuthContext"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 

export const AddReview = ({ itemId, onReviewAdded }) => {
  const { user } = useAuth(); 
  const [review, setReview] = useState({ rating: 5, comment: "", images: [] });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  // Handle multiple image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setReview((prev) => ({ ...prev, images: [...prev.images, ...files] }));
      setPreviewImages((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    }
  };

  // Remove image preview on double-click
  const removeImage = (index) => {
    setReview((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You need to be logged in to leave a review.");
      return;
    }

    if (review.comment.trim().length < 5) {
      setError("Review must be at least 5 characters long.");
      return;
    }

    setUploading(true);
    let imageUrls = [];

    // Upload images to Firebase Storage
    for (const image of review.images) {
      try {
        const storageRef = ref(storage, `reviews/${itemId}/${Date.now()}-${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload images.");
        setUploading(false);
        return;
      }
    }

    // Save review in Firestore
    const reviewData = {
      itemId,
      userId: user.uid,
      username: user.username || "Anonymous",
      rating: review.rating,
      comment: review.comment,
      timestamp: serverTimestamp(),
      imageUrls, // Store array of uploaded image URLs
    };

    try {
      await addDoc(collection(db, "reviews"), reviewData);
      setReview({ rating: 5, comment: "", images: [] });
      setPreviewImages([]);
      onReviewAdded(reviewData);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-review">
      <p className="item-details-title">Write Your Review</p>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="rating-choose">
          <label>Rating:</label>
          <select
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Stars
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          placeholder="Write your review..."
        />

        <div className="image-upload">
          <label>Upload Images:</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Image Preview */}
        <div className="image-preview">
          {previewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Preview"
              className="preview-img"
              onDoubleClick={() => removeImage(index)}
            />
          ))}
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {/* Styling */}
      <style jsx>{`
        .image-preview {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .preview-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid #ddd;
          transition: transform 0.2s ease;
        }
        .preview-img:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};
