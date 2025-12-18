
import React from 'react';
import { Staff, Shift } from '../types';
import ShiftCard from './ShiftCard';

interface ScheduleGridProps {
  staff: Staff[];
  shifts: Shift[];
  dates: Date[];
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ staff, shifts, dates }) => {
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const getShiftForDay = (staffId: string, date: Date) => {
    return shifts.find(s => s.staffId === staffId && s.date === formatDate(date));
  };

  return (
    <div className="flex-1 overflow-auto custom-scrollbar p-6">
      <div className="min-w-[1000px] bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
          <div className="p-4 border-r border-border-light dark:border-border-dark font-semibold text-sm text-text-secondary dark:text-slate-400 uppercase tracking-wider flex items-end">
            รายชื่อบุคลากร
          </div>
          {dates.map((date, idx) => {
            const isToday = formatDate(date) === '2023-10-17'; // Hardcoded for demo UI consistency
            const dayName = date.toLocaleDateString('th-TH', { weekday: 'short' });
            const dayNum = date.getDate();
            const isWeekend = idx >= 5;

            return (
              <div 
                key={idx} 
                className={`p-3 text-center border-r border-border-light dark:border-border-dark last:border-r-0 ${isToday ? 'bg-primary/5' : ''} ${isWeekend ? 'bg-slate-50/80 dark:bg-slate-900/40' : ''}`}
              >
                <p className={`text-xs font-medium ${isToday ? 'text-primary font-bold' : isWeekend ? (idx === 5 ? 'text-orange-600' : 'text-red-600') : 'text-text-secondary dark:text-slate-400'}`}>
                  {dayName}
                </p>
                <p className={`text-sm font-bold ${isToday ? 'text-primary' : 'text-text-primary dark:text-white'}`}>
                  {dayNum}
                </p>
              </div>
            );
          })}
        </div>

        {/* Rows */}
        <div className="divide-y divide-border-light dark:divide-border-dark">
          {staff.map((member) => (
            <div key={member.id} className="grid grid-cols-[200px_repeat(7,1fr)] min-h-[80px] hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="p-4 border-r border-border-light dark:border-border-dark flex items-center gap-3">
                {member.avatar ? (
                  <div 
                    className="size-9 rounded-full bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700" 
                    style={{ backgroundImage: `url("${member.avatar}")` }}
                  />
                ) : (
                  <div className="size-9 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 font-bold shrink-0">
                    {member.initials}
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-text-primary dark:text-white truncate">{member.name}</p>
                  <p className="text-xs text-text-secondary dark:text-slate-400 truncate">{member.department}</p>
                </div>
              </div>

              {dates.map((date, idx) => {
                const shift = getShiftForDay(member.id, date);
                const isToday = formatDate(date) === '2023-10-17';
                return (
                  <div 
                    key={idx} 
                    className={`p-2 border-r border-border-light dark:border-border-dark last:border-r-0 ${isToday ? 'bg-primary/5' : ''}`}
                  >
                    <ShiftCard shift={shift} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;
