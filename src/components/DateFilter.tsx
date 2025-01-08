import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  startLabel: string;
  endLabel: string;
}

export default function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startLabel,
  endLabel,
}: DateFilterProps) {
  return (
    <div className="bg-[#67B37D]/5 p-4 rounded-lg flex items-center gap-6">
      <Calendar className="h-5 w-5 text-[#67B37D]" />
      <div className="flex items-center gap-6">
        <div className="relative">
          <label className="absolute -top-2 right-3 bg-[#67B37D]/5 px-2 text-xs font-medium text-[#67B37D]">
            {startLabel}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="px-3 py-2 border border-[#67B37D]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent bg-white"
          />
        </div>
        <div className="relative">
          <label className="absolute -top-2 right-3 bg-[#67B37D]/5 px-2 text-xs font-medium text-[#67B37D]">
            {endLabel}
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="px-3 py-2 border border-[#67B37D]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent bg-white"
          />
        </div>
      </div>
    </div>
  );
}