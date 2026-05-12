import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Button from './Button';

const BookingConfirmationModal = ({ isOpen, onClose, flight, passengerCount, onConfirm }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingRef] = useState(`BK${Math.floor(1000 + Math.random() * 9000)}`);

  if (!flight) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSuccess(true);
    onConfirm(flight);
  };

  const handleDone = () => {
    onClose();
    navigate('/passenger/booking/select-seat');
  };

  const total = flight.fare * passengerCount;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={success ? null : onClose} 
      title={success ? "Booking Confirmed!" : "Confirm Booking"}
      width="max-w-[420px]"
    >
      {!success ? (
        <div className="space-y-6">
          <div className="bg-background rounded-2xl p-5 border border-border-color space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Flight</p>
                <p className="text-lg font-bold text-primary">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Route</p>
                <p className="text-sm font-bold text-text-primary">{flight.origin} → {flight.destination}</p>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-y border-border-color/50">
              <div className="text-center">
                <p className="text-sm font-bold text-text-primary">{flight.departureTime}</p>
                <p className="text-[10px] text-text-secondary font-medium">Departure</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-text-primary">{flight.arrivalTime}</p>
                <p className="text-[10px] text-text-secondary font-medium">Arrival</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Fare per passenger</span>
                <span className="font-bold text-text-primary">${flight.fare}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Passengers</span>
                <span className="font-bold text-text-primary">x{passengerCount}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-border-color/50">
                <span className="font-bold text-text-primary">Total Amount</span>
                <span className="font-extrabold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="text"
              className="flex-1 border border-border-color rounded-xl h-11 text-text-secondary hover:bg-secondary/5"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 font-bold shadow-md shadow-primary/20"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Confirming...</span>
                </div>
              ) : "Confirm Booking"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-6 py-4 animate-fade-in">
          <div className="w-20 h-20 bg-[#4CAF50]/10 text-[#4CAF50] rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-text-primary">Great Choice!</h3>
            <p className="text-sm text-text-secondary mt-1">Your flight has been booked successfully.</p>
          </div>

          <div className="w-full bg-background rounded-2xl p-4 border border-dashed border-primary/30">
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Booking Reference</p>
            <p className="text-2xl font-extrabold text-primary tracking-wider">{bookingRef}</p>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold shadow-md shadow-primary/20"
            onClick={handleDone}
          >
            Select Seats
          </Button>
          
          <p className="text-[11px] text-text-secondary font-medium italic">
            A confirmation email has been sent to your registered address.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default BookingConfirmationModal;
