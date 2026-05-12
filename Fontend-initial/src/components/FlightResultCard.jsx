import React from 'react';
import Button from './Button';

const FlightResultCard = ({ flight, onBook, loading }) => {
  const { 
    flightNumber, origin, destination, departureTime, arrivalTime, 
    duration, stopType, aircraft, fare, seatsAvailable 
  } = flight;

  const isLowSeats = seatsAvailable < 10;
  const isCriticalSeats = seatsAvailable < 5;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft-lavender border border-border-color hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Flight Info */}
        <div className="w-full md:w-32 flex flex-col items-center md:items-start">
          <span className="text-lg font-bold text-primary">{flightNumber}</span>
          <span className="text-xs text-text-secondary font-medium">{aircraft}</span>
        </div>

        {/* Center: Route & Time */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-12 w-full justify-center">
            <div className="text-center">
              <span className="text-2xl font-extrabold text-text-primary block">{departureTime}</span>
              <span className="text-sm font-bold text-text-secondary">{origin}</span>
            </div>

            <div className="flex-1 flex flex-col items-center relative max-w-[200px]">
              <div className="w-full h-[2px] bg-[#D1CFD6] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                  <svg className="w-5 h-5 text-primary transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                {stopType !== 'Direct' && (
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 bg-warning rounded-full border-2 border-white" />
                )}
              </div>
              <span className="text-[11px] font-bold text-text-secondary mt-2 uppercase tracking-widest">{duration}</span>
              <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${
                stopType === 'Direct' ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 'bg-warning/10 text-warning'
              }`}>
                {stopType}
              </span>
            </div>

            <div className="text-center">
              <span className="text-2xl font-extrabold text-text-primary block">{arrivalTime}</span>
              <span className="text-sm font-bold text-text-secondary">{destination}</span>
            </div>
          </div>
        </div>

        {/* Right: Price & Book */}
        <div className="w-full md:w-48 flex items-center justify-between md:flex-col md:items-end gap-2 pt-6 md:pt-0 border-t md:border-0 border-border-color">
          <div className="text-right">
            <span className="text-3xl font-extrabold text-text-primary tracking-tight">${fare}</span>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">per passenger</p>
            {seatsAvailable > 0 && (
              <p className={`text-[11px] font-bold mt-1 ${
                isCriticalSeats ? 'text-error bg-error/5 px-2 py-0.5 rounded-md' : 
                isLowSeats ? 'text-warning' : 'text-[#4CAF50]'
              }`}>
                {seatsAvailable} seats left
              </p>
            )}
          </div>
          
          <Button 
            className={`w-32 h-11 rounded-xl font-bold ${seatsAvailable === 0 ? 'bg-[#D1CFD6] cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-md shadow-primary/20'}`}
            disabled={seatsAvailable === 0 || loading}
            onClick={() => onBook(flight)}
          >
            {seatsAvailable === 0 ? "Sold Out" : loading ? "Redirecting..." : "Book"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard;
