import React, { useState, useEffect } from 'react';

const ProgressBar = ({ label, percentage }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-text-secondary font-medium">{label}</span>
        <span className="text-text-primary font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-[#F0EDF5] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
