import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const CancelBookingDialog = ({ isOpen, onClose, booking, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  if (!booking) return null;

  const handleCancel = async () => {
    setCancelling(true);
    await onConfirm(booking.bookingId, reason);
    setCancelling(false);
    onClose();
  };

  const cancellationFee = booking.totalPaid * 0.1;
  const refundAmount = booking.totalPaid - cancellationFee;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={null} 
      width="max-w-[480px]"
      hideCloseButton
    >
      <div className="py-2">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-warning/10 text-warning rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-text-primary tracking-tight">Cancel Booking {booking.bookingId}?</h3>
            <p className="text-sm text-text-secondary font-medium px-4">Are you sure you want to cancel this booking? This action cannot be undone.</p>
          </div>
        </div>

        <div className="bg-background rounded-2xl p-5 border border-border-color mb-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">Flight Info</p>
              <p className="text-sm font-black text-primary">{booking.flightNumber} • {booking.route}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-0.5">Departure</p>
              <p className="text-sm font-bold text-text-primary">{booking.departureDate}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-dashed border-border-color/50 flex justify-between items-center">
            <span className="text-xs font-bold text-text-secondary">Original Price</span>
            <span className="text-sm font-bold text-text-primary">${booking.totalPaid.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-secondary">Cancellation Fee (10%)</span>
            <span className="text-sm font-bold text-error">-${cancellationFee.toFixed(2)}</span>
          </div>
          
          <div className="pt-4 border-t border-border-color flex justify-between items-center">
            <span className="text-sm font-black text-text-primary">Estimated Refund</span>
            <span className="text-lg font-black text-success">${refundAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest ml-1">Reason for cancellation (optional)</label>
          <select 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="">Select a reason</option>
            <option value="Change of plans">Change of plans</option>
            <option value="Found a better option">Found a better option</option>
            <option value="Travel dates changed">Travel dates changed</option>
            <option value="Personal emergency">Personal emergency</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={onClose}
            className="h-12 border-border-color text-text-secondary hover:bg-background font-bold rounded-xl"
            disabled={cancelling}
          >
            Keep Booking
          </Button>
          <Button 
            onClick={handleCancel}
            className="h-12 bg-error hover:bg-error/90 text-white font-black rounded-xl shadow-lg shadow-error/20 flex items-center justify-center gap-2"
            disabled={cancelling}
          >
            {cancelling ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Cancelling...</span>
              </>
            ) : (
              'Confirm Cancellation'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelBookingDialog;
