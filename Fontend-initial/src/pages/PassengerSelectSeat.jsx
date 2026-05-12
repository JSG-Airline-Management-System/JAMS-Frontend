import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import BookingStepper from '../components/BookingStepper';
import SeatMap from '../components/SeatMap';
import FareSummary from '../components/FareSummary';
import Toast from '../components/Toast';
import Card from '../components/Card';
import Button from '../components/Button';

const generateSeats = (rows, cols, occupiedList) => {
  const seats = [];
  for (let r = 1; r <= rows; r++) {
    for (const c of cols) {
      const label = `${r}${c}`;
      seats.push({
        row: r,
        column: c,
        label,
        status: occupiedList.includes(label) ? 'occupied' : 'available',
        isExitRow: r === 8 || r === 15,
        extraLegroom: r === 1 || r === 8 || r === 15
      });
    }
  }
  return seats;
};

const PassengerSelectSeat = () => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const flightInfo = useMemo(() => {
    const saved = localStorage.getItem('activeBooking');
    return saved ? JSON.parse(saved) : {
      flightNumber: "JA123",
      origin: "JFK",
      destination: "LAX",
      departureDate: "May 15, 2026",
      departureTime: "10:30 AM",
      arrivalTime: "1:45 PM",
      fare: 299
    };
  }, []);

  const occupiedSeats = ["1A", "1B", "1C", "1D", "2A", "2B", "5C", "5D", "10A", "10B", "10C", "10D", "15C", "15D", "18A", "18B"];
  const seats = useMemo(() => generateSeats(10, ["A", "B", "C", "D", "E", "F"], occupiedSeats), []);

  useEffect(() => {
    // Simulate loading seat map
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSeatClick = (seat) => {
    if (!seat) return;
    if (selectedSeat?.label === seat.label) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seat);
      showToast(`Seat ${seat.label} selected`);
    }
  };

  const handleAutoAssign = () => {
    // Find available window seats first
    const windows = seats.filter(s => s.status === 'available' && (s.column === 'A' || s.column === 'F'));
    const aisles = seats.filter(s => s.status === 'available' && (s.column === 'C' || s.column === 'D'));
    const available = windows.length > 0 ? windows : aisles.length > 0 ? aisles : seats.filter(s => s.status === 'available');

    if (available.length > 0) {
      const randomSeat = available[Math.floor(Math.random() * available.length)];
      setSelectedSeat(randomSeat);
      showToast(`Seat ${randomSeat.label} assigned automatically`);
    } else {
      showToast("No seats available", "error");
    }
  };

  const handleContinue = () => {
    if (!selectedSeat) {
      showToast("Please select a seat to continue", "error");
      return;
    }
    // Save seat info to localStorage
    const saved = localStorage.getItem('activeBooking');
    const bookingData = saved ? JSON.parse(saved) : {};
    localStorage.setItem('activeBooking', JSON.stringify({ ...bookingData, selectedSeat }));
    
    showToast("Moving to Baggage selection...");
    setTimeout(() => navigate('/passenger/booking/baggage'), 600);
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={3} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Book Your Ticket</h1>
          </div>

          <BookingStepper currentStep={2} />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-64 h-[400px] bg-white rounded-[40px] border-4 border-border-color/20 mb-8" />
              <p className="text-text-secondary font-bold animate-bounce tracking-widest uppercase text-xs">Loading Seat Map...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {/* Left: Seat Map */}
              <div className="lg:col-span-2">
                <Card className="p-8 shadow-soft-lavender border border-border-color relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-text-primary">Select Your Seat</h2>
                    <button 
                      onClick={handleAutoAssign}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-secondary text-secondary rounded-xl text-sm font-bold hover:bg-secondary/5 transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      Auto-Assign
                    </button>
                  </div>

                  <SeatMap 
                    seats={seats} 
                    selectedSeat={selectedSeat} 
                    onSeatClick={handleSeatClick} 
                  />
                  
                  <div className="mt-12 flex justify-start">
                    <Button 
                      className="bg-primary/80 hover:bg-primary text-white px-8 h-12 rounded-xl"
                      onClick={handleContinue}
                      disabled={!selectedSeat}
                    >
                      Continue to Baggage
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Right: Fare Summary */}
              <div className="lg:col-span-1">
                <FareSummary 
                  flight={flightInfo} 
                  selectedSeat={selectedSeat} 
                  onContinue={handleContinue} 
                />
              </div>
            </div>
          )}
        </div>
      </main>

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

export default PassengerSelectSeat;
