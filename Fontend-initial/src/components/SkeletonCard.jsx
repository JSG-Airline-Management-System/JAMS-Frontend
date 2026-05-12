import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white p-6 rounded-card border border-border-color animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        <div className="w-12 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
      <div className="w-16 h-4 bg-gray-100 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
