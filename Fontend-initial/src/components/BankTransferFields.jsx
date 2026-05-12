import React from 'react';
import Select from './Select';

const BankTransferFields = ({ data, onChange }) => {
  const banks = [
    { label: "Habib Bank Limited (HBL)", value: "hbl" },
    { label: "United Bank Limited (UBL)", value: "ubl" },
    { label: "National Bank of Pakistan (NBP)", value: "nbp" },
    { label: "MCB Bank", value: "mcb" },
    { label: "Allied Bank", value: "allied" },
    { label: "Bank Alfalah", value: "alfalah" },
    { label: "Standard Chartered", value: "sc" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10 flex items-start gap-4">
        <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary">Bank Verification Required</p>
          <p className="text-xs text-text-secondary mt-0.5 italic">Your booking will be confirmed once payment is verified (typically 2-24 hours).</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Select Bank</label>
          <Select
            options={banks}
            value={data.bankName}
            onChange={(e) => onChange({ ...data, bankName: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Account Holder Name</label>
          <input
            type="text"
            value={data.accountHolder}
            onChange={(e) => onChange({ ...data, accountHolder: e.target.value })}
            placeholder="Name as on account"
            className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Account Number / IBAN</label>
          <input
            type="text"
            value={data.accountNumber}
            onChange={(e) => onChange({ ...data, accountNumber: e.target.value })}
            placeholder="PK36 SCBL 0000 0011 2233 4455"
            className="w-full h-12 bg-white border border-border-color rounded-xl px-4 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default BankTransferFields;
