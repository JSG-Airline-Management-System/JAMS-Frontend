import React from 'react';
import Card from './Card';
import Button from './Button';
import { Link } from 'react-router-dom';

const FareSummary = ({ 
  flight, 
  selectedSeat, 
  baggageFee = 0, 
  currentStep = 2, 
  onContinue, 
  continueText = "Continue to Baggage",
  isContinueDisabled = false
}) => {
  if (!flight) return null;

  const baseFare = flight.fare || 299;
  const taxes = 35.88;
  const seatPrice = selectedSeat?.extraLegroom ? 25 : 0;
  const total = baseFare + taxes + seatPrice + baggageFee;

  const getSeatType = (column) => {
    if (column === 'A' || column === 'D') return 'Window Seat';
    if (column === 'B' || column === 'C') return 'Aisle Seat';
    return 'Middle Seat';
  };

  return (
    <Card className="p-6 shadow-soft-lavender border border-border-color sticky top-8">
      <h3 className="text-lg font-bold text-text-primary mb-4 border-b border-border-color pb-3">Fare Summary</h3>
      
      {/* Flight Mini Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-text-primary">{flight.origin}</span>
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span className="font-bold text-text-primary">{flight.destination}</span>
        </div>
        <p className="text-xs text-text-secondary font-medium">
          {flight.flightNumber} • {flight.departureDate}
        </p>
        <p className="text-xs text-text-secondary font-medium mt-1">
          {flight.departureTime} — {flight.arrivalTime}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-medium">Base Fare</span>
          <span className="text-text-primary font-bold">${baseFare.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-medium">
            Seat: {selectedSeat ? selectedSeat.label : 'None'}
          </span>
          <span className="text-text-primary font-bold">
            {seatPrice > 0 ? `+$${seatPrice.toFixed(2)}` : '$0.00'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-medium">Baggage Fee</span>
          <span className={`font-bold ${baggageFee > 0 ? 'text-primary' : 'text-text-primary'}`}>
            {currentStep < 3 ? (
              <span className="text-text-secondary italic">Step 3</span>
            ) : (
              `$${baggageFee.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-text-secondary font-medium">Taxes & Fees</span>
          <span className="text-text-primary font-bold">${taxes.toFixed(2)}</span>
        </div>
      </div>

      {selectedSeat && (
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold shadow-md">
              {selectedSeat.label}
            </div>
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Selected Seat</p>
              <p className="text-sm font-bold text-text-primary">{getSeatType(selectedSeat.column)}</p>
              {selectedSeat.extraLegroom && (
                <span className="text-[10px] bg-success/10 text-success px-1.5 py-0.5 rounded-md font-bold mt-1 inline-block">Extra Legroom</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border-color pt-4 mb-6">
        <div className="flex justify-between items-end">
          <span className="text-text-primary font-bold">Total</span>
          <span className="text-2xl font-extrabold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          className={`w-full h-12 rounded-xl font-bold shadow-lg transition-all ${
            isContinueDisabled ? 'bg-[#D1CFD6] cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-primary/20'
          }`}
          onClick={onContinue}
          disabled={isContinueDisabled}
        >
          {continueText}
        </Button>
        {currentStep === 2 && !selectedSeat && (
          <p className="text-center text-[11px] text-error font-bold animate-pulse">
            Please select a seat to continue
          </p>
        )}
        <Link 
          to={
            currentStep === 2 ? "/passenger/search" : 
            currentStep === 3 ? "/passenger/booking/select-seat" : 
            "/passenger/booking/baggage"
          }
          className="block text-center text-xs text-text-secondary font-bold hover:text-primary hover:underline"
        >
          {
            currentStep === 2 ? "← Back to Search Results" : 
            currentStep === 3 ? "← Back to Seat Selection" : 
            "← Back to Baggage Selection"
          }
        </Link>
      </div>
    </Card>
  );
};

export default FareSummary;
