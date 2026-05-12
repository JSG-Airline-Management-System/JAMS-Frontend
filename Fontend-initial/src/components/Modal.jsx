import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, width = 'max-w-[520px]', hideCloseButton = false }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#2D2D2D]/50 backdrop-blur-[2px] animate-fade-in"
        onClick={() => onClose && onClose()}
      />
      
      {/* Modal Container */}
      <div className={`relative w-full ${width} bg-white rounded-2xl shadow-2xl animate-modal-slide-up flex flex-col max-h-[90vh]`}>
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className="flex items-center justify-between px-7 py-5 border-b border-[#F0EDF5]">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">{title}</h2>
            {!hideCloseButton && (
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#F0EDF5] text-text-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-7 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
