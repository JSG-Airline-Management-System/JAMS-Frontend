import React from 'react';
import StatusBadge from './StatusBadge';
import Button from './Button';

const BookingCard = ({ booking, onViewTicket, onCancel, onViewDetails }) => {
  const isConfirmed = booking.status === 'CONFIRMED';
  const isPending = booking.status === 'PENDING';
  const isCancelled = booking.status === 'CANCELLED';

  const getBorderColor = () => {
    if (isConfirmed) return 'border-l-success';
    if (isPending) return 'border-l-warning';
    if (isCancelled) return 'border-l-error';
    return 'border-l-border-color';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-border-color border-l-4 ${getBorderColor()} p-6 mb-4 hover:shadow-md transition-all duration-200 animate-fade-in group`}>
      {/* Top Row: Status & ID */}
      <div className="flex justify-between items-center mb-6">
        <StatusBadge status={booking.status} />
        <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest bg-background px-3 py-1 rounded-full border border-border-color/50">
          Booking ID: <span className="text-text-primary font-black ml-1">{booking.bookingId}</span>
        </p>
      </div>

      {/* Middle Section: 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-border-color/30">
        {/* Column 1: Flight Info */}
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Flight</p>
            <p className="text-xl font-black text-primary group-hover:scale-105 transition-transform origin-left">{booking.flightNumber}</p>
            <p className="text-sm font-bold text-text-primary mt-1">{booking.route}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-text-secondary font-medium flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {booking.departureDate}
            </p>
            <p className="text-xs text-text-secondary font-medium flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {booking.departureTime} — {booking.arrivalTime}
            </p>
            <p className="text-[10px] text-text-secondary font-bold uppercase opacity-60">
              {booking.duration} • {booking.stopType}
            </p>
          </div>
        </div>

        {/* Column 2: Passenger & Seat */}
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Passenger</p>
            <p className="text-sm font-bold text-text-primary">{booking.passengerName}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Seat & Boarding</p>
            <p className="text-sm font-black text-primary">{booking.seat} <span className="text-[10px] font-bold opacity-60 text-text-secondary uppercase ml-1">({booking.seatType})</span></p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-background rounded-lg p-2 border border-border-color/30">
                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-tighter">Gate</p>
                <p className="text-xs font-black text-text-primary">{booking.gate}</p>
              </div>
              <div className="bg-background rounded-lg p-2 border border-border-color/30">
                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-tighter">Boarding</p>
                <p className="text-xs font-black text-text-primary">{booking.boardingTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Price */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Fare Details</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary font-medium">Base Fare</span>
                <span className="text-text-primary font-bold">${booking.price.toFixed(2)}</span>
              </div>
              {booking.baggageFee > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary font-medium">Excess Baggage</span>
                  <span className="text-text-primary font-bold">+${booking.baggageFee.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dashed border-border-color/50">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-success uppercase tracking-widest">Total Paid</p>
                <p className="text-2xl font-black text-text-primary tracking-tight">${booking.totalPaid.toFixed(2)}</p>
              </div>
              <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1 italic">via {booking.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Special Info Rows */}
      {isCancelled && (
        <div className="mt-4 p-4 bg-error/5 rounded-xl border border-error/10 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-error/10 text-error rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-text-primary">Refund of ${booking.refundAmount.toFixed(2)} has been {booking.refundStatus.toLowerCase()} to your account.</p>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-0.5">Cancelled on {booking.cancelledDate} • Reason: {booking.cancelReason}</p>
            </div>
          </div>
        </div>
      )}

      {isPending && (
        <div className="mt-4 p-4 bg-warning/5 rounded-xl border border-warning/10 border-l-4 border-l-warning animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-warning/10 text-warning rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-text-primary">{booking.pendingNote}</p>
              <button className="text-[10px] font-black text-warning uppercase tracking-widest mt-2 hover:underline">Check Real-time Status →</button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {isConfirmed && (
          <>
            <Button 
              onClick={() => onViewTicket(booking)}
              className="h-10 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-lg px-6 shadow-lg shadow-primary/20"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              View Ticket
            </Button>
            <Button 
              variant="outline"
              onClick={() => onCancel(booking)}
              className="h-10 border-error text-error hover:bg-error/5 font-bold text-xs rounded-lg px-6"
            >
              Cancel Booking
            </Button>
          </>
        )}
        {isPending && (
          <>
            <Button 
              onClick={() => onViewDetails(booking)}
              className="h-10 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-lg px-6 shadow-lg shadow-primary/20"
            >
              View Details
            </Button>
            <Button 
              variant="outline"
              onClick={() => onCancel(booking)}
              className="h-10 border-error text-error hover:bg-error/5 font-bold text-xs rounded-lg px-6"
            >
              Cancel Booking
            </Button>
          </>
        )}
        {isCancelled && (
          <Button 
            variant="outline"
            onClick={() => onViewDetails(booking)}
            className="h-10 border-border-color text-text-secondary hover:bg-background font-bold text-xs rounded-lg px-6"
          >
            View Refund Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
