import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import ErrorBanner from './ErrorBanner';

const UpdateStatusModal = ({ isOpen, onClose, flight, onUpdate, simulateError }) => {
  const [selectedStatus, setSelectedStatus] = useState(flight?.status || 'ONTIME');
  const [delayReason, setDelayReason] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (flight) {
      setSelectedStatus(flight.status);
      setDelayReason('');
      setError(null);
    }
  }, [flight]);

  if (!isOpen || !flight) return null;

  const statusOptions = [
    { label: 'ONTIME', color: '#4CAF50' },
    { label: 'DELAYED', color: '#F5A623' },
    { label: 'CANCELLED', color: '#D9534F' },
    { label: 'BOARDING', color: '#A78BCA' },
    { label: 'DEPARTED', color: '#4CAF50' }
  ];

  const handleUpdate = async () => {
    if (selectedStatus === 'DELAYED' && !delayReason.trim()) {
      setError('Please provide a delay reason');
      return;
    }

    setIsUpdating(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (simulateError) {
      setError('Failed to update status. Please try again.');
      setIsUpdating(false);
    } else {
      onUpdate({ ...flight, status: selectedStatus, delayReason: selectedStatus === 'DELAYED' ? delayReason : '' });
      setIsUpdating(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Status — ${flight.flightNumber}`} width="max-w-[400px]">
      <div className="space-y-6">
        {error && <ErrorBanner message={error} />}

        <div className="space-y-4">
          <p className="text-sm font-bold text-text-primary">Select New Status</p>
          <div className="flex flex-col gap-3">
            {statusOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setSelectedStatus(opt.label);
                  setError(null);
                }}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all group ${
                  selectedStatus === opt.label 
                  ? `border-[${opt.color}] bg-[${opt.color}]/15` 
                  : 'border-[#E5E0EB] bg-gray-50/30 hover:bg-secondary/5'
                }`}
                style={{ 
                  borderColor: selectedStatus === opt.label ? opt.color : undefined,
                  backgroundColor: selectedStatus === opt.label ? `${opt.color}1A` : undefined
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }}></div>
                  <span className={`font-bold tracking-wide ${selectedStatus === opt.label ? '' : 'text-text-secondary'}`} style={{ color: selectedStatus === opt.label ? opt.color : undefined }}>
                    {opt.label}
                  </span>
                </div>
                {selectedStatus === opt.label && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: opt.color }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedStatus === 'DELAYED' && (
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-bold text-text-primary ml-1">Delay Reason</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-border-color focus:ring-2 focus:ring-secondary/30 focus:border-secondary outline-none transition-all text-sm min-h-[100px] custom-scrollbar"
              placeholder="e.g. Weather conditions, Technical check..."
              value={delayReason}
              onChange={(e) => {
                setDelayReason(e.target.value);
                setError(null);
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EDF5]">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-[#D1CFD6] text-text-secondary font-semibold hover:bg-[#F5F3F8] transition-colors"
          >
            Cancel
          </button>
          <Button 
            variant="primary" 
            onClick={handleUpdate}
            disabled={isUpdating || (selectedStatus === 'DELAYED' && !delayReason.trim())}
            className="px-8 py-2.5"
          >
            {isUpdating ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateStatusModal;
