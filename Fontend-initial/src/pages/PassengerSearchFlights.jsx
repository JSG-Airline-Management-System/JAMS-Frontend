import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Toast from '../components/Toast';
import FlightResultCard from '../components/FlightResultCard';

const demoAirports = [
  { code: "JFK", city: "New York", country: "USA" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "ORD", city: "Chicago", country: "USA" },
  { code: "KHI", city: "Karachi", country: "Pakistan" },
  { code: "LHE", city: "Lahore", country: "Pakistan" },
  { code: "ISB", city: "Islamabad", country: "Pakistan" },
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "LHR", city: "London", country: "UK" },
  { code: "JED", city: "Jeddah", country: "Saudi Arabia" },
  { code: "IST", city: "Istanbul", country: "Turkey" }
];

const demoFlightResults = [
  {
    id: 1,
    flightNumber: "JA123",
    origin: "JFK",
    destination: "LAX",
    departureTime: "10:30 AM",
    arrivalTime: "1:45 PM",
    duration: "5h 15m",
    stops: 0,
    stopType: "Direct",
    aircraft: "Boeing 737",
    fare: 299,
    seatsAvailable: 42,
    departureDate: "2026-05-15"
  },
  {
    id: 2,
    flightNumber: "JA456",
    origin: "JFK",
    destination: "LAX",
    departureTime: "2:15 PM",
    arrivalTime: "5:30 PM",
    duration: "5h 15m",
    stops: 0,
    stopType: "Direct",
    aircraft: "Airbus A320",
    fare: 249,
    seatsAvailable: 18,
    departureDate: "2026-05-15"
  },
  {
    id: 3,
    flightNumber: "JA789",
    origin: "JFK",
    destination: "LAX",
    departureTime: "6:00 PM",
    arrivalTime: "12:30 AM",
    duration: "8h 30m",
    stops: 1,
    stopType: "1 Stop",
    stopCity: "ORD",
    aircraft: "Boeing 777",
    fare: 199,
    seatsAvailable: 5,
    departureDate: "2026-05-15"
  }
];

const PassengerSearchFlights = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LAX');
  const [date, setDate] = useState('2026-05-15');
  const [passengers, setPassengers] = useState(1);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState('departure-early');
  const [bookingFlightId, setBookingFlightId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (origin === destination) {
      showToast("Origin and Destination cannot be same", "error");
      return;
    }

    setSearching(true);
    setHasSearched(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter demo results
    const filtered = demoFlightResults.filter(f => f.origin === origin && f.destination === destination);
    setResults(filtered);
    setSearching(false);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (sortBy === 'price-low') return a.fare - b.fare;
      if (sortBy === 'price-high') return b.fare - a.fare;
      if (sortBy === 'departure-early') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'departure-late') return b.departureTime.localeCompare(a.departureTime);
      return 0;
    });
  }, [results, sortBy]);

  const handleBookClick = async (flight) => {
    setBookingFlightId(flight.id);
    
    // Save flight data to localStorage (simulating shared state/context)
    const bookingData = {
      ...flight,
      passengers: passengers
    };
    localStorage.setItem('activeBooking', JSON.stringify(bookingData));

    showToast("Flight selected. Choose your seat.", "success");

    // Brief delay for the 'Redirecting...' state
    await new Promise(resolve => setTimeout(resolve, 400));
    
    navigate('/passenger/booking/select-seat');
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-6 shadow-soft-lavender border border-border-color animate-pulse h-[120px] mb-4" />
  );

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={3} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Search Flights</h1>
            <p className="text-text-secondary mt-1 font-medium">Find and book your next flight</p>
          </div>

          {/* Search Panel */}
          <Card className="p-8 mb-8 shadow-soft-lavender border border-border-color overflow-visible">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1 space-y-1.5 relative">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">From</label>
                  <Select 
                    options={demoAirports.map(a => ({ label: `${a.code} — ${a.city}`, value: a.code }))}
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="h-12 py-0 font-semibold"
                  />
                  <button 
                    type="button"
                    onClick={handleSwap}
                    className="absolute -right-6 top-[40px] z-20 w-10 h-10 bg-white border border-border-color text-primary rounded-full flex items-center justify-center shadow-md hover:bg-secondary/5 transition-all hidden md:flex"
                  >
                    ⇄
                  </button>
                </div>

                <div className="md:col-span-1 space-y-1.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">To</label>
                  <Select 
                    options={demoAirports.map(a => ({ label: `${a.code} — ${a.city}`, value: a.code }))}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12 py-0 font-semibold"
                  />
                </div>

                <div className="md:col-span-1 space-y-1.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Date</label>
                  <Input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="md:col-span-1 space-y-1.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Passengers</label>
                  <Select 
                    options={[1, 2, 3, 4, 5, 6].map(n => ({ label: `${n} ${n === 1 ? 'Passenger' : 'Passengers'}`, value: n }))}
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="h-12 py-0"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-12 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
                  disabled={searching}
                >
                  {searching ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : "Search Flights"}
                </Button>
              </div>
            </form>
          </Card>

          {/* Results Section */}
          {hasSearched && !searching && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white/50 px-6 py-3 rounded-2xl flex items-center justify-between border border-border-color/50">
                <p className="text-sm font-bold text-text-primary">
                  {origin} → {destination} • {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {passengers} Passenger{passengers > 1 ? 's' : ''}
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-primary text-xs font-bold hover:underline"
                >
                  Modify Search
                </button>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-text-primary">
                  {results.length} Flight{results.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="w-48">
                  <Select 
                    className="h-10 py-0 text-xs font-bold"
                    options={[
                      { label: 'Departure (Earliest)', value: 'departure-early' },
                      { label: 'Departure (Latest)', value: 'departure-late' },
                      { label: 'Price (Lowest)', value: 'price-low' },
                      { label: 'Price (Highest)', value: 'price-high' }
                    ]}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {sortedResults.length > 0 ? (
                  sortedResults.map(flight => (
                    <FlightResultCard 
                      key={flight.id} 
                      flight={flight} 
                      onBook={handleBookClick}
                      loading={bookingFlightId === flight.id}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-border-color">
                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-text-secondary/20 mb-4 transform -rotate-45">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">No flights found</h3>
                    <p className="text-text-secondary text-sm">Try different dates or destinations</p>
                    <Button 
                      variant="text" 
                      className="mt-4 text-primary font-bold"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Modify Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading Skeletons */}
          {searching && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-32 bg-[#E5E0EB] rounded animate-pulse" />
                <div className="h-10 w-48 bg-[#E5E0EB] rounded animate-pulse" />
              </div>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Initial State */}
          {!hasSearched && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-32 h-32 bg-secondary/5 rounded-full flex items-center justify-center text-secondary mb-6">
                <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary">Where would you like to go?</h2>
              <p className="text-text-secondary mt-2">Enter your origin, destination and date to see available flights.</p>
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

export default PassengerSearchFlights;
