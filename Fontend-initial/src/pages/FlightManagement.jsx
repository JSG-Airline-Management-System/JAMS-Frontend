import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import AirplaneBackground from '../components/AirplaneBackground';
import SkeletonTable from '../components/SkeletonTable';
import EditFlightModal from '../components/EditFlightModal';
import UpdateStatusModal from '../components/UpdateStatusModal';
import DeleteDialog from '../components/DeleteDialog';
import Toast from '../components/Toast';
import Input from '../components/Input';
import Select from '../components/Select';
import ErrorBanner from '../components/ErrorBanner';

const demoAirports = [
  { code: "KHI", name: "Jinnah International Airport", city: "Karachi", country: "Pakistan" },
  { code: "LHE", name: "Allama Iqbal International Airport", city: "Lahore", country: "Pakistan" },
  { code: "ISB", name: "Islamabad International Airport", city: "Islamabad", country: "Pakistan" },
  { code: "PEW", name: "Bacha Khan International Airport", city: "Peshawar", country: "Pakistan" },
  { code: "UET", name: "Quetta International Airport", city: "Quetta", country: "Pakistan" },
  { code: "MUX", name: "Multan International Airport", city: "Multan", country: "Pakistan" },
  { code: "SKT", name: "Sialkot International Airport", city: "Sialkot", country: "Pakistan" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
  { code: "JED", name: "King Abdulaziz International", city: "Jeddah", country: "Saudi Arabia" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" }
];

const demoAircraft = [
  { model: "Boeing 737", registration: "AP-BCA", capacity: 180 },
  { model: "Airbus A320", registration: "AP-CDA", capacity: 160 },
  { model: "Boeing 777", registration: "AP-EFG", capacity: 350 },
  { model: "Airbus A380", registration: "AP-HIJ", capacity: 500 },
  { model: "Boeing 787", registration: "AP-KLM", capacity: 280 }
];

const FlightManagement = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [toast, setToast] = useState(null);
  const [simulateError, setSimulateError] = useState(false);
  const [newFlightId, setNewFlightId] = useState(null);

  // Form State
  const initialFormState = {
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    departureDate: '',
    aircraft: '',
    gate: '',
    fare: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Demo Data
  const initialFlights = [
    {
      id: 1,
      flightNumber: "JA123",
      departureCity: "Karachi",
      departureCode: "KHI",
      arrivalCity: "Dubai",
      arrivalCode: "DXB",
      departureTime: "10:30 AM",
      departureDate: "2026-05-05",
      status: "ONTIME",
      aircraft: "Boeing 737",
      aircraftRegistration: "AP-BCA",
      gate: "A12",
      fare: 299
    },
    {
      id: 2,
      flightNumber: "JA456",
      departureCity: "Lahore",
      departureCode: "LHE",
      arrivalCity: "London",
      arrivalCode: "LHR",
      departureTime: "2:45 PM",
      departureDate: "2026-05-05",
      status: "DELAYED",
      aircraft: "Airbus A320",
      aircraftRegistration: "AP-CDA",
      gate: "B7",
      fare: 249
    },
    {
      id: 3,
      flightNumber: "JA789",
      departureCity: "Islamabad",
      departureCode: "ISB",
      arrivalCity: "New York",
      arrivalCode: "JFK",
      departureTime: "6:00 PM",
      departureDate: "2026-05-06",
      status: "ONTIME",
      aircraft: "Boeing 777",
      aircraftRegistration: "AP-EFG",
      gate: "C3",
      fare: 199
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlights(initialFlights);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const openModal = (type, flight) => {
    setSelectedFlight(flight);
    setActiveModal(type);
  };

  const handleSave = (updatedFlight) => {
    setFlights(flights.map(f => f.id === updatedFlight.id ? updatedFlight : f));
    showToast(`Flight ${updatedFlight.flightNumber} updated successfully`);
  };

  const handleUpdateStatus = (updatedFlight) => {
    setFlights(flights.map(f => f.id === updatedFlight.id ? updatedFlight : f));
    showToast(`${updatedFlight.flightNumber} status updated to ${updatedFlight.status}`, 'warning');
  };

  const handleDelete = (flightNumber) => {
    setFlights(flights.filter(f => f.flightNumber !== flightNumber));
    showToast(`Flight ${flightNumber} has been deleted`, 'error');
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.flightNumber) errors.flightNumber = "Flight number is required";
    else if (!/^[A-Z]{2}\d{3}$/.test(formData.flightNumber)) errors.flightNumber = "Invalid flight number format (e.g., JA123)";
    
    if (!formData.origin) errors.origin = "Origin is required";
    if (!formData.destination) errors.destination = "Destination is required";
    else if (formData.origin === formData.destination) errors.destination = "Origin and destination cannot be the same city";
    
    if (!formData.departureTime) errors.departureTime = "Departure time is required";
    if (!formData.departureDate) errors.departureDate = "Departure date is required";
    else if (new Date(formData.departureDate) < new Date(new Date().setHours(0,0,0,0))) errors.departureDate = "Departure date must be today or later";
    
    if (!formData.aircraft) errors.aircraft = "Aircraft is required";
    if (!formData.gate) errors.gate = "Gate is required";
    
    if (!formData.fare) errors.fare = "Fare is required";
    else if (Number(formData.fare) <= 0) errors.fare = "Fare must be a positive number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (simulateError) {
      setSubmitError("Failed to add flight. Please try again.");
      setIsSubmitting(false);
      showToast("Failed to add flight. Please try again.", "error");
    } else {
      const originAirport = demoAirports.find(a => a.code === formData.origin);
      const destinationAirport = demoAirports.find(a => a.code === formData.destination);
      const aircraft = demoAircraft.find(a => a.model === formData.aircraft);

      const newFlight = {
        id: Math.max(...flights.map(f => f.id), 0) + 1,
        flightNumber: formData.flightNumber,
        departureCity: originAirport.city,
        departureCode: originAirport.code,
        arrivalCity: destinationAirport.city,
        arrivalCode: destinationAirport.code,
        departureTime: formData.departureTime, // In real app, might need formatting
        departureDate: formData.departureDate,
        status: "ONTIME",
        aircraft: aircraft.model,
        aircraftRegistration: aircraft.registration,
        gate: formData.gate,
        fare: Number(formData.fare)
      };

      setFlights([...flights, newFlight]);
      setNewFlightId(newFlight.id);
      setTimeout(() => setNewFlightId(null), 2000);
      
      setFormData(initialFormState);
      setIsSubmitting(false);
      showToast(`Flight ${newFlight.flightNumber} added successfully!`, "success");
    }
  };

  const formatRoute = (f) => `${f.departureCode} → ${f.arrivalCode}`;
  const formatFare = (f) => `$${f.fare}`;

  const airportOptions = [
    { label: 'Select Airport', value: '' },
    ...demoAirports.map(a => ({ label: `${a.city} (${a.code})`, value: a.code }))
  ];

  const aircraftOptions = [
    { label: 'Select Aircraft', value: '' },
    ...demoAircraft.map(a => ({ label: `${a.model} (${a.registration})`, value: a.model }))
  ];

  const isFormEmpty = Object.values(formData).every(v => v === '');

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <AirplaneBackground />
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">Flight Management</h1>
            <p className="text-text-secondary mt-1 font-medium italic">Demo Mode — Local state only</p>
          </div>
          
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-bold text-text-secondary group-hover:text-primary transition-colors">Simulate API Errors</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={simulateError}
                  onChange={() => setSimulateError(!simulateError)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
            </label>

            <a href="#add-flight" className="px-5 py-3 text-sm bg-primary text-white font-bold rounded-xl hover:bg-[#B8657A] transition-all shadow-lg shadow-primary/20 active:scale-95">
              <span className="mr-2 text-lg leading-none">+</span> Add Flight
            </a>
          </div>
        </header>

        <Card padding="p-0 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/5 border-b border-border-color">
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Flight No</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Route</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Departure</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Aircraft</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Fare</th>
                  <th className="px-8 py-5 text-[12px] font-bold text-text-secondary uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonTable rows={3} cols={7} />
                ) : flights.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-20 text-center text-text-secondary font-medium italic">No flights available</td>
                  </tr>
                ) : (
                  flights.map((flight) => (
                    <tr 
                      key={flight.id} 
                      className={`group border-b border-border-color last:border-0 hover:bg-secondary/5 transition-all duration-500 cursor-default ${newFlightId === flight.id ? 'bg-[#4CAF5010]' : ''}`}
                    >
                      <td className="px-8 py-6 text-sm font-bold text-text-primary">{flight.flightNumber}</td>
                      <td className="px-8 py-6 text-sm font-semibold text-text-primary">{formatRoute(flight)}</td>
                      <td className="px-8 py-6 text-sm font-semibold text-text-primary">{flight.departureTime}</td>
                      <td className="px-8 py-6">
                        <StatusBadge status={flight.status} />
                      </td>
                      <td className="px-8 py-6 text-sm text-text-secondary font-medium">
                        <span className="block">{flight.aircraft}</span>
                        <span className="text-[10px] uppercase text-text-secondary/60 tracking-wider font-bold">{flight.aircraftRegistration}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-primary">{formatFare(flight)}</td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => openModal('edit', flight)}
                            title="Edit Flight"
                            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-secondary/15 rounded-full transition-all active:scale-90"
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => openModal('status', flight)}
                            title="Update Status"
                            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary hover:bg-secondary/15 rounded-full transition-all active:scale-90"
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => openModal('delete', flight)}
                            title="Delete Flight"
                            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-[#D9534F] hover:bg-[#D9534F1A] rounded-full transition-all active:scale-90"
                          >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add New Flight Section */}
        <div id="add-flight" className="mt-8">
          <Card className="p-7">
            <header className="mb-6 pb-5 border-b border-[#F0EDF5]">
              <h2 className="text-[20px] font-bold text-text-primary tracking-tight">Add New Flight</h2>
              <p className="text-[13px] text-text-secondary mt-1">Fill in the details to add a new flight to the system</p>
            </header>

            <form onSubmit={handleAddFlight} className="space-y-6">
              {submitError && <ErrorBanner message={submitError} />}
              {Object.keys(formErrors).length > 0 && <ErrorBanner message="Please fix the errors below before submitting." />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Flight Number</label>
                  <Input 
                    placeholder="e.g., JA123" 
                    value={formData.flightNumber} 
                    onChange={(e) => setFormData({...formData, flightNumber: e.target.value.toUpperCase()})}
                    error={!!formErrors.flightNumber}
                    disabled={isSubmitting}
                  />
                  {formErrors.flightNumber && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.flightNumber}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Origin</label>
                  <Select 
                    options={airportOptions} 
                    value={formData.origin} 
                    onChange={(e) => setFormData({...formData, origin: e.target.value})}
                    error={!!formErrors.origin}
                    disabled={isSubmitting}
                  />
                  {formErrors.origin && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.origin}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Destination</label>
                  <Select 
                    options={airportOptions} 
                    value={formData.destination} 
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    error={!!formErrors.destination}
                    disabled={isSubmitting}
                  />
                  {formErrors.destination && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.destination}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Departure Time</label>
                  <Input 
                    type="time" 
                    value={formData.departureTime} 
                    onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                    error={!!formErrors.departureTime}
                    disabled={isSubmitting}
                  />
                  {formErrors.departureTime && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.departureTime}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Departure Date</label>
                  <Input 
                    type="date" 
                    value={formData.departureDate} 
                    onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                    error={!!formErrors.departureDate}
                    disabled={isSubmitting}
                  />
                  {formErrors.departureDate && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.departureDate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Aircraft</label>
                  <Select 
                    options={aircraftOptions} 
                    value={formData.aircraft} 
                    onChange={(e) => setFormData({...formData, aircraft: e.target.value})}
                    error={!!formErrors.aircraft}
                    disabled={isSubmitting}
                  />
                  {formErrors.aircraft && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.aircraft}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Gate</label>
                  <Input 
                    placeholder="e.g., A12" 
                    value={formData.gate} 
                    onChange={(e) => setFormData({...formData, gate: e.target.value})}
                    error={!!formErrors.gate}
                    disabled={isSubmitting}
                  />
                  {formErrors.gate && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.gate}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary ml-1">Base Fare ($)</label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 299" 
                    value={formData.fare} 
                    onChange={(e) => setFormData({...formData, fare: e.target.value})}
                    error={!!formErrors.fare}
                    disabled={isSubmitting}
                  />
                  {formErrors.fare && <p className="text-[12px] text-[#D9534F] ml-1">{formErrors.fare}</p>}
                </div>
              </div>

              {formData.origin && formData.destination && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest ml-1">Route Preview</label>
                  <div className="p-3.5 bg-[#F8F6FB] rounded-xl border border-[#F0EDF5] flex items-center justify-center gap-4 animate-fade-in">
                    <span className="text-lg font-bold text-text-primary tracking-tight">{formData.origin}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-[1px] w-8 bg-secondary/30"></div>
                      <svg className="w-5 h-5 text-secondary transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      <div className="h-[1px] w-8 bg-secondary/30"></div>
                    </div>
                    <span className="text-lg font-bold text-text-primary tracking-tight">{formData.destination}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-[#B8657A] transition-all shadow-lg shadow-primary/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isSubmitting ? 'Adding Flight...' : 'Add Flight'}</span>
                </button>

                {!isFormEmpty && !isSubmitting && (
                  <button 
                    type="button"
                    onClick={() => {
                      setFormData(initialFormState);
                      setFormErrors({});
                      setSubmitError(null);
                    }}
                    className="w-full py-3 border border-[#D1CFD6] text-text-secondary font-bold rounded-xl hover:bg-[#F5F3F8] transition-all active:scale-98"
                  >
                    Reset Form
                  </button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>

      <EditFlightModal 
        isOpen={activeModal === 'edit'} 
        onClose={() => setActiveModal(null)} 
        flight={selectedFlight}
        simulateError={simulateError}
        onSave={handleSave}
      />
      <UpdateStatusModal 
        isOpen={activeModal === 'status'} 
        onClose={() => setActiveModal(null)} 
        flight={selectedFlight}
        simulateError={simulateError}
        onUpdate={handleUpdateStatus}
      />
      <DeleteDialog 
        isOpen={activeModal === 'delete'} 
        onClose={() => setActiveModal(null)} 
        flight={selectedFlight}
        simulateError={simulateError}
        onDelete={handleDelete}
      />

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

export default FlightManagement;
