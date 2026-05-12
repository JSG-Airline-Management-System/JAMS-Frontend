import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Overview', path: '/admin', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )},
    { label: 'Flight Management', path: '/admin/flights', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    )},
    { label: 'User Management', path: '/admin/users', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { label: 'Transactions', path: '/admin/transactions', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )},
    { label: 'Profile', path: '/admin/profile', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )}
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-border-color flex flex-col fixed left-0 top-0 z-40">
      <div className="p-8">
        <Link to="/" className="text-2xl font-extrabold text-primary tracking-wider mb-1 block">JAMS</Link>
        <p className="text-[11px] text-text-secondary font-medium tracking-widest uppercase opacity-70">Admin Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-200 group border-l-[3px] ${
                isActive 
                ? 'bg-primary/10 text-primary border-primary font-semibold' 
                : 'text-text-secondary border-transparent hover:bg-secondary/15 hover:text-primary'
              }`}
            >
              <span className={isActive ? 'text-primary' : 'text-secondary opacity-70 group-hover:opacity-100 transition-opacity'}>
                {item.icon}
              </span>
              <span className="text-sm font-semibold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-border-color">
        <Link 
          to="/login"
          className="flex items-center justify-center gap-3 px-4 py-3 text-[#D9534F] border border-[#D9534F] rounded-xl hover:bg-[#D9534F]/10 transition-all duration-200 group font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
