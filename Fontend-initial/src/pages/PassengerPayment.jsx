import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import BookingStepper from '../components/BookingStepper';
import FareSummary from '../components/FareSummary';
import Toast from '../components/Toast';
import Card from '../components/Card';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import CardPaymentFields from '../components/CardPaymentFields';
import BankTransferFields from '../components/BankTransferFields';
import WalletPaymentFields from '../components/WalletPaymentFields';
import PaymentProcessingModal from '../components/PaymentProcessingModal';
import Button from '../components/Button';

const PassengerPayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processingStatus, setProcessingStatus] = useState(null); // 'processing', 'success', 'error'
  const [txnId, setTxnId] = useState('');

  // Form states
  const [cardData, setCardData] = useState({ cardNumber: '', expiry: '', cvv: '', cardholder: '' });
  const [bankData, setBankData] = useState({ bankName: 'hbl', accountHolder: '', accountNumber: '' });
  const [walletData, setWalletData] = useState({ walletType: 'jams', pin: '', paypalEmail: '' });

  // Load data from localStorage
  const bookingData = useMemo(() => {
    try {
      const saved = localStorage.getItem('activeBooking');
      if (!saved) throw new Error("No booking data");
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse booking data", e);
      return {
        flightNumber: "JA123",
        origin: "JFK",
        destination: "LAX",
        departureDate: "May 15, 2026",
        departureTime: "10:30 AM",
        arrivalTime: "1:45 PM",
        fare: 299,
        selectedSeat: { label: "4B", column: "B" },
        baggageWeight: 0,
        baggageFee: 0
      };
    }
  }, []);

  const baseFare = Number(bookingData.fare) || 299;
  const taxes = 35.88;
  const seatPrice = Number(bookingData.selectedSeat?.extraLegroom ? 25 : 0);
  const baggageFee = Number(bookingData.baggageFee) || 0;
  const totalAmount = baseFare + taxes + seatPrice + baggageFee;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateForm = () => {
    if (paymentMethod === 'card') {
      return cardData.cardNumber.replace(/\s/g, '').length >= 16 && cardData.expiry.length === 5 && cardData.cvv.length >= 3 && cardData.cardholder.length >= 3;
    }
    if (paymentMethod === 'bank') {
      return bankData.accountHolder.length >= 3 && bankData.accountNumber.length >= 10;
    }
    if (paymentMethod === 'wallet') {
      if (walletData.walletType === 'jams') {
        return walletData.pin.length === 4 && totalAmount <= 450.00;
      }
      return walletData.paypalEmail.includes('@');
    }
    return false;
  };

  const handleConfirmPayment = async () => {
    if (!validateForm()) {
      showToast("Please fill in all payment details correctly", "error");
      return;
    }

    setProcessingStatus('processing');
    
    // Simulate payment logic
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock success scenario
    const newTxnId = `TXN${Date.now().toString().slice(-8)}`;
    setTxnId(newTxnId);
    setProcessingStatus('success');

    // Save final booking data
    const finalBooking = {
      ...bookingData,
      paymentMethod,
      transactionId: newTxnId,
      totalPaid: totalAmount,
      bookingReference: `JAMS${Math.floor(100000 + Math.random() * 900000)}`
    };
    localStorage.setItem('finalBooking', JSON.stringify(finalBooking));

    // Redirect to confirmation after 2.5s
    setTimeout(() => {
      navigate('/passenger/booking/confirmation');
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={3} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Payment Details</h1>
            <p className="text-text-secondary mt-1 font-medium italic">Step 4: Securely complete your booking</p>
          </div>

          <BookingStepper currentStep={4} />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-full h-[500px] bg-white rounded-3xl border border-border-color/20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {/* Left: Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 shadow-soft-lavender border border-border-color">
                  <div className="space-y-10">
                    <PaymentMethodSelector 
                      selectedMethod={paymentMethod} 
                      onSelect={(m) => setPaymentMethod(m)} 
                    />

                    <div className="pt-6 border-t border-border-color/50 min-h-[300px]">
                      {paymentMethod === 'card' && (
                        <CardPaymentFields data={cardData} onChange={setCardData} />
                      )}
                      {paymentMethod === 'bank' && (
                        <BankTransferFields data={bankData} onChange={setBankData} />
                      )}
                      {paymentMethod === 'wallet' && (
                        <WalletPaymentFields 
                          data={walletData} 
                          onChange={setWalletData} 
                          totalAmount={totalAmount} 
                        />
                      )}
                    </div>

                    <div className="pt-6 border-t border-border-color/50">
                      <Button 
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3"
                        onClick={handleConfirmPayment}
                        disabled={!validateForm()}
                      >
                        <span>Confirm Payment</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                      <p className="text-[10px] text-text-secondary font-medium text-center mt-4 px-12 italic">
                        By clicking "Confirm Payment", you authorize JAMS to charge your payment method for the total amount shown. Your details are secured with 256-bit SSL encryption.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Secure Payment Info */}
                <div className="flex items-center justify-center gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secured</span>
                  </div>
                </div>
              </div>

              {/* Right: Fare Summary */}
              <div className="lg:col-span-1">
                <FareSummary 
                  flight={bookingData}
                  selectedSeat={bookingData.selectedSeat}
                  baggageFee={baggageFee}
                  currentStep={4}
                  onContinue={handleConfirmPayment}
                  continueText="Pay Securely Now"
                  isContinueDisabled={!validateForm()}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Processing Modal */}
      <PaymentProcessingModal 
        status={processingStatus} 
        amount={totalAmount.toFixed(2)} 
        transactionId={txnId} 
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

export default PassengerPayment;
