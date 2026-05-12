import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';

const LandingPage = () => {
  const features = [
    {
      title: 'Easy Booking',
      description: 'Book your flights in just a few clicks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4.7 20.3 4c-.7-.7-2-.7-3.5.8L13.3 8.3 5.1 6.5c-.4-.1-.8.1-1 .5s0 .9.4 1.1l7.5 4.1-3.2 3.2-3-.3c-.3 0-.6.1-.8.3l-.6.6c-.2.2-.2.5-.1.7l1.8 1.8.1.1 1.8 1.8c.2.2.5.2.7-.1l.6-.6c.2-.2.3-.5.3-.8l-.3-3 3.2-3.2 4.1 7.5c.2.4.6.6 1 .5s.6-.6.5-1z"/>
        </svg>
      )
    },
    {
      title: 'Secure Payments',
      description: 'Your transactions are safe with us',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      title: '24/7 Support',
      description: 'We are here to help anytime',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      title: 'Best Prices',
      description: 'Competitive fares for all destinations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-text-primary mb-4 tracking-tight">
          Welcome to JAMS
        </h1>
        <p className="text-xl text-text-secondary">
          Your trusted airline management system
        </p>
      </section>

      {/* Search Flights Card */}
      <section className="max-w-5xl mx-auto mb-20">
        <Card padding="p-10">
          <h2 className="text-lg font-semibold text-text-primary mb-6">
            Search Flights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Input placeholder="Origin" />
            </div>
            <div className="space-y-2">
              <Input placeholder="Destination" />
            </div>
            <div className="space-y-2">
              <Input type="date" placeholder="mm/dd/yyyy" />
            </div>
            <div>
              <Button className="w-full py-3.5">
                Search
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
