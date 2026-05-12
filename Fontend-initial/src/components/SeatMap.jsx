import React from 'react';

const SeatMap = ({ seats, selectedSeat, onSeatClick }) => {
  const rows = [...new Set(seats.map(s => s.row))].sort((a, b) => a - b);
  const cols = ["A", "B", "C", "D", "E", "F"]; // Standard 3-3 configuration
  const aisleAfter = "C";

  return (
    <div className="flex flex-col items-center">
      {/* Legend */}
      <div className="flex gap-8 mb-10 bg-white px-6 py-3 rounded-full border border-border-color shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#E8F5E9] border border-[#4CAF50]" />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-primary border border-[#B8657A]" />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#F5F3F8] border border-[#D1CFD6]" />
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Occupied</span>
        </div>
      </div>

      {/* Airplane Body Simulation */}
      <div className="relative bg-white p-10 rounded-[60px_60px_30px_30px] border-x-[12px] border-t-[12px] border-background shadow-2xl overflow-hidden min-w-[320px]">
        {/* Cockpit Area */}
        <div className="h-20 flex items-center justify-center border-b-2 border-background mb-10">
          <div className="w-16 h-8 bg-background rounded-full opacity-20" />
        </div>

        <div className="space-y-4">
          {rows.map(rowNum => (
            <div key={rowNum} className="flex items-center gap-3">
              <span className="w-6 text-[10px] font-bold text-text-secondary text-right">{rowNum}</span>
              
              <div className="flex gap-2">
                {cols.map(col => {
                  const seat = seats.find(s => s.row === rowNum && s.column === col);
                  const isSelected = selectedSeat?.label === seat?.label;
                  const isOccupied = seat?.status === 'occupied';

                  return (
                    <React.Fragment key={col}>
                      <button
                        onClick={() => !isOccupied && onSeatClick(seat)}
                        disabled={isOccupied}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-200 relative ${
                          isOccupied 
                          ? 'bg-[#F5F3F8] border border-[#D1CFD6] text-[#D1CFD6] cursor-not-allowed' 
                          : isSelected 
                          ? 'bg-primary border border-[#B8657A] text-white shadow-lg shadow-primary/30 scale-110 z-10' 
                          : 'bg-[#E8F5E9] border border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:scale-105 active:scale-95'
                        }`}
                        title={isOccupied ? 'Occupied' : `Seat ${seat?.label}`}
                      >
                        {col}
                        {seat?.extraLegroom && !isSelected && !isOccupied && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full border border-white" />
                        )}
                      </button>
                      {col === aisleAfter && <div className="w-8" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
