import React from 'react';
import Modal from './Modal';
import TicketCard from './TicketCard';
import Button from './Button';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const TicketViewModal = ({ isOpen, onClose, booking }) => {
  const [downloading, setDownloading] = React.useState(false);

  if (!booking) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const ticketElement = document.getElementById('ticket-modal-content');
      
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
      
      pdf.addImage(imgData, 'PNG', 10, 35, imgWidth, imgHeight);
      
      pdf.setFontSize(8);
      pdf.setTextColor('#7A7A8A');
      pdf.text('This ticket is valid for travel. Generated on ' + new Date().toLocaleDateString(), pdfWidth / 2, 280, { align: 'center' });
      
      pdf.save(`JAMS-Ticket-${booking.bookingId}.pdf`);
      setDownloading(false);
    } catch (error) {
      console.error(error);
      setDownloading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={null} 
      width="max-w-2xl"
    >
      <div className="py-2">
        <div id="ticket-modal-content" className="p-1">
          <TicketCard bookingData={{
            bookingId: booking.bookingId,
            passenger: { name: booking.passengerName, email: "john.doe@example.com" },
            flight: {
              flightNumber: booking.flightNumber,
              origin: booking.origin,
              originCity: booking.origin,
              destination: booking.destination,
              destinationCity: booking.destination,
              departureDate: booking.departureDate,
              departureTime: booking.departureTime,
              arrivalTime: booking.arrivalTime,
              duration: booking.duration,
            },
            selectedSeat: { label: booking.seat, column: booking.seat.slice(-1) },
            baggageWeight: booking.baggageWeight,
            gate: booking.gate,
            boardingTime: booking.boardingTime
          }} />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={handleDownload}
            disabled={downloading}
            className="h-12 bg-primary hover:bg-primary/90 text-white font-black px-10 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-3"
          >
            {downloading ? (
               <>
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 <span>Generating...</span>
               </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download PDF
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            onClick={onClose}
            className="h-12 border-border-color text-text-secondary hover:bg-background font-bold px-8 rounded-xl"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketViewModal;
