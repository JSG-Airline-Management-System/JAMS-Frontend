import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import BookingStepper from '../components/BookingStepper';
import FareSummary from '../components/FareSummary';
import Toast from '../components/Toast';
import Card from '../components/Card';
import Button from '../components/Button';

const PassengerBaggage = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(0);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage
  const bookingData = useMemo(() => {
    const saved = localStorage.getItem('activeBooking');
    return saved ? JSON.parse(saved) : {
      flightNumber: "JA123",
      origin: "JFK",
      destination: "LAX",
      departureDate: "May 15, 2026",
      departureTime: "10:30 AM",
      arrivalTime: "1:45 PM",
      fare: 299,
      selectedSeat: { label: "4B", column: "B" } // Mock seat if not found
    };
  }, []);

  const freeAllowance = 23;
  const excessRate = 10;
  const maxWeight = 100;
  
  const excessWeight = Math.max(0, weight - freeAllowance);
  const baggageFee = excessWeight * excessRate;
  const isOverLimit = weight > maxWeight;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWeightChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setWeight(Math.max(0, val));
  };

  const handleContinue = () => {
    if (isOverLimit) {
      showToast("Baggage exceeds maximum limit of 100kg", "error");
      return;
    }
    showToast("Baggage saved. Proceeding to Payment...");
    // Save to localStorage
    const updatedBooking = { ...bookingData, baggageWeight: weight, baggageFee };
    localStorage.setItem('activeBooking', JSON.stringify(updatedBooking));
    
    setTimeout(() => {
      navigate('/passenger/booking/payment');
    }, 600);
  };

  const getProgressColor = () => {
    if (weight <= 23) return 'bg-success';
    if (weight <= 40) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={3} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Baggage Selection</h1>
            <p className="text-text-secondary mt-1 font-medium italic">Step 3: Tell us about your luggage</p>
          </div>

          <BookingStepper currentStep={3} />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-full h-[400px] bg-white rounded-3xl border border-border-color/20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {/* Left: Baggage Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 shadow-soft-lavender border border-border-color">
                  {/* Info Banner */}
                  <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10 flex items-start gap-4 mb-10">
                    <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">Free baggage allowance: 23kg per passenger</p>
                      <p className="text-xs text-text-secondary mt-0.5">Additional baggage: $10 per kg. Maximum 100kg per person.</p>
                    </div>
                  </div>

                  {/* Weight Input Area */}
                  <div className="flex flex-col items-center max-w-md mx-auto space-y-8">
                    <div className="w-full text-center">
                      <label className="text-sm font-bold text-text-primary uppercase tracking-widest block mb-4">Total Baggage Weight (kg)</label>
                      <div className="relative flex items-center justify-center gap-4">
                        <button 
                          onClick={() => setWeight(Math.max(0, weight - 1))}
                          className="w-12 h-12 rounded-full border border-border-color flex items-center justify-center text-text-secondary hover:bg-secondary/5 transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                        </button>
                        
                        <input 
                          type="number" 
                          value={weight}
                          onChange={handleWeightChange}
                          className={`w-32 h-16 text-center text-3xl font-extrabold rounded-2xl border-2 transition-all outline-none ${
                            isOverLimit ? 'border-error text-error bg-error/5' : 'border-border-color focus:border-primary text-text-primary'
                          }`}
                        />

                        <button 
                          onClick={() => setWeight(Math.min(100, weight + 1))}
                          className="w-12 h-12 rounded-full border border-border-color flex items-center justify-center text-text-secondary hover:bg-secondary/5 transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" /></svg>
                        </button>
                      </div>
                      {isOverLimit && (
                        <p className="text-xs text-error font-bold mt-3">Maximum weight limit reached (100kg)</p>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                        <span>0kg</span>
                        <span>{freeAllowance}kg Free</span>
                        <span>100kg Max</span>
                      </div>
                      <div className="h-3 w-full bg-background rounded-full overflow-hidden border border-border-color/50">
                        <div 
                          className={`h-full transition-all duration-500 ${getProgressColor()}`}
                          style={{ width: `${Math.min(100, (weight / 100) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Excess Fee breakdown */}
                    <div className="w-full">
                      {weight <= freeAllowance ? (
                        <div className="flex items-center gap-3 p-4 bg-success/5 rounded-2xl border border-success/10 text-success animate-fade-in">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          <p className="text-sm font-bold">Within free baggage allowance</p>
                        </div>
                      ) : (
                        <div className={`p-5 rounded-2xl border-l-4 animate-fade-in ${
                          weight <= 40 ? 'bg-[#FEF8E7] border-warning text-text-primary' : 'bg-[#FEF0EF] border-error text-text-primary'
                        }`}>
                          <div className="flex justify-between items-start mb-4">
                            <p className="text-sm font-bold uppercase tracking-wide">Excess Baggage Summary</p>
                            <span className={`text-xl font-extrabold ${weight <= 40 ? 'text-warning' : 'text-error'}`}>
                              ${baggageFee.toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-1 text-[13px] font-medium opacity-80">
                            <p>Excess weight: {excessWeight} kg ({weight}kg total - {freeAllowance}kg free)</p>
                            <p>Rate: ${excessRate} per additional kg</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Baggage Tips */}
                <Card className="p-6 border border-border-color bg-white/50">
                  <h4 className="text-sm font-bold text-text-primary mb-3">Baggage Guidelines</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Maximum weight per single bag is 32kg for safety.
                    </li>
                    <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Liquids in carry-on must be under 100ml.
                    </li>
                    <li className="flex items-center gap-3 text-xs text-text-secondary font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Batteries and power banks must be in carry-on baggage.
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Right: Fare Summary */}
              <div className="lg:col-span-1">
                <FareSummary 
                  flight={bookingData}
                  selectedSeat={bookingData.selectedSeat}
                  baggageFee={baggageFee}
                  currentStep={3}
                  onContinue={handleContinue}
                  continueText="Continue to Payment"
                  isContinueDisabled={isOverLimit}
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

export default PassengerBaggage;
