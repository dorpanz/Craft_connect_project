import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

const ImageUploader = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 10) {
      alert("You can only upload up to 10 photos.");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleUpload = async () => {
    const newUploadedURLs = [];

    for (let file of selectedFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const fileRef = ref(storage, `products/${fileName}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
            newUploadedURLs.push({ url: fileURL, ref: fileRef });
            resolve();
          }
        );
      });
      console.log("Uploaded file ref:", fileRef)
    }
    setUploadedURLs(newUploadedURLs);
    onUploadComplete(newUploadedURLs.map((item) => item.url)); // Send URLs to parent
    setSelectedFiles([]);
    setUploadProgress({});
  };

  const handleDeleteImage = async (fileRef, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (confirmDelete) {
      try {
        console.log("Attempting to delete:", fileRef);
        await deleteObject(fileRef);
        console.log("File deleted successfully.");
        setUploadedURLs((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };
  

  const handleDeletePreviewImage = (file, index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this preview image?");
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

      <div className="preview-section">
        {selectedFiles.map((file, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview ${index}`}
              className="preview-image"
              onDoubleClick={() => handleDeletePreviewImage(file, index)} // Double-click to delete preview
            />
            {uploadProgress[file.name] && (
              <p>Uploading: {Math.round(uploadProgress[file.name])}%</p>
            )}
          </div>
        ))}
      </div>

      <div className="uploadphotos-div">
        <button
          onClick={handleUpload}
          className="uploadphotosbtn"
          disabled={selectedFiles.length === 0}
        >
          Upload Photos
        </button>
      </div>

      <div className="uploaded-images">
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
      </div>
    </div>
  );
};

export default ImageUploader;
