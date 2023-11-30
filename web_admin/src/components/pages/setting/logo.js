import React, { useState } from 'react';
import axios from 'axios';
import { CloudinaryUploadWidget } from 'react-cloudinary-uploader';

const LogoUploader = () => {
  const [logoUrl, setLogoUrl] = useState('');

  const handleSuccess = (response) => {
    // Cloudinary returns the uploaded image details
    const imageUrl = response.secure_url;
    setLogoUrl(imageUrl);

    // You can also send the image URL to your backend for storage in the database
    // Example: Send imageUrl to your backend using axios.post('/api/upload-logo', { imageUrl })
  };

  const handleFailure = (error) => {
    console.error('Logo upload failed:', error);
  };

  return (
    <div>
      <h2>Logo Uploader</h2>

      {/* Cloudinary Logo Uploader */}
      <CloudinaryUploadWidget
        cloudName="your-cloud-name"  // Replace with your Cloudinary cloud name
        uploadPreset="your-upload-preset"  // Replace with your Cloudinary upload preset
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        buttonText="Upload Logo"
      />

      {/* Display the uploaded logo */}
      {logoUrl && (
        <div>
          <h3>Uploaded Logo:</h3>
          <img src={logoUrl} alt="Logo" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default LogoUploader;
