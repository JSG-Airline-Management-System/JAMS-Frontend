import React, { useState } from 'react';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import ErrorBanner from './ErrorBanner';

const UserActionDialog = ({ isOpen, onClose, onConfirm, user, type, simulateError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !user) return null;

  const isBlock = type === 'block';
  const title = isBlock ? `Block User — ${user.name}?` : `Activate User — ${user.name}?`;
  const confirmBtnText = isBlock ? 'Block User' : 'Activate User';
  const cancelBtnText = isBlock ? 'Keep Active' : 'Cancel';
  const accentColor = isBlock ? '#F5A623' : '#4CAF50';
  const secondaryColor = isBlock ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'bg-[#4CAF50]/10 text-[#4CAF50]';

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (simulateError) {
      setError(`Failed to ${type} user. Please try again.`);
      setIsLoading(false);
    } else {
      onConfirm(user.id, isBlock ? 'BLOCKED' : 'ACTIVE');
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" width="max-w-[420px]">
      <div className="flex flex-col items-center text-center -mt-2">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${secondaryColor}`}>
          {isBlock ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary max-w-[320px] mb-6 leading-relaxed">
          {isBlock 
            ? "Are you sure you want to block this user? They will no longer be able to log in or make bookings."
            : "This will restore the user's access. They will be able to log in and make bookings again."}
        </p>

        {error && <ErrorBanner message={error} className="mb-6 w-full" />}

        {/* User Card Summary */}
        <div className="w-full bg-[#F8F6FB] rounded-xl p-4 mb-8 border border-[#F0EDF5] text-left">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-bold text-text-primary">{user.name}</span>
            <StatusBadge status={user.status} />
          </div>
          <p className="text-xs text-text-secondary font-medium">{user.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl text-white font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              isBlock ? 'bg-[#F5A623] hover:bg-[#E09510] shadow-[#F5A623]/20' : 'bg-[#4CAF50] hover:bg-[#3D8B40] shadow-[#4CAF50]/20'
            }`}
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>{isLoading ? (isBlock ? 'Blocking...' : 'Activating...') : confirmBtnText}</span>
          </button>
          
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl border border-[#D1CFD6] text-text-secondary font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            {cancelBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserActionDialog;
