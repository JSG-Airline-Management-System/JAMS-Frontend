import React, { useState, useEffect, useMemo } from 'react';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import BookingCard from '../components/BookingCard';
import CancelBookingDialog from '../components/CancelBookingDialog';
import TicketViewModal from '../components/TicketViewModal';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';

const demoBookings = [
  {
    id: "BK001",
    bookingId: "BB001",
    status: "CONFIRMED",
    flightNumber: "JA123",
    origin: "JFK",
    destination: "LAX",
    route: "JFK → LAX",
    departureDate: "2026-05-15",
    departureTime: "10:30 AM",
    arrivalTime: "1:45 PM",
    duration: "5h 15m",
    stopType: "Direct",
    aircraft: "Boeing 737",
    seat: "4B",
    seatType: "Window",
    gate: "B12",
    boardingTime: "9:45 AM",
    price: 299,
    baggageWeight: 24,
    baggageFee: 10,
    totalPaid: 309,
    paymentMethod: "Card",
    transactionId: "TXN20260515-001",
    passengerName: "John Doe",
    bookingDate: "2026-05-03",
    canCancel: true
  },
  {
    id: "BK002",
    bookingId: "BB002",
    status: "PENDING",
    flightNumber: "JA456",
    origin: "LAX",
    destination: "ORD",
    route: "LAX → ORD",
    departureDate: "2026-05-22",
    departureTime: "2:45 PM",
    arrivalTime: "5:30 PM",
    duration: "4h 45m",
    stopType: "Direct",
    aircraft: "Airbus A320",
    seat: "12C",
    seatType: "Aisle",
    gate: "TBD",
    boardingTime: "TBD",
    price: 249,
    baggageWeight: 15,
    baggageFee: 0,
    totalPaid: 249,
    paymentMethod: "Bank Transfer",
    transactionId: "TXN20260503-002",
    passengerName: "John Doe",
    bookingDate: "2026-05-01",
    canCancel: true,
    pendingNote: "Payment verification in progress. Expected confirmation within 24 hours."
  },
  {
    id: "BK003",
    bookingId: "BB003",
    status: "CANCELLED",
    flightNumber: "JA789",
    origin: "ORD",
    destination: "JFK",
    route: "ORD → JFK",
    departureDate: "2026-04-10",
    departureTime: "6:00 PM",
    arrivalTime: "8:30 PM",
    duration: "2h 30m",
    stopType: "Direct",
    aircraft: "Boeing 777",
    seat: "8A",
    seatType: "Window",
    gate: "C5",
    boardingTime: "5:15 PM",
    price: 199,
    baggageWeight: 0,
    baggageFee: 0,
    totalPaid: 199,
    refundAmount: 169.15,
    refundStatus: "Processed",
    paymentMethod: "Wallet",
    transactionId: "TXN20260410-003",
    passengerName: "John Doe",
    bookingDate: "2026-04-01",
    cancelledDate: "2026-04-08",
    canCancel: false,
    cancelReason: "Customer requested cancellation"
  }
];

const PassengerMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [toast, setToast] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setBookings(demoBookings);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredBookings = useMemo(() => {
    if (filter === 'ALL') return bookings;
    return bookings.filter(b => b.status === filter);
  }, [bookings, filter]);

  const counts = useMemo(() => {
    return {
      ALL: bookings.length,
      CONFIRMED: bookings.filter(b => b.status === 'CONFIRMED').length,
      PENDING: bookings.filter(b => b.status === 'PENDING').length,
      CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
    };
  }, [bookings]);

  const handleCancelBooking = async (bookingId, reason) => {
    // Simulate API cancel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          status: 'CANCELLED',
          cancelledDate: new Date().toLocaleDateString(),
          cancelReason: reason || "Passenger requested",
          refundAmount: b.totalPaid * 0.9,
          refundStatus: 'Pending',
          canCancel: false
        };
      }
      return b;
    }));

    setToast({ 
      message: `Booking ${bookingId} cancelled. Refund processing.`, 
      type: 'warning' 
    });
  };

  const openCancelDialog = (booking) => {
    setSelectedBooking(booking);
    setIsCancelDialogOpen(true);
  };

  const openTicketModal = (booking) => {
    setSelectedBooking(booking);
    setIsTicketModalOpen(true);
  };

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setIsTicketModalOpen(true); // Reusing ticket modal for now
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-black text-text-primary tracking-tight">My Bookings</h1>
              <p className="text-text-secondary mt-1 font-medium">Manage your flight bookings and travel plans</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-xl border border-border-color shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Active: {counts.CONFIRMED + counts.PENDING}</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
            {[
              { id: 'ALL', label: 'All Bookings', color: null },
              { id: 'CONFIRMED', label: 'Confirmed', color: 'bg-success' },
              { id: 'PENDING', label: 'Pending', color: 'bg-warning' },
              { id: 'CANCELLED', label: 'Cancelled', color: 'bg-error' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  filter === tab.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-white text-text-secondary border border-border-color hover:bg-background'
                }`}
              >
                {tab.color && <div className={`w-2 h-2 rounded-full ${tab.color}`} />}
                {tab.label}
                <span className={`ml-1 opacity-60 ${filter === tab.id ? 'text-white' : 'text-text-secondary'}`}>
                  ({counts[tab.id]})
                </span>
              </button>
            ))}
          </div>

          {/* Booking List */}
          <div className="space-y-4 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-text-secondary font-bold animate-pulse">Loading your bookings...</p>
              </div>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  onViewTicket={openTicketModal}
                  onCancel={openCancelDialog}
                  onViewDetails={openDetails}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-white/50 rounded-3xl border-2 border-dashed border-border-color animate-fade-in">
                <div className="w-20 h-20 bg-background text-border-color rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <h3 className="text-xl font-black text-text-primary">No {filter !== 'ALL' ? filter.toLowerCase() : ''} bookings found</h3>
                <p className="text-text-secondary mt-2 font-medium">When you book a flight, it will appear here.</p>
                <Link to="/passenger/search">
                  <button className="mt-8 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform">
                    Search Flights
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <CancelBookingDialog 
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        booking={selectedBooking}
        onConfirm={handleCancelBooking}
      />

      <TicketViewModal 
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={selectedBooking}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default PassengerMyBookings;
