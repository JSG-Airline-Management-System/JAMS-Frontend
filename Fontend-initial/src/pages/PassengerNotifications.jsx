import React, { useState, useMemo } from 'react';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import NotificationItem from '../components/NotificationItem';
import Toast from '../components/Toast';
import Card from '../components/Card';
import Button from '../components/Button';

const demoNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for flight JA123 (JFK → LAX) has been confirmed",
    timeAgo: "2 hours ago",
    timestamp: "2026-05-03T14:30:00",
    isRead: false,
    icon: "check-circle",
    color: "#4CAF50",
    flightNumber: "JA123",
    bookingId: "BK001"
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "Payment of $299 received successfully",
    timeAgo: "2 hours ago",
    timestamp: "2026-05-03T14:00:00",
    isRead: false,
    icon: "dollar",
    color: "#4CAF50",
    amount: 299
  },
  {
    id: 3,
    type: "booking",
    title: "Schedule Change",
    message: "Flight JA456 departure time changed to 3:00 PM",
    timeAgo: "1 day ago",
    timestamp: "2026-05-02T10:00:00",
    isRead: false,
    icon: "clock",
    color: "#F5A623",
    flightNumber: "JA456"
  },
  {
    id: 4,
    type: "booking",
    title: "Check-in Available",
    message: "Check-in now available for flight JA123",
    timeAgo: "2 days ago",
    timestamp: "2026-05-01T08:00:00",
    isRead: true,
    icon: "check",
    color: "#A78BCA",
    flightNumber: "JA123"
  },
  {
    id: 5,
    type: "payment",
    title: "Refund Processed",
    message: "Refund of $169.15 processed for cancelled booking BK003",
    timeAgo: "1 week ago",
    timestamp: "2026-04-26T16:00:00",
    isRead: true,
    icon: "refresh",
    color: "#D9534F",
    amount: 169.15,
    bookingId: "BK003"
  },
  {
    id: 6,
    type: "promotion",
    title: "Special Offer",
    message: "Get 15% off on your next booking to Dubai. Use code JAMS15",
    timeAgo: "3 days ago",
    timestamp: "2026-05-01T12:00:00",
    isRead: true,
    icon: "tag",
    color: "#A78BCA",
    promoCode: "JAMS15"
  },
  {
    id: 7,
    type: "booking",
    title: "Gate Change",
    message: "Flight JA123 gate changed to B12 at JFK Terminal 4",
    timeAgo: "4 days ago",
    timestamp: "2026-04-29T09:00:00",
    isRead: true,
    icon: "info",
    color: "#F5A623",
    flightNumber: "JA123"
  }
];

const PassengerNotifications = () => {
  const [notifications, setNotifications] = useState(demoNotifications);
  const [activeTab, setActiveTab] = useState('All');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length
  , [notifications]);

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case 'Unread':
        return notifications.filter(n => !n.isRead);
      case 'Booking Updates':
        return notifications.filter(n => n.type === 'booking');
      case 'Payments':
        return notifications.filter(n => n.type === 'payment');
      case 'Promotions':
        return notifications.filter(n => n.type === 'promotion');
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  const handleMarkAsRead = (notification) => {
    if (!notification.isRead) {
      setNotifications(prev => prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      ));
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast("All notifications marked as read");
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast("Notification dismissed");
  };

  const tabs = [
    { name: 'All', count: notifications.length },
    { name: 'Unread', count: unreadCount },
    { name: 'Booking Updates', count: notifications.filter(n => n.type === 'booking').length },
    { name: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { name: 'Promotions', count: notifications.filter(n => n.type === 'promotion').length }
  ];

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={unreadCount} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Notifications</h1>
              <p className="text-text-secondary mt-1 font-medium">Stay updated with your flights and account</p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline transition-all pb-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.name 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-white text-text-secondary hover:bg-secondary/10 hover:text-primary border border-border-color'
                }`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-secondary/15 text-secondary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3 animate-fade-in">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onClick={handleMarkAsRead}
                  onDismiss={handleDismiss}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white/50 rounded-3xl border border-dashed border-border-color">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center text-text-secondary/20 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary">No notifications yet</h3>
                <p className="text-text-secondary text-sm">We'll notify you about your flights and offers here</p>
                {activeTab !== 'All' && (
                  <Button 
                    variant="text" 
                    className="mt-4 text-primary font-bold"
                    onClick={() => setActiveTab('All')}
                  >
                    View All Notifications
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default PassengerNotifications;
