import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    ONTIME: 'bg-[#4CAF50]/10 text-[#4CAF50]',
    ACTIVE: 'bg-[#4CAF50]/10 text-[#4CAF50]',
    DELAYED: 'bg-[#F5A623]/10 text-[#F5A623]',
    BLOCKED: 'bg-[#D9534F]/10 text-[#D9534F]',
    CANCELLED: 'bg-[#D9534F]/10 text-[#D9534F]',
    BOARDING: 'bg-[#A78BCA]/10 text-[#A78BCA]',
    DEPARTED: 'bg-[#4CAF50]/10 text-[#4CAF50]',
    COMPLETED: 'bg-[#4CAF50]/10 text-[#4CAF50]',
    PENDING: 'bg-[#F5A623]/10 text-[#F5A623]',
    REFUNDED: 'bg-[#D9534F]/10 text-[#D9534F]',
    CONFIRMED: 'bg-[#4CAF50]/10 text-[#4CAF50]',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${styles[status] || 'bg-text-secondary/10 text-text-secondary'} hover:scale-105 transition-all duration-150 cursor-default inline-block`}>
      {status}
    </span>
  );
};

export default StatusBadge;
