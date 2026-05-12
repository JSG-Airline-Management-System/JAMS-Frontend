import React from 'react';

const Input = ({ placeholder, type = 'text', className = '', error, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-input border bg-white text-text-primary placeholder:text-text-secondary/50 focus:outline-none transition-all ${
        error 
        ? 'border-[#D9534F] focus:ring-2 focus:ring-[#FEE2E2] focus:border-[#D9534F]' 
        : 'border-border-color focus:ring-2 focus:ring-secondary/30 focus:border-secondary'
      } ${className}`}
      {...props}
    />
  );
};

export default Input;
