import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import AirplaneBackground from '../components/AirplaneBackground';
import Input from '../components/Input';
import Toast from '../components/Toast';
import UserActionDialog from '../components/UserActionDialog';

const demoUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "ACTIVE", role: "Passenger", bookings: 12 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "ACTIVE", role: "Passenger", bookings: 8 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "BLOCKED", role: "Passenger", bookings: 3 },
  { id: 4, name: "Admin User", email: "admin@jams.com", status: "ACTIVE", role: "Admin", bookings: 0 },
  { id: 5, name: "Sarah Khan", email: "sarah@example.com", status: "ACTIVE", role: "Passenger", bookings: 25 },
  { id: 6, name: "Ali Raza", email: "ali@example.com", status: "BLOCKED", role: "Passenger", bookings: 1 },
  { id: 7, name: "Fatima Bibi", email: "fatima@example.com", status: "ACTIVE", role: "Passenger", bookings: 15 }
];

const UserManagement = () => {
  const [users, setUsers] = useState(demoUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [activeDialog, setActiveDialog] = useState(null); // { type: 'block'|'activate', user: {} }
  const [simulateError, setSimulateError] = useState(false); // Should ideally be shared, but local for now

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'ACTIVE').length,
    blocked: users.filter(u => u.status === 'BLOCKED').length,
    admins: users.filter(u => u.role === 'Admin').length
  };

  const handleAction = (type, user) => {
    if (user.id === 4 && type === 'block') return; // Self-protection
    setActiveDialog({ type, user });
  };

  const onConfirmAction = (userId, newStatus) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    const message = newStatus === 'BLOCKED' 
      ? `${users.find(u => u.id === userId).name} has been blocked`
      : `${users.find(u => u.id === userId).name} has been activated`;
    setToast({ message, type: newStatus === 'BLOCKED' ? 'warning' : 'success' });
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <AirplaneBackground />
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">User Management</h1>
            <p className="text-text-secondary mt-1 font-medium italic">Manage all registered users</p>
          </div>
          <div className="flex items-center gap-4">
             <label className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xs font-bold text-text-secondary group-hover:text-primary transition-colors uppercase tracking-widest">Simulate Errors</span>
                <input 
                  type="checkbox" 
                  checked={simulateError} 
                  onChange={() => setSimulateError(!simulateError)} 
                  className="w-4 h-4 rounded border-border-color text-primary focus:ring-primary/20"
                />
             </label>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.total, color: 'text-text-primary' },
            { label: 'Active Users', value: stats.active, color: 'text-[#4CAF50]' },
            { label: 'Blocked Users', value: stats.blocked, color: 'text-[#D9534F]' },
            { label: 'Admin Users', value: stats.admins, color: 'text-secondary' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-soft border border-border-color flex flex-col hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{stat.label}</span>
              <span className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Input 
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* User Table */}
        <Card padding="p-0 overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F6FB] border-b border-border-color">
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest text-center">Role</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest text-center">Bookings</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-16 h-16 text-text-secondary/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-text-primary font-bold text-lg">No users found matching "{searchQuery}"</p>
                        <p className="text-text-secondary mt-1">Try adjusting your search query</p>
                        <button onClick={() => setSearchQuery('')} className="mt-4 text-primary font-bold hover:underline">Clear Search</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group border-b border-border-color last:border-0 hover:bg-secondary/5 transition-all duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-text-primary">{user.name}</span>
                          {user.role === 'Admin' && (
                            <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-extrabold uppercase rounded tracking-tighter">Admin</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-[13px] text-text-secondary font-medium">{user.email}</td>
                      <td className="px-6 py-5">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-5 text-[13px] text-text-primary font-medium text-center">{user.role}</td>
                      <td className="px-6 py-5 text-sm font-bold text-text-primary text-center">{user.bookings}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          {user.id === 4 ? (
                            <div className="group/self relative cursor-not-allowed">
                               <span className="text-sm text-text-secondary/40 font-bold">—</span>
                               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-text-primary text-white text-[10px] rounded shadow-xl opacity-0 group-hover/self:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                 Cannot block your own account
                               </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAction(user.status === 'ACTIVE' ? 'block' : 'activate', user)}
                              className={`px-5 py-1.5 rounded-lg border text-[13px] font-bold transition-all duration-200 active:scale-95 ${
                                user.status === 'ACTIVE'
                                ? 'border-[#D9534F] text-[#D9534F] hover:bg-[#D9534F1A]'
                                : 'border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF501A]'
                              }`}
                            >
                              {user.status === 'ACTIVE' ? 'Block' : 'Activate'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {activeDialog && (
        <UserActionDialog 
          isOpen={true}
          onClose={() => setActiveDialog(null)}
          onConfirm={onConfirmAction}
          user={activeDialog.user}
          type={activeDialog.type}
          simulateError={simulateError}
        />
      )}

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

export default UserManagement;
