import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import Card from '../components/Card';
import AirplaneBackground from '../components/AirplaneBackground';
import SkeletonCard from '../components/SkeletonCard';

const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo Data
  const demoData = {
    stats: {
      totalFlights: { value: 48, change: 12 },
      totalBookings: { value: 1247, change: 8 },
      activeUsers: { value: 856, change: 15 },
      revenue: { value: 284590, change: 23 }
    },
    recentActivity: [
      { id: 1, action: "New booking created", timeAgo: "5 min ago", user: "John Doe" },
      { id: 2, action: "Flight JA123 status updated", timeAgo: "15 min ago", user: "Admin" },
      { id: 3, action: "User account activated", timeAgo: "1 hour ago", user: "Jane Smith" },
      { id: 4, action: "Payment received", timeAgo: "2 hours ago", user: "Mike Johnson" }
    ],
    monthlyBookings: [
      { month: "January", percentage: 85 },
      { month: "February", percentage: 92 },
      { month: "March", percentage: 78 },
      { month: "April", percentage: 95 }
    ]
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setData(demoData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const formatRevenue = (val) => {
    return '$' + val.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex relative overflow-hidden">
        <AirplaneBackground />
        <Sidebar />
        <main className="flex-1 ml-64 p-10 relative z-10">
          <header className="mb-10">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
          </header>
          <div className="grid grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
               <div className="h-64 bg-white rounded-card border border-border-color animate-pulse p-8">
                 <div className="h-6 w-48 bg-gray-200 rounded mb-8"></div>
                 <div className="space-y-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 rounded"></div>)}
                 </div>
               </div>
            </div>
            <div className="h-64 bg-white rounded-card border border-border-color animate-pulse"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <AirplaneBackground />
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Overview</h1>
          <p className="text-text-secondary mt-1 font-medium">Demo Mode — No API connection</p>
        </header>

        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Flights" 
            value={data.stats.totalFlights.value} 
            change={data.stats.totalFlights.change} 
            type="number"
          />
          <StatCard 
            title="Total Bookings" 
            value={data.stats.totalBookings.value} 
            change={data.stats.totalBookings.change} 
            type="number"
          />
          <StatCard 
            title="Active Users" 
            value={data.stats.activeUsers.value} 
            change={data.stats.activeUsers.change} 
            type="number"
          />
          <StatCard 
            title="Revenue" 
            value={formatRevenue(data.stats.revenue.value)} 
            change={data.stats.revenue.change} 
            type="currency"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card title="Monthly Bookings">
              <div className="space-y-6">
                {data.monthlyBookings.map((mb, i) => (
                  <ProgressBar key={i} month={mb.month} percentage={mb.percentage} />
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card title="Recent Activity">
              <div className="space-y-5">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col border-b border-border-color last:border-0 pb-4 last:pb-0 hover:bg-secondary/5 transition-colors p-2 rounded-lg cursor-default group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{activity.action}</p>
                      <span className="text-[11px] font-bold text-text-secondary uppercase">{activity.timeAgo}</span>
                    </div>
                    <p className="text-xs text-text-secondary font-medium">User: {activity.user}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOverview;
