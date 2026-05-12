import React, { useState } from 'react';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';

const demoBookings = [
  {
    id: "BK001",
    flightNumber: "JA123",
    route: "JFK → LAX",
    departureDate: "2026-05-15",
    departureTime: "10:30 AM",
    status: "CONFIRMED",
    origin: "JFK",
    destination: "LAX"
  },
  {
    id: "BK002",
    flightNumber: "JA456",
    route: "LAX → ORD",
    departureDate: "2026-05-22",
    departureTime: "2:45 PM",
    status: "PENDING",
    origin: "LAX",
    destination: "ORD"
  }
];

const airports = [
  { label: 'JFK - New York', value: 'JFK' },
  { label: 'LAX - Los Angeles', value: 'LAX' },
  { label: 'ORD - Chicago', value: 'ORD' },
  { label: 'DXB - Dubai', value: 'DXB' },
  { label: 'LHR - London', value: 'LHR' },
  { label: 'IST - Istanbul', value: 'IST' },
  { label: 'KHI - Karachi', value: 'KHI' },
  { label: 'LHE - Lahore', value: 'LHE' },
  { label: 'ISB - Islamabad', value: 'ISB' }
];

const PassengerDashboard = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) {
      showToast("Please select origin and destination", "warning");
      return;
    }
    showToast(`Searching flights from ${origin} to ${destination}...`);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Welcome back, John!</h1>
            <p className="text-text-secondary mt-1 font-medium">Here's what's happening with your flights</p>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-5 relative overflow-hidden border-l-[4px] border-secondary hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Upcoming Flights</p>
                  <h3 className="text-[32px] font-extrabold text-text-primary mt-1">2</h3>
                </div>
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-5 relative overflow-hidden border-l-[4px] border-primary hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Total Bookings</p>
                  <h3 className="text-[32px] font-extrabold text-text-primary mt-1">12</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-5 relative overflow-hidden border-l-[4px] border-[#D9534F] hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Unread Notifications</p>
                  <h3 className="text-[32px] font-extrabold text-text-primary mt-1">3</h3>
                </div>
                <div className="p-3 bg-[#D9534F]/10 rounded-xl text-[#D9534F] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Search Card */}
          <Card className="p-8 mb-8 shadow-soft-lavender border border-border-color overflow-visible">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Quick Search
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-6 relative">
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-sm font-semibold text-text-primary">Origin</label>
                <Select 
                  options={[{label: 'Select origin', value: ''}, ...airports]}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="h-11 py-0"
                />
              </div>

              <div className="hidden md:flex mb-1.5 items-center justify-center">
                <button 
                  type="button"
                  onClick={handleSwap}
                  className="w-8 h-8 bg-[#F0EDF5] text-secondary rounded-full flex items-center justify-center hover:bg-secondary/20 transition-all hover:rotate-180 duration-500 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-sm font-semibold text-text-primary">Destination</label>
                <Select 
                  options={[{label: 'Select destination', value: ''}, ...airports]}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-11 py-0"
                />
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="text-sm font-semibold text-text-primary">Departure Date</label>
                <Input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11"
                />
              </div>

              <Button 
                type="submit"
                className="w-full md:w-auto px-8 h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-md shadow-primary/20"
              >
                Search Flights
              </Button>
            </form>
          </Card>

          {/* Recent Bookings Card */}
          <Card className="p-8 shadow-soft-lavender border border-border-color">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Recent Bookings
              </h2>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {demoBookings.length > 0 ? (
                demoBookings.map((booking, index) => (
                  <div 
                    key={booking.id}
                    className={`flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-secondary/20 hover:bg-secondary/[0.03] transition-all cursor-pointer group ${
                      index !== demoBookings.length - 1 ? 'border-b border-[#F0EDF5]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-text-primary tracking-tight">{booking.route}</p>
                        <p className="text-xs text-text-secondary font-medium">{booking.departureDate} at {booking.departureTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div className="flex flex-col items-end">
                        <StatusBadge status={booking.status} />
                        <span className="text-[10px] text-text-secondary mt-1 font-bold uppercase tracking-widest">{booking.id}</span>
                      </div>
                      <div className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-text-secondary/30 mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">No recent bookings</h3>
                  <p className="text-text-secondary text-sm">Search for flights to get started</p>
                  <Button className="mt-4 bg-primary text-white px-6">Search Flights</Button>
                </div>
              )}
            </div>
          </Card>
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

export default PassengerDashboard;
