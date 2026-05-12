import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const ChangeAvatarDialog = ({ isOpen, onClose, onAvatarChange, hasAvatar }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = async () => {
    setUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    onAvatarChange(preview);
    setUploading(false);
    setPreview(null);
    onClose();
  };

  const handleRemove = async () => {
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onAvatarChange(null);
    setUploading(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Change Avatar" 
      width="max-w-[380px]"
    >
      <div className="space-y-6 flex flex-col items-center">
        {preview ? (
          <div className="relative w-32 h-32">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" 
            />
            <button 
              onClick={() => setPreview(null)}
              className="absolute -top-2 -right-2 bg-[#D9534F] text-white p-1 rounded-full shadow-md hover:bg-[#D9534F]/90"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border-4 border-white shadow-inner">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        <div className="w-full space-y-3">
          <label className="block">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <div className="w-full py-3 px-4 bg-[#C9748A] text-white rounded-xl font-bold text-center cursor-pointer hover:bg-[#C9748A]/90 transition-all active:scale-[0.98]">
              {preview ? "Change Selection" : "Upload Photo"}
            </div>
          </label>

          {hasAvatar && !preview && (
            <button 
              onClick={handleRemove}
              disabled={uploading}
              className="w-full text-[#D9534F] font-bold text-sm hover:underline py-2 disabled:opacity-50"
            >
              Remove Current Photo
            </button>
          )}

          {preview && (
            <Button 
              className="w-full bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white rounded-xl py-3 border-0"
              onClick={handleApply}
              disabled={uploading}
            >
              {uploading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Apply Avatar"}
            </Button>
          )}

          <Button 
            variant="text" 
            className="w-full"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeAvatarDialog;
