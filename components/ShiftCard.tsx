
import React from 'react';
import { Shift, ShiftType } from '../types';

interface ShiftCardProps {
  shift?: Shift;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
  if (!shift) return null;

  const typeStyles: Record<ShiftType, string> = {
    [ShiftType.MORNING]: 'bg-primary/10 border-l-4 border-primary text-primary hover:bg-primary/20',
    [ShiftType.AFTERNOON]: 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 hover:bg-indigo-100',
    [ShiftType.NIGHT]: 'bg-slate-800 border-l-4 border-slate-600 text-white hover:bg-slate-700',
    [ShiftType.PARTIAL]: 'bg-orange-50 border-l-4 border-orange-400 text-orange-800 hover:bg-orange-100',
    [ShiftType.LEAVE]: 'bg-red-50 border-l-4 border-red-400 text-red-700 hover:bg-red-100',
    [ShiftType.OFF]: '',
  };

  if (shift.type === ShiftType.OFF) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">หยุด</span>
      </div>
    );
  }

  return (
    <div className={`${typeStyles[shift.type]} p-2 rounded text-xs cursor-pointer transition-colors h-full flex flex-col justify-center gap-1 group/card relative`}>
      <div className="font-bold flex justify-between items-center">
        <span>{shift.startTime ? `${shift.startTime} - ${shift.endTime}` : shift.type}</span>
        <span className="material-symbols-outlined !text-[14px] opacity-0 group-hover/card:opacity-100 transition-opacity">info</span>
      </div>
      <div className={`${shift.type === ShiftType.NIGHT ? 'text-slate-300' : 'text-text-secondary/80'} text-[10px]`}>
        {shift.subType || shift.type}
      </div>
    </div>
  );
};

export default ShiftCard;
