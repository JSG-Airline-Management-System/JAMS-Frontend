import React from 'react';

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  const methods = [
    { 
      id: 'card', 
      label: 'Card', 
      sub: 'Visa, Mastercard',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      id: 'bank', 
      label: 'Bank Transfer', 
      sub: 'Direct bank payment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      id: 'wallet', 
      label: 'Wallet', 
      sub: 'JAMS Wallet, PayPal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-3">
      <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest block">Select Payment Method</label>
      <div className="flex gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={`flex-1 relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 group ${
              selectedMethod === method.id 
                ? 'bg-primary/5 border-primary text-primary' 
                : 'bg-white border-border-color text-text-secondary hover:border-secondary/50 hover:bg-secondary/5'
            }`}
          >
            {selectedMethod === method.id && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center animate-scale-in">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`transition-colors duration-200 ${selectedMethod === method.id ? 'text-primary' : 'text-text-secondary opacity-60 group-hover:opacity-100'}`}>
              {method.icon}
            </div>
            <div className="text-center">
              <p className={`text-sm font-bold ${selectedMethod === method.id ? 'text-primary' : 'text-text-primary'}`}>{method.label}</p>
              <p className="text-[10px] font-medium opacity-60">{method.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
