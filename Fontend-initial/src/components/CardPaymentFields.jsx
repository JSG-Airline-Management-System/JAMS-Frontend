import React, { useState, useEffect } from 'react';
import Input from './Input';

const CardPaymentFields = ({ data, onChange }) => {
  const [cardType, setCardType] = useState(null);

  useEffect(() => {
    const firstDigit = data.cardNumber?.[0];
    if (firstDigit === '4') setCardType('visa');
    else if (firstDigit === '5') setCardType('mastercard');
    else if (firstDigit === '3') setCardType('amex');
    else setCardType(null);
  }, [data.cardNumber]);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formattedValue += ' ';
      formattedValue += value[i];
    }
    onChange({ ...data, cardNumber: formattedValue.slice(0, 19) });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    onChange({ ...data, expiry: formattedValue.slice(0, 5) });
  };

  const handleCVVChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    onChange({ ...data, cvv: value.slice(0, cardType === 'amex' ? 4 : 3) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Card Preview */}
      <div className="relative w-full h-44 bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-lg overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl" />
        
        <div className="relative flex justify-between items-start mb-8">
          <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
            <div className="w-8 h-6 border border-white/40 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-white/30 rounded-sm" />
            </div>
          </div>
          {cardType && (
            <span className="text-sm font-black uppercase tracking-tighter italic">
              {cardType === 'visa' ? 'VISA' : cardType === 'mastercard' ? 'MASTERCARD' : 'AMEX'}
            </span>
          )}
        </div>

        <div className="relative mb-6">
          <p className="text-xl font-bold tracking-[0.25em] h-8">
            {data.cardNumber || '•••• •••• •••• ••••'}
          </p>
        </div>

        <div className="relative flex justify-between items-end">
          <div>
            <p className="text-[8px] uppercase tracking-widest opacity-60 mb-0.5">Cardholder</p>
            <p className="text-xs font-bold uppercase truncate max-w-[150px]">{data.cardholder || 'YOUR NAME'}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-widest opacity-60 mb-0.5">Expiry</p>
            <p className="text-xs font-bold">{data.expiry || 'MM/YY'}</p>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Card Number</label>
          <div className="relative">
            <input
              type="text"
              value={data.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
            />
            {cardType && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
                 {/* Card Icon */}
                 {cardType === 'visa' ? (
                   <span className="text-[10px] font-black italic">VISA</span>
                 ) : cardType === 'mastercard' ? (
                   <div className="flex -space-x-2">
                     <div className="w-4 h-4 bg-error rounded-full opacity-80" />
                     <div className="w-4 h-4 bg-warning rounded-full opacity-80" />
                   </div>
                 ) : (
                   <span className="text-[10px] font-black italic uppercase text-secondary">AMEX</span>
                 )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Expiry Date</label>
            <input
              type="text"
              value={data.expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">CVV</label>
              <div className="group relative">
                <svg className="w-3.5 h-3.5 text-text-secondary cursor-help" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-text-primary text-white text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                  The 3 or 4 digit security code on the back of your card.
                </div>
              </div>
            </div>
            <input
              type="password"
              value={data.cvv}
              onChange={handleCVVChange}
              placeholder="•••"
              className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Cardholder Name</label>
          <input
            type="text"
            value={data.cardholder}
            onChange={(e) => onChange({ ...data, cardholder: e.target.value })}
            placeholder="e.g. John Doe"
            className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default CardPaymentFields;
