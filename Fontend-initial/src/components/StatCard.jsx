import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, change, type }) => {
  const isPositive = change >= 0;
  const displayChange = (isPositive ? '+' : '') + change + '%';

  return (
    <Card 
      className="flex flex-col hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-default"
      padding="p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[12px] font-bold text-text-secondary uppercase tracking-widest">{title}</span>
        <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
          {type === 'currency' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-3xl font-extrabold text-text-primary tracking-tight">{value}</h3>
        <p className={`text-[13px] font-bold mt-1 ${isPositive ? 'text-[#4CAF50]' : 'text-[#D9534F]'}`}>
          {displayChange} <span className="text-text-secondary font-medium ml-0.5 italic">vs last month</span>
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
