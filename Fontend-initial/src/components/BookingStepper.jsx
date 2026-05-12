import React from 'react';

const BookingStepper = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, label: 'Search' },
    { id: 2, label: 'Select Seat' },
    { id: 3, label: 'Baggage' },
    { id: 4, label: 'Payment' },
    { id: 5, label: 'Confirmation' }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-[2px] bg-border-color -z-10">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep || (currentStep === 5);
          const isActive = step.id === currentStep && currentStep !== 5;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                  ? 'bg-success border-success text-white' 
                  : isActive 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' 
                  : 'bg-white border-border-color text-text-secondary'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <span className={`text-[11px] font-bold mt-2 uppercase tracking-widest ${
                isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Mobile View Indicator */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-sm font-bold text-text-primary">Step {currentStep} of 5</p>
      </div>
    </div>
  );
};

export default BookingStepper;
