import React from 'react';

const NotificationItem = ({ notification, onClick, onDismiss }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { title, message, timeAgo, isRead, icon, color, type, promoCode } = notification;

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
    if (!isRead) {
      onClick(notification);
    }
  };

  const renderIcon = () => {
    switch (icon) {
      case 'check-circle':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'dollar':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'clock':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'check':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
      case 'refresh':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
      case 'tag':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
      case 'info':
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      default:
        return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
    }
  };

  return (
    <div 
      onClick={handleItemClick}
      className={`group relative flex items-start gap-5 p-5 rounded-2xl transition-all duration-200 cursor-pointer border-l-[3px] ${
        isRead 
        ? 'bg-white border-transparent hover:bg-secondary/5' 
        : 'bg-primary/[0.03] border-primary hover:bg-primary/[0.06]'
      }`}
    >
      <div 
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}1F`, color: color }}
      >
        {renderIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`text-sm font-bold tracking-tight ${isRead ? 'text-text-primary' : 'text-primary'}`}>
            {title}
          </h4>
          {!isRead && (
            <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-sm shadow-primary/30" />
          )}
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed mb-2 font-medium">
          {message}
        </p>
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[11px] text-text-secondary font-bold uppercase tracking-widest">{timeAgo}</span>
        </div>

        {type === 'promotion' && isExpanded && (
          <div className="mt-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10 flex items-center justify-between animate-fade-in">
            <div>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Promo Code</p>
              <p className="text-sm font-bold text-text-primary">{promoCode}</p>
            </div>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                navigator.clipboard.writeText(promoCode);
                alert("Promo code copied to clipboard!");
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all active:scale-95"
            >
              Copy Code
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onDismiss(notification.id); }}
        className="absolute top-4 right-4 p-1.5 text-text-secondary/30 hover:text-primary opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-primary/10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationItem;
