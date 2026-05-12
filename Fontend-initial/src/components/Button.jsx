import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-2 transition-all duration-200 font-medium flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary text-white rounded-full hover:bg-primary/90',
    outline: 'border border-primary text-primary rounded-full hover:bg-primary/5',
    text: 'text-text-secondary hover:text-primary',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
