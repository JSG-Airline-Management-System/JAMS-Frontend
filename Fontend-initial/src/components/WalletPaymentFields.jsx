import React from 'react';

const WalletPaymentFields = ({ data, onChange, totalAmount }) => {
  const walletBalance = 450.00; // Mock balance
  const isInsufficient = totalAmount > walletBalance;
  const balanceAfter = walletBalance - totalAmount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Wallet Selector */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange({ ...data, walletType: 'jams' })}
          className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
            data.walletType === 'jams' ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-border-color text-text-secondary opacity-60'
          }`}
        >
          <span className="text-xs font-bold">JAMS Wallet</span>
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, walletType: 'paypal' })}
          className={`flex-1 p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
            data.walletType === 'paypal' ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-border-color text-text-secondary opacity-60'
          }`}
        >
          <span className="text-xs font-bold">PayPal</span>
        </button>
      </div>

      {data.walletType === 'jams' ? (
        <div className="space-y-6 animate-slide-up">
          <div className="bg-background rounded-2xl p-6 text-center border border-border-color">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Available Balance</p>
            <p className="text-3xl font-black text-text-primary mb-4">${walletBalance.toFixed(2)}</p>
            <div className="flex justify-between items-center pt-4 border-t border-border-color/50 text-xs font-bold">
              <div className="text-left">
                <p className="text-text-secondary opacity-60 uppercase tracking-tighter">Booking Cost</p>
                <p className="text-text-primary">-${totalAmount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary opacity-60 uppercase tracking-tighter">Balance After</p>
                <p className={isInsufficient ? 'text-error' : 'text-success'}>
                  ${balanceAfter.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {isInsufficient ? (
            <div className="p-4 bg-error/5 border border-error/10 rounded-xl flex items-center gap-3 text-error">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-bold">Insufficient funds. Please top up your wallet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Wallet PIN</label>
              <input
                type="password"
                maxLength={4}
                value={data.pin}
                onChange={(e) => onChange({ ...data, pin: e.target.value.replace(/\D/g, '') })}
                placeholder="••••"
                className="w-full h-12 bg-white border border-border-color rounded-xl px-4 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <p className="text-[10px] text-text-secondary text-center italic mt-1">Enter your 4-digit JAMS security PIN</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-slide-up">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">PayPal Email</label>
            <input
              type="email"
              value={data.paypalEmail}
              onChange={(e) => onChange({ ...data, paypalEmail: e.target.value })}
              placeholder="e.g. john@example.com"
              className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="p-4 bg-secondary/5 border border-secondary/10 rounded-xl text-center">
            <p className="text-xs font-bold text-secondary">You will be redirected to PayPal's secure portal to authorize the payment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPaymentFields;
