import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "../../firebase";

const ImageUploader = ({ onUploadComplete, productId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  // Fetch previously uploaded images for the specific product
  useEffect(() => {
    if (!productId) return; // Prevent fetching if productId is undefined

    const fetchUploadedImages = async () => {
      try {
        const imagesRef = ref(storage, `products/${productId}/images/`);
        const result = await listAll(imagesRef);

        if (result.items.length === 0) {
          console.log("No images found.");
          return;
        }

        const urls = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { url, ref: itemRef };
          })
        );

        setUploadedURLs(urls);
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
      }
    };

    fetchUploadedImages();
  }, [productId]);

  // Handle file selection
  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 10) {
      alert("You can only upload up to 10 photos.");
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // Upload selected files to Firebase Storage
  const handleUpload = async () => {
    if (!productId) {
      console.error("Error: productId is undefined!");
      return;
    }

    const newUploadedURLs = [];

    for (let file of selectedFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `products/${productId}/images/${fileName}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            try {
              const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
              newUploadedURLs.push({ url: fileURL, ref: fileRef });
              resolve();
            } catch (error) {
              console.error("Error getting file URL:", error);
              reject(error);
            }
          }
        );
      });
    }

    setUploadedURLs((prev) => [...prev, ...newUploadedURLs]);
    onUploadComplete(newUploadedURLs.map((item) => item.url)); // Send URLs to parent
    setSelectedFiles([]);  // Clear selected files
    setUploadProgress({});  // Reset upload progress
  };

  // Delete image from Firebase Storage
  const handleDeleteImage = async (fileRef, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (confirmDelete) {
      try {
        await deleteObject(fileRef);
        setUploadedURLs((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  // Delete selected preview image before upload
  const handleDeletePreviewImage = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this preview image?");
    if (confirmDelete) {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="upload-about-section">
      <p className="info-about-product">Photos and Videos:</p>
      <p>Add up to 10 photos</p>
      <div className="picture-upload-section">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelection}
        />
      </div>

      {/* Preview Selected Files Before Upload */}
      <div className="preview-section">
        {selectedFiles.map((file, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview ${index}`}
              className="preview-image"
              onDoubleClick={() => handleDeletePreviewImage(index)} // Double-click to delete preview
            />
            {uploadProgress[file.name] && (
              <p>Uploading: {Math.round(uploadProgress[file.name])}%</p>
            )}
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="uploadphotos-div">
        <button
          onClick={handleUpload}
          className="uploadphotosbtn"
          disabled={selectedFiles.length === 0}
        >
          Upload Photos
        </button>
      </div>

      {/* Display Uploaded Images */}
      {/* <div className="uploaded-images">
        {uploadedURLs.map((item, index) => (
          <div key={index} className="uploaded-image-container">
            <img
              src={item.url}
              alt={`uploaded ${index}`}
              className="uploaded-image"
              onDoubleClick={() => handleDeleteImage(item.ref, index)} // Double-click to delete uploaded image
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ImageUploader;
