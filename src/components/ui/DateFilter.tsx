import { Calendar } from "lucide-react";

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
    <div className="flex items-center gap-4">
      <Calendar className="h-5 w-5 text-[#67B37D]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        <div className="relative">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            {startLabel}
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            {endLabel}
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
