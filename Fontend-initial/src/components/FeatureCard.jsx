import React from 'react';
import Card from './Card';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
      <div className="w-16 h-16 mb-6 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;
