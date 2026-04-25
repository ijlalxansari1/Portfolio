"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState<any>({
    status: "Available",
    busyDates: [],
    calendlyUrl: "https://calendly.com/ijlalansari"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin-availability");
    if (saved) setAvailability(JSON.parse(saved));
    
    const handleUpdate = () => {
      const updated = localStorage.getItem("admin-availability");
      if (updated) setAvailability(JSON.parse(updated));
    };
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  const renderMonth = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Header
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isBusy = availability.busyDates?.includes(dStr);
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
      const isPast = new Date(year, month, d) < new Date(new Date().setHours(0,0,0,0));

      days.push(
        <div 
          key={d} 
          className={`calendar-day ${isPast ? 'opacity-20' : ''} ${isBusy ? 'bg-red-500/20 text-red-400' : 'bg-green-500/10 text-green-400'} ${isToday ? 'ring-1 ring-[var(--accent)]' : ''}`}
        >
          {d}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-center opacity-50">{monthName} {year}</p>
        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d} className="text-[9px] font-black text-center opacity-30 py-1">{d}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  return (
    <div className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[28px] space-y-8">
      <div className="flex items-center gap-3">
        <CalendarIcon size={18} className="text-[var(--accent)]" />
        <h3 className="text-[14px] font-black uppercase tracking-wider text-white">Availability</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {renderMonth(currentDate)}
        {renderMonth(nextMonth)}
      </div>

      <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Busy</span>
          </div>
        </div>
        <a 
          href={availability.calendlyUrl} 
          target="_blank"
          className="px-6 py-3 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-lg"
        >
          Book a 30-min call
        </a>
      </div>
    </div>
  );
}
