import React, { useState } from 'react';
import Modal from './Modal';
import ErrorBanner from './ErrorBanner';

const DeleteDialog = ({ isOpen, onClose, flight, onDelete, simulateError }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !flight) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (simulateError) {
      setError('Failed to delete flight. Please try again.');
      setIsDeleting(false);
    } else {
      onDelete(flight.flightNumber);
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" width="max-w-[420px]">
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-14 h-14 bg-[#D9534F1A] rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-[#D9534F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-2">Delete Flight {flight.flightNumber}?</h3>
        <p className="text-sm text-text-secondary max-w-[300px] mb-6 leading-relaxed">
          Are you sure you want to permanently delete this flight? This action cannot be undone.
        </p>

        {error && <ErrorBanner message={error} className="mb-6" />}

        <div className="w-full bg-[#F8F6FB] rounded-xl p-5 mb-8 flex items-center justify-between text-left border border-[#F0EDF5]">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Flight</p>
            <p className="text-sm font-extrabold text-text-primary">{flight.flightNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Route</p>
            <p className="text-sm font-extrabold text-text-primary">{flight.departureCode} → {flight.arrivalCode}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-[#D1CFD6] text-text-secondary font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            Keep Flight
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-3.5 rounded-xl bg-[#D9534F] text-white font-bold hover:bg-[#C9302C] transition-all shadow-lg shadow-[#D9534F]/20 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isDeleting ? 'Deleting...' : 'Delete Flight'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDialog;
