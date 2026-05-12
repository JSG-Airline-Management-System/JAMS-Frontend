import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import ErrorBanner from './ErrorBanner';

const EditFlightModal = ({ isOpen, onClose, flight, onSave, simulateError }) => {
  const [formData, setFormData] = useState(flight || {});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Demo Data
  const demoAirports = [
    { id: 1, code: "KHI", name: "Jinnah International Airport", city: "Karachi", country: "Pakistan" },
    { id: 2, code: "LHE", name: "Allama Iqbal International Airport", city: "Lahore", country: "Pakistan" },
    { id: 3, code: "ISB", name: "Islamabad International Airport", city: "Islamabad", country: "Pakistan" },
    { id: 4, code: "PEW", name: "Bacha Khan International Airport", city: "Peshawar", country: "Pakistan" },
    { id: 5, code: "UET", name: "Quetta International Airport", city: "Quetta", country: "Pakistan" },
    { id: 6, code: "MUX", name: "Multan International Airport", city: "Multan", country: "Pakistan" },
    { id: 7, code: "SKT", name: "Sialkot International Airport", city: "Sialkot", country: "Pakistan" },
    { id: 8, code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
    { id: 9, code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
    { id: 10, code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
    { id: 11, code: "JED", name: "King Abdulaziz International", city: "Jeddah", country: "Saudi Arabia" },
    { id: 12, code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" }
  ];

  const demoAircraft = [
    { id: 1, model: "Boeing 737", registration: "AP-BCA", capacity: 180 },
    { id: 2, model: "Airbus A320", registration: "AP-CDA", capacity: 160 },
    { id: 3, model: "Boeing 777", registration: "AP-EFG", capacity: 350 },
    { id: 4, model: "Airbus A380", registration: "AP-HIJ", capacity: 500 },
    { id: 5, model: "Boeing 787", registration: "AP-KLM", capacity: 280 }
  ];

  useEffect(() => {
    if (flight) {
      setFormData({ ...flight });
      setError(null);
    }
  }, [flight]);

  if (!isOpen || !flight) return null;

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(flight);

  const handleClose = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const airportOptions = [
    {
      label: '--- Pakistan Cities ---',
      options: demoAirports
        .filter(a => a.country === 'Pakistan')
        .map(a => ({ label: `${a.city} (${a.code})`, value: a.code }))
    },
    {
      label: '--- World Cities ---',
      options: demoAirports
        .filter(a => a.country !== 'Pakistan')
        .map(a => ({ label: `${a.city} (${a.code})`, value: a.code }))
    }
  ];

  const aircraftOptions = demoAircraft.map(a => ({
    label: `${a.model} (${a.registration})`,
    value: a.model
  }));

  const handleCityChange = (key, code) => {
    const city = demoAirports.find(a => a.code === code)?.city || '';
    setFormData({ 
      ...formData, 
      [`${key}Code`]: code,
      [`${key}City`]: city
    });
  };

  const isInvalidRoute = formData.departureCode === formData.arrivalCode;
  const isFormValid = formData.departureCode && formData.arrivalCode && formData.departureTime && formData.departureDate && formData.gate && formData.fare > 0 && !isInvalidRoute;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSaving(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (simulateError) {
      setError('Failed to update flight. Please try again.');
      setIsSaving(false);
    } else {
      onSave(formData);
      setIsSaving(false);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} title={`Edit Flight — ${flight.flightNumber}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorBanner message={error} />}
          
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Departure City</label>
              <Select 
                options={airportOptions} 
                value={formData.departureCode} 
                onChange={(e) => handleCityChange('departure', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Arrival City</label>
              <Select 
                options={airportOptions} 
                value={formData.arrivalCode} 
                onChange={(e) => handleCityChange('arrival', e.target.value)} 
                className={isInvalidRoute ? 'border-[#D9534F] focus:ring-[#D9534F]/20 focus:border-[#D9534F]' : ''}
              />
            </div>
          </div>

          {isInvalidRoute && (
            <p className="text-[12px] text-[#D9534F] font-semibold mt-[-12px] ml-1">
              Departure and arrival cannot be the same city
            </p>
          )}

          <div className="p-4 bg-[#F8F6FB] rounded-xl flex items-center justify-center gap-4 border border-[#F0EDF5]">
            <span className="text-lg font-bold text-text-primary tracking-tight">{formData.departureCode}</span>
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-secondary/30"></div>
              <svg className="w-5 h-5 text-secondary transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <div className="h-[1px] w-8 bg-secondary/30"></div>
            </div>
            <span className="text-lg font-bold text-text-primary tracking-tight">{formData.arrivalCode}</span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Departure Time</label>
              <Input value={formData.departureTime} onChange={(e) => setFormData({...formData, departureTime: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Departure Date</label>
              <Input type="date" value={formData.departureDate} onChange={(e) => setFormData({...formData, departureDate: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Aircraft</label>
              <Select 
                options={aircraftOptions} 
                value={formData.aircraft} 
                onChange={(e) => {
                  const model = e.target.value;
                  const reg = demoAircraft.find(a => a.model === model)?.registration || '';
                  setFormData({...formData, aircraft: model, aircraftRegistration: reg});
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1 text-text-secondary/60">Flight Number (Disabled)</label>
              <Input value={flight.flightNumber} disabled className="bg-[#F5F3F8] cursor-not-allowed opacity-70" />
              <p className="text-[11px] text-text-secondary italic mt-1 ml-1">Flight number cannot be changed</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Gate</label>
              <Input placeholder="e.g. A12" value={formData.gate} onChange={(e) => setFormData({...formData, gate: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary ml-1">Fare ($)</label>
              <Input type="number" placeholder="299" value={String(formData.fare).replace('$', '')} onChange={(e) => setFormData({...formData, fare: Number(e.target.value)})} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#F0EDF5]">
            <button 
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl border border-[#D1CFD6] text-text-secondary font-semibold hover:bg-[#F5F3F8] transition-colors"
            >
              Cancel
            </button>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSaving || !isFormValid}
              className="px-8 py-2.5"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Discard Confirmation Dialog */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D2D2D]/30 backdrop-blur-sm" onClick={() => setShowDiscardConfirm(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-[380px] w-full text-center animate-modal-slide-up">
            <h3 className="text-xl font-bold text-text-primary mb-2">Discard changes?</h3>
            <p className="text-sm text-text-secondary mb-8 leading-relaxed">
              You have unsaved changes. Are you sure you want to discard them?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-[#D9534F] text-white font-bold rounded-xl hover:bg-[#C9302C] transition-all active:scale-95 shadow-lg shadow-[#D9534F]/20"
              >
                Discard
              </button>
              <button 
                onClick={() => setShowDiscardConfirm(false)}
                className="w-full py-3 bg-gray-50 text-text-secondary font-bold rounded-xl hover:bg-gray-100 transition-all border border-[#D1CFD6]"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFlightModal;
