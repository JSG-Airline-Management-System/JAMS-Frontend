import React from 'react';

const Card = ({ children, className = '', padding = 'p-8' }) => {
  return (
    <div className={`bg-white rounded-card shadow-soft-lavender ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
