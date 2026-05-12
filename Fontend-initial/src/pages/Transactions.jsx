import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Toast from '../components/Toast';
import ErrorBanner from '../components/ErrorBanner';
import TransactionDetailModal from '../components/TransactionDetailModal';

const demoTransactions = [
  {
    id: "TXN001",
    passenger: "John Doe",
    passengerEmail: "john@example.com",
    amount: 299.00,
    method: "Credit Card",
    status: "COMPLETED",
    date: "2026-04-25",
    flightNumber: "JA123",
    route: "KHI → DXB",
    cardLast4: "4242"
  },
  {
    id: "TXN002",
    passenger: "Jane Smith",
    passengerEmail: "jane@example.com",
    amount: 249.00,
    method: "Bank Transfer",
    status: "COMPLETED",
    date: "2026-04-24",
    flightNumber: "JA456",
    route: "LHE → LHR",
    cardLast4: null
  },
  {
    id: "TXN003",
    passenger: "Mike Johnson",
    passengerEmail: "mike@example.com",
    amount: 199.00,
    method: "Wallet",
    status: "PENDING",
    date: "2026-04-23",
    flightNumber: "JA789",
    route: "ISB → JFK",
    cardLast4: null
  },
  {
    id: "TXN004",
    passenger: "Sarah Williams",
    passengerEmail: "sarah@example.com",
    amount: 169.15,
    method: "Credit Card",
    status: "REFUNDED",
    date: "2026-04-20",
    flightNumber: "JA101",
    route: "KHI → IST",
    cardLast4: "8901",
    refundReason: "Customer requested cancellation"
  },
  {
    id: "TXN005",
    passenger: "Ahmed Khan",
    passengerEmail: "ahmed@example.com",
    amount: 450.00,
    method: "Credit Card",
    status: "COMPLETED",
    date: "2026-04-28",
    flightNumber: "JA202",
    route: "PEW → JED",
    cardLast4: "1234"
  },
  {
    id: "TXN006",
    passenger: "Fatima Bibi",
    passengerEmail: "fatima@example.com",
    amount: 89.50,
    method: "Wallet",
    status: "PENDING",
    date: "2026-04-29",
    flightNumber: "JA303",
    route: "MUX → DXB",
    cardLast4: null
  },
  {
    id: "TXN007",
    passenger: "Ali Raza",
    passengerEmail: "ali@example.com",
    amount: 320.00,
    method: "Bank Transfer",
    status: "REFUNDED",
    date: "2026-04-18",
    flightNumber: "JA111",
    route: "UET → LHR",
    cardLast4: null,
    refundReason: "Flight cancelled by airline"
  },
  {
    id: "TXN008",
    passenger: "Admin User",
    passengerEmail: "admin@jams.com",
    amount: 550.00,
    method: "Debit Card",
    status: "COMPLETED",
    date: "2026-05-01",
    flightNumber: "JA404",
    route: "SKT → JFK",
    cardLast4: "5678"
  }
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(demoTransactions);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [errorSim, setErrorSim] = useState(false);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const matchesSearch = txn.id.toLowerCase().includes(search.toLowerCase()) || 
                            txn.passenger.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? txn.status === statusFilter : true;
      const matchesMethod = methodFilter ? txn.method === methodFilter : true;
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [transactions, search, statusFilter, methodFilter]);

  // Stats Calculation
  const stats = useMemo(() => {
    const totalRevenue = filteredTransactions
      .filter(t => t.status === 'COMPLETED' || t.status === 'PENDING')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalRefunds = filteredTransactions
      .filter(t => t.status === 'REFUNDED')
      .reduce((sum, t) => sum + t.amount, 0);
    const pendingPayments = filteredTransactions
      .filter(t => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.amount, 0);
    const refundCount = filteredTransactions.filter(t => t.status === 'REFUNDED').length;
    const pendingCount = filteredTransactions.filter(t => t.status === 'PENDING').length;

    return { totalRevenue, totalRefunds, pendingPayments, refundCount, pendingCount };
  }, [filteredTransactions]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateStatus = (id, newStatus, reason = null) => {
    if (errorSim) {
      showToast("Simulation Error: Failed to update status", "error");
      return;
    }

    setTransactions(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: newStatus, refundReason: reason || t.refundReason } 
        : t
    ));
    
    setIsModalOpen(false);
    showToast(`${id} marked as ${newStatus}`, newStatus === 'REFUNDED' ? 'warning' : 'success');
  };

  const handleExport = () => {
    showToast("Transactions report exported successfully", "success");
    console.log("Exported data:", filteredTransactions);
  };

  const removeFilter = (type) => {
    if (type === 'status') setStatusFilter('');
    if (type === 'method') setMethodFilter('');
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <Sidebar />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight">Transactions</h1>
              <p className="text-text-secondary mt-1 font-medium">Monitor all payments and refunds</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-soft-lavender border border-border-color">
                <span className="text-xs font-bold text-text-secondary uppercase">Error Simulation</span>
                <button 
                  onClick={() => setErrorSim(!errorSim)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${errorSim ? 'bg-primary' : 'bg-[#E5E0EB]'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${errorSim ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Revenue Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-5 relative overflow-hidden border-l-[4px] border-[#4CAF50] hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Total Revenue</span>
              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-[28px] font-extrabold text-text-primary tracking-tight">${stats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                <div className="flex items-center text-[#4CAF50] text-sm font-bold mb-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414 6.707 12.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span>23%</span>
                </div>
              </div>
              <p className="text-[12px] text-text-secondary font-medium mt-1">vs last month</p>
            </Card>

            <Card className="p-5 relative overflow-hidden border-l-[4px] border-[#D9534F] hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Total Refunds</span>
              <h3 className="text-[28px] font-extrabold text-text-primary tracking-tight mt-2">${stats.totalRefunds.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
              <p className="text-[12px] text-text-secondary font-medium mt-1">{stats.refundCount} refunds processed</p>
            </Card>

            <Card className="p-5 relative overflow-hidden border-l-[4px] border-[#F5A623] hover:-translate-y-1 transition-all duration-300 shadow-soft-lavender">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">Pending Payments</span>
              <h3 className="text-[28px] font-extrabold text-text-primary tracking-tight mt-2">${stats.pendingPayments.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
              <p className="text-[12px] text-text-secondary font-medium mt-1">{stats.pendingCount} payments awaiting</p>
            </Card>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-soft-lavender border border-border-color mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[300px]">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input 
                  placeholder="Search by transaction ID or passenger name..." 
                  className="pl-12 py-2.5 h-[44px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="w-[180px]">
                <Select 
                  className="h-[44px] py-0 text-sm"
                  options={[
                    { label: 'All Statuses', value: '' },
                    { label: 'Completed', value: 'COMPLETED' },
                    { label: 'Pending', value: 'PENDING' },
                    { label: 'Refunded', value: 'REFUNDED' }
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>

              <div className="w-[180px]">
                <Select 
                  className="h-[44px] py-0 text-sm"
                  options={[
                    { label: 'All Methods', value: '' },
                    { label: 'Credit Card', value: 'Credit Card' },
                    { label: 'Bank Transfer', value: 'Bank Transfer' },
                    { label: 'Wallet', value: 'Wallet' },
                    { label: 'Debit Card', value: 'Debit Card' }
                  ]}
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                />
              </div>

              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-6 h-[44px] rounded-xl border border-[#D1CFD6] text-text-secondary font-bold text-sm hover:bg-[#F5F3F8] transition-all active:scale-95 ml-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>

            {/* Active Chips */}
            {(statusFilter || methodFilter) && (
              <div className="flex items-center gap-2 mt-4 animate-fade-in">
                {statusFilter && (
                  <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full text-[12px] font-bold text-secondary">
                    <span>Status: {statusFilter}</span>
                    <button onClick={() => removeFilter('status')} className="hover:text-primary transition-colors">✕</button>
                  </div>
                )}
                {methodFilter && (
                  <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-full text-[12px] font-bold text-secondary">
                    <span>Method: {methodFilter}</span>
                    <button onClick={() => removeFilter('method')} className="hover:text-primary transition-colors">✕</button>
                  </div>
                )}
                <button 
                  onClick={() => { setStatusFilter(''); setMethodFilter(''); }}
                  className="text-[12px] font-bold text-primary hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Transactions Table */}
          <Card className="overflow-hidden shadow-soft-lavender border border-border-color">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F8F6FB] border-b border-border-color">
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Transaction ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Passenger</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Method</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EDF5]">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((txn) => (
                      <tr 
                        key={txn.id} 
                        className="group hover:bg-secondary/[0.03] transition-colors duration-150 cursor-default"
                      >
                        <td className="px-6 py-5">
                          <button 
                            onClick={() => { setSelectedTxn(txn); setIsModalOpen(true); }}
                            className="text-[13px] font-bold text-primary hover:underline font-mono"
                          >
                            {txn.id}
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-text-primary leading-tight">{txn.passenger}</span>
                            <span className="text-[11px] text-text-secondary font-medium">{txn.passengerEmail}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-sm font-bold ${txn.status === 'REFUNDED' ? 'text-[#D9534F] line-through' : 'text-text-primary'}`}>
                            ${txn.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-text-secondary font-medium">{txn.method}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <StatusBadge status={txn.status} />
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-[13px] text-text-secondary font-medium">{txn.date}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-text-secondary/30">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-text-primary font-bold">No transactions found</p>
                          <p className="text-text-secondary text-sm">Try adjusting your filters to find what you're looking for.</p>
                          <Button 
                            variant="outline" 
                            className="mt-2 text-xs"
                            onClick={() => { setSearch(''); setStatusFilter(''); setMethodFilter(''); }}
                          >
                            Clear All Filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-5 flex items-center justify-between border-t border-border-color bg-white">
                <p className="text-[13px] text-text-secondary font-medium">
                  Showing <span className="font-bold text-text-primary">{(currentPage-1)*itemsPerPage + 1}-{Math.min(currentPage*itemsPerPage, filteredTransactions.length)}</span> of <span className="font-bold text-text-primary">{filteredTransactions.length}</span> transactions
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border-color hover:bg-secondary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i+1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                        currentPage === i + 1 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-text-secondary hover:bg-secondary/10 border border-transparent'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border-color hover:bg-secondary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Detail Modal */}
      <TransactionDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTxn}
        onUpdateStatus={handleUpdateStatus}
      />

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

export default Transactions;
