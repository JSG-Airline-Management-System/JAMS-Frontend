import React from 'react';
import Modal from './Modal';

const PaymentProcessingModal = ({ status, amount, transactionId }) => {
  return (
    <Modal 
      isOpen={!!status} 
      onClose={null} 
      title={null}
      width="max-w-[360px]"
      hideCloseButton
    >
      <div className="py-8 flex flex-col items-center text-center space-y-6">
        {status === 'processing' && (
          <>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Processing Payment</h3>
              <p className="text-sm text-text-secondary font-medium px-4">Please do not close or refresh this page while we authorize your transaction.</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center animate-scale-in">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-4 w-full">
              <div>
                <h3 className="text-xl font-bold text-text-primary">Payment Successful</h3>
                <p className="text-sm text-text-secondary">Your booking has been confirmed.</p>
              </div>
              
              <div className="bg-background rounded-2xl p-4 border border-border-color space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Amount Paid</span>
                  <span className="text-xs font-black text-text-primary">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Transaction ID</span>
                  <span className="text-xs font-bold text-primary">{transactionId}</span>
                </div>
              </div>

              <p className="text-[11px] text-text-secondary font-medium italic animate-pulse">Redirecting to confirmation...</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Payment Declined</h3>
              <p className="text-sm text-text-secondary px-4">There was an issue with your payment. Please check your details and try again.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PaymentProcessingModal;
