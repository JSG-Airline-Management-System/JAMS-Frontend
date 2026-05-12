import React from 'react';

const ErrorBanner = ({ message, onRetry, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`w-full bg-[#D9534F1A] text-[#D9534F] py-3.5 px-5 rounded-xl border border-[#D9534F33] text-sm flex items-center justify-between animate-fade-in ${className}`}>
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold">{message}</span>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="ml-4 px-4 py-1.5 rounded-lg border border-[#D9534F] text-[#D9534F] font-bold text-xs hover:bg-[#D9534F] hover:text-white transition-all active:scale-95"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
