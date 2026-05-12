import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const themes = {
    success: { border: 'border-[#4CAF50]', icon: '#4CAF50', bg: 'bg-[#4CAF501A]' },
    error: { border: 'border-[#D9534F]', icon: '#D9534F', bg: 'bg-[#D9534F1A]' },
    warning: { border: 'border-[#F5A623]', icon: '#F5A623', bg: 'bg-[#F5A6231A]' },
    info: { border: 'border-[#A78BCA]', icon: '#A78BCA', bg: 'bg-[#A78BCA1A]' }
  };

  const theme = themes[type] || themes.info;

  return (
    <div 
      className={`fixed top-8 right-8 z-[200] bg-white border-l-[3px] ${theme.border} px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`p-1.5 rounded-full ${theme.bg}`} style={{ color: theme.icon }}>
        {type === 'success' ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <p className="text-sm font-bold text-text-primary">{message}</p>
      <button onClick={() => setIsVisible(false)} className="ml-2 text-text-secondary hover:text-text-primary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
