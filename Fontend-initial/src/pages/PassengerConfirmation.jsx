import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PassengerSidebar from '../components/PassengerSidebar';
import AirplaneBackground from '../components/AirplaneBackground';
import BookingStepper from '../components/BookingStepper';
import FareSummary from '../components/FareSummary';
import Toast from '../components/Toast';
import Card from '../components/Card';
import Button from '../components/Button';
import TicketCard from '../components/TicketCard';

const PassengerConfirmation = () => {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load final booking data
  const bookingData = useMemo(() => {
    try {
      const saved = localStorage.getItem('finalBooking');
      if (!saved) throw new Error("No booking data");
      const parsed = JSON.parse(saved);
      
      // Ensure numeric values and nested flight structure for FareSummary compatibility
      return {
        bookingId: parsed.bookingId || `BK2026-${Math.floor(10000 + Math.random() * 90000)}`,
        passenger: parsed.passenger || { name: "John Doe", email: "johndoe@email.com" },
        flight: {
          ...(parsed.flight || {}),
          flightNumber: parsed.flightNumber || "JA123",
          origin: parsed.origin || "JFK",
          originCity: parsed.originCity || "New York",
          destination: parsed.destination || "LAX",
          destinationCity: parsed.destinationCity || "Los Angeles",
          departureDate: parsed.departureDate || "May 15, 2026",
          departureTime: parsed.departureTime || "10:30 AM",
          arrivalTime: parsed.arrivalTime || "1:45 PM",
          duration: parsed.duration || "5h 15m",
          fare: Number(parsed.fare) || 299
        },
        selectedSeat: parsed.selectedSeat || { label: "4B", column: "B" },
        baggageWeight: Number(parsed.baggageWeight) || 0,
        baggageFee: Number(parsed.baggageFee) || 0,
        totalPaid: Number(parsed.totalPaid) || 309,
        paymentMethod: parsed.paymentMethod || "card",
        transactionId: parsed.transactionId || "TXN12345678",
        gate: parsed.gate || "A12",
        boardingTime: parsed.boardingTime || "9:45 AM"
      };
    } catch (e) {
      console.warn("Failed to parse booking data, using demo data", e);
      return {
        bookingId: "BK2026-15432",
        passenger: { name: "John Doe", email: "johndoe@email.com" },
        flight: {
          flightNumber: "JA123",
          origin: "JFK",
          originCity: "New York",
          destination: "LAX",
          destinationCity: "Los Angeles",
          departureDate: "May 15, 2026",
          departureTime: "10:30 AM",
          arrivalTime: "1:45 PM",
          duration: "5h 15m",
          fare: 299
        },
        selectedSeat: { label: "4B", column: "B" },
        baggageWeight: 24,
        baggageFee: 10,
        totalPaid: 309,
        paymentMethod: "card",
        transactionId: "TXN12345678",
        gate: "A12",
        boardingTime: "9:45 AM"
      };
    }
  }, []);

  useEffect(() => {
    setShowCelebration(true);
    const timer = setTimeout(() => {
      setToast({ message: "Booking confirmed! Check your email for details.", type: 'success' });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadTicket = async () => {
    try {
      setDownloading(true);
      const ticketElement = document.getElementById('ticket');
      
      const canvas = await html2canvas(ticketElement, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add Header
      pdf.setFontSize(24);
      pdf.setTextColor('#C9748A');
      pdf.setFont('helvetica', 'bold');
      pdf.text('JAMS', pdfWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor('#7A7A8A');
      pdf.setFont('helvetica', 'normal');
      pdf.text('Jutt Airline Management System', pdfWidth / 2, 26, { align: 'center' });
      
      pdf.setDrawColor('#E5E0EB');
      pdf.line(10, 30, pdfWidth - 10, 30);
      
      // Add Ticket
      pdf.addImage(imgData, 'PNG', 10, 35, imgWidth, imgHeight);
      
      // Add Footer
      pdf.setFontSize(8);
      pdf.setTextColor('#7A7A8A');
      pdf.text(
        'This ticket is valid for travel on the specified date and flight. Please present at check-in.',
        pdfWidth / 2,
        280,
        { align: 'center' }
      );
      
      pdf.save(`JAMS-Ticket-${bookingData.bookingId}.pdf`);
      setDownloading(false);
      showToast('Ticket downloaded successfully!');
    } catch (error) {
      console.error(error);
      setDownloading(false);
      showToast('Failed to download ticket.', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-inter overflow-x-hidden">
      <PassengerSidebar unreadCount={3} />
      <AirplaneBackground />

      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <BookingStepper currentStep={5} />

          {/* Success Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className={`w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-700 ${showCelebration ? 'scale-110 shadow-lg shadow-success/20' : 'scale-90'}`}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-text-primary tracking-tight">Booking Confirmed!</h1>
            <p className="text-text-secondary mt-2 font-medium">Your flight to {bookingData.flight.destinationCity} has been successfully booked.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-slide-up">
            {/* Left: Ticket Area */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-4 bg-white/30 rounded-[40px] backdrop-blur-sm border border-white/50 shadow-inner overflow-hidden">
                <TicketCard id="ticket" bookingData={bookingData} />
              </div>
              
              <Card className="p-6 border-l-4 border-l-primary bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Next Steps</h4>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      Please download your ticket or check your email for the boarding pass. You can manage your booking, select meals, or add more baggage from your dashboard. Check-in opens 24 hours before departure.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Summary & Actions */}
            <div className="lg:col-span-1 space-y-6">
              <FareSummary 
                flight={bookingData.flight}
                selectedSeat={bookingData.selectedSeat}
                baggageFee={bookingData.baggageFee}
                currentStep={5}
                onContinue={handleDownloadTicket}
                continueText={downloading ? "Generating PDF..." : "Download Ticket"}
                isContinueDisabled={downloading}
              />

              <div className="space-y-3">
                <Link to="/passenger/dashboard">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-secondary text-secondary hover:bg-secondary/5">
                    View My Bookings
                  </Button>
                </Link>
                <Link to="/passenger/search">
                  <Button variant="text" className="w-full h-12 font-bold text-text-secondary hover:text-primary">
                    Book Another Flight
                  </Button>
                </Link>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-border-color shadow-sm">
                <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Payment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary font-medium">Method</span>
                    <span className="text-text-primary font-bold capitalize">{bookingData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary font-medium">Transaction ID</span>
                    <span className="text-[10px] font-mono font-bold text-text-primary">{bookingData.transactionId}</span>
                  </div>
                  <div className="pt-3 border-t border-border-color/50 flex justify-between items-center">
                    <span className="text-sm font-bold text-text-primary">Total Paid</span>
                    <span className="text-lg font-black text-success">${bookingData.totalPaid.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
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

export default PassengerConfirmation;
