import React, { useState } from 'react';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import Button from './Button';
import Input from './Input';

const TransactionDetailModal = ({ isOpen, onClose, transaction, onUpdateStatus }) => {
  const [loading, setLoading] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundReason, setRefundReason] = useState('');

  if (!transaction) return null;

  const handleAction = async (newStatus, reason = null) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    onUpdateStatus(transaction.id, newStatus, reason);
    setLoading(false);
    setShowRefundForm(false);
    setRefundReason('');
  };

  const detailRow = (label, value, isBadge = false) => (
    <div className="flex justify-between items-center py-3 border-b border-[#F0EDF5] last:border-0">
      <span className="text-sm text-text-secondary font-medium">{label}</span>
      {isBadge ? (
        <StatusBadge status={value} />
      ) : (
        <span className="text-sm text-text-primary font-semibold">{value}</span>
      )}
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Transaction Details — ${transaction.id}`}
      width="max-w-[480px]"
    >
      <div className="space-y-1">
        {detailRow("Transaction ID", transaction.id)}
        {detailRow("Passenger", `${transaction.passenger} (${transaction.passengerEmail})`)}
        {detailRow("Flight", `${transaction.flightNumber} (${transaction.route})`)}
        {detailRow("Amount", `$${transaction.amount.toFixed(2)}`)}
        {detailRow("Payment Method", `${transaction.method}${transaction.cardLast4 ? ` (•••• ${transaction.cardLast4})` : ''}`)}
        {detailRow("Status", transaction.status, true)}
        {detailRow("Date", transaction.date)}
        {transaction.status === 'REFUNDED' && transaction.refundReason && (
          <div className="mt-4 p-4 bg-[#D9534F]/5 rounded-xl border border-[#D9534F]/10">
            <p className="text-[11px] text-[#D9534F] uppercase font-bold tracking-wider mb-1">Refund Reason</p>
            <p className="text-sm text-[#D9534F] font-medium">{transaction.refundReason}</p>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {transaction.status === 'PENDING' && (
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white rounded-xl py-3 border-0"
              onClick={() => handleAction('COMPLETED')}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Mark as Completed"}
            </Button>
            <Button 
              className="flex-1 bg-[#D9534F] hover:bg-[#D9534F]/90 text-white rounded-xl py-3 border-0"
              onClick={() => handleAction('REFUNDED')}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Mark as Refunded"}
            </Button>
          </div>
        )}

        {transaction.status === 'COMPLETED' && !showRefundForm && (
          <Button 
            className="w-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-white rounded-xl py-3 border-0"
            onClick={() => setShowRefundForm(true)}
            disabled={loading}
          >
            Process Refund
          </Button>
        )}

        {showRefundForm && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-sm font-semibold text-text-primary">Reason for refund:</p>
            <Input 
              placeholder="Enter reason..." 
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="py-2"
            />
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#F5A623] hover:bg-[#F5A623]/90 text-white rounded-xl py-2.5 border-0"
                onClick={() => handleAction('REFUNDED', refundReason)}
                disabled={loading || !refundReason.trim()}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Confirm Refund"}
              </Button>
              <Button 
                variant="text"
                className="flex-1"
                onClick={() => setShowRefundForm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TransactionDetailModal;
