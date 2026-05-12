import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const TicketCard = ({ id, bookingData }) => {
  if (!bookingData) return null;

  const bData = bookingData || {};
  const bookingId = bData.bookingId || "BK2026-15432";
  const passenger = bData.passenger || { name: "John Doe", email: "johndoe@email.com" };
  const flight = bData.flight || {
    flightNumber: "JA123",
    origin: "JFK",
    originCity: "New York",
    destination: "LAX",
    destinationCity: "Los Angeles",
    departureDate: "May 15, 2026",
    departureTime: "10:30 AM",
    arrivalTime: "1:45 PM",
    duration: "5h 15m",
  };
  const selectedSeat = bData.selectedSeat || { label: "4B", column: "B" };
  const gate = bData.gate || "B12";
  const boardingTime = bData.boardingTime || "9:45 AM";

  const getSeatType = (column) => {
    if (column === 'A' || column === 'D') return 'Window';
    if (column === 'B' || column === 'C') return 'Aisle';
    return 'Middle';
  };

  return (
    <div 
      id={id}
      className="bg-white rounded-3xl shadow-xl border border-border-color overflow-hidden max-w-2xl mx-auto"
      style={{ minWidth: '600px' }}
    >
      {/* Ticket Header */}
      <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-dashed border-border-color">
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tighter">JAMS</h1>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-0.5">Boarding Pass</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Booking ID</p>
          <p className="text-lg font-mono font-bold text-text-primary">{bookingId}</p>
        </div>
      </div>

      {/* Main Info Row */}
      <div className="px-8 py-8 grid grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Passenger</p>
          <p className="text-xl font-bold text-text-primary">{passenger.name}</p>
          <p className="text-xs text-text-secondary font-medium">{passenger.email}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Flight</p>
          <p className="text-xl font-bold text-primary">{flight.flightNumber}</p>
          <p className="text-xs text-text-secondary font-medium">Economy Class</p>
        </div>
      </div>

      {/* Flight Detail Card */}
      <div className="mx-8 mb-8 p-6 bg-background rounded-2xl border border-border-color/50">
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-3xl font-black text-text-primary tracking-tight">{flight.origin}</h2>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-wide">{flight.originCity}</p>
          </div>
          
          <div className="flex flex-col items-center flex-1 px-4">
            <div className="relative w-full flex items-center justify-center">
              <div className="absolute w-full border-t-2 border-dashed border-border-color" />
              <div className="relative bg-background px-2">
                <svg className="w-6 h-6 text-primary transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] font-bold text-text-secondary mt-2 uppercase tracking-tighter">{flight.duration || "5h 15m"}</p>
            <span className="text-[9px] bg-success/10 text-success px-2 py-0.5 rounded-full font-bold mt-1">Direct Flight</span>
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-black text-text-primary tracking-tight">{flight.destination}</h2>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-wide">{flight.destinationCity}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border-color/30">
          <div>
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm font-bold text-text-primary">{flight.departureDate}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Boarding</p>
            <p className="text-sm font-bold text-text-primary">{boardingTime}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Gate</p>
            <p className="text-sm font-bold text-text-primary">{gate}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1">Departure</p>
            <p className="text-sm font-bold text-primary">{flight.departureTime}</p>
          </div>
        </div>
      </div>

      {/* QR Section */}
      <div className="px-8 py-6 bg-white border-t border-dashed border-border-color flex justify-between items-center">
        <div className="flex gap-10">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Seat</p>
            <p className="text-xl font-bold text-text-primary">{selectedSeat.label}</p>
            <p className="text-[10px] text-primary font-bold">{getSeatType(selectedSeat.column)}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Baggage</p>
            <p className="text-xl font-bold text-text-primary">{bookingData.baggageWeight || 0}kg</p>
            <p className="text-[10px] text-text-secondary font-bold italic">Checked</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white border border-border-color rounded-xl shadow-sm">
            <QRCodeSVG 
              value={bookingId} 
              size={80} 
              level="H"
              includeMargin={false}
              fgColor="#2D2D2D"
            />
          </div>
          <p className="text-[9px] font-mono font-bold text-text-secondary mt-2">{bookingId}</p>
        </div>
      </div>

      <div className="bg-primary/5 py-3 px-8 text-center border-t border-primary/10">
        <p className="text-[9px] font-medium text-text-secondary italic">
          This is an electronic ticket. JAMS - Jutt Airline Management System © 2026
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
