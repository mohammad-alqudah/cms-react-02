import { Search } from "lucide-react";
import DateFilter from "../ui/DateFilter";

interface TableFiltersProps {
  show: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  courseType: any[];
  setCourseTypeId: (value: string) => void;
}

export default function TableFilters({
  show,
  search,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  courseType,
  setCourseTypeId,
}: TableFiltersProps) {
  if (!show) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4 flex flex-col">
      <div className="w-full flex gap-2">
        <div className="relative w-1/2">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
          />
        </div>

        <div className="relative w-1/2">
          <select
            name="course_type"
            id="course_type"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setCourseTypeId(e.target.value);
            }}
          >
            {courseType.map((type: any, idx) => (
              <>
                <option value="" defaultChecked>
                  اختر
                </option>
                <option key={idx} value={type.id}>
                  {type.name}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>

      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        startLabel="من تاريخ"
        endLabel="إلى تاريخ"
      />
    </div>
  );
}
