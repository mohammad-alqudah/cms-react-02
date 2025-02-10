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
  courseTypeId: string;
  setCourseTypeId: (value: string) => void;
  centers: any[];
  centerId: string;
  setCenterId: (value: string) => void;
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
  courseTypeId,
  setCourseTypeId,
  centers,
  centerId,
  setCenterId,
}: TableFiltersProps) {
  if (!show) return null;

  const permission = JSON.parse(localStorage.getItem("permission") || "");

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
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            الدورات
          </label>
          <select
            name="course_type"
            id="course_type"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setCourseTypeId(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={courseTypeId == "" ? true : false}
            >
              اختر
            </option>
            {courseType?.map((type: any, idx) => (
              <>
                <option
                  selected={courseTypeId == type.id ? true : false}
                  key={idx}
                  value={type.id}
                >
                  {type.name}
                </option>
              </>
            ))}
          </select>
        </div>

        {permission.permission.__04__all_tajweed_data_access && (
          <div className="relative w-1/2">
            <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
              المراكز
            </label>
            <select
              name="centers_type"
              id="centers_type"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
              onChange={(e) => {
                setCenterId(e.target.value);
              }}
            >
              <option
                value=""
                defaultChecked
                selected={centerId == "" ? true : false}
              >
                اختر
              </option>
              {centers.map((center: any, idx) => (
                <>
                  <option
                    key={idx}
                    value={center.id}
                    selected={centerId == center.id ? true : false}
                  >
                    {center.name}
                  </option>
                </>
              ))}
            </select>
          </div>
        )}
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
