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
  gender: string;
  setGender: (value: string) => void;
  centerId: string;
  setCenterId: (value: string) => void;
  centers: any;
  educationLevel: any;
  setEducationLevel: (value: string) => void;
  ageFrom: any;
  setAgeFrom: (value: string) => void;
  ageTo: any;
  setAgeTo: (value: string) => void;
}

export default function StudentTableFilters({
  show,
  search,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  gender,
  setGender,
  centerId,
  setCenterId,
  centers,
  educationLevel,
  setEducationLevel,
  ageFrom,
  setAgeFrom,
  ageTo,
  setAgeTo,
}: TableFiltersProps) {
  if (!show) return null;

  const permission = JSON.parse(localStorage.getItem("permission") || "");
  const range = (start: number, end: number, step: number) => {
    return Array.from(
      Array.from(Array(Math.ceil((end - start + 1) / step)).keys()),
      (x) => start + x * step
    );
  };
  const AGE_RANGE = range(1, 100, 1);

  const EDUCATION_CHOICE = [
    { value: "1", label: "دراسات عليا" },
    { value: "2", label: "ماجستير" },
    { value: "3", label: "بكالوريس" },
    { value: "4", label: "مدرسة" },
    { value: "5", label: "لا يوجد" },
    { value: "6", label: "دبلوم" },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4 flex flex-col">
      <div className="w-full md:flex-nowrap flex flex-wrap gap-2">
        <div className="relative md:w-1/2 w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
          />
        </div>

        <div className="relative  md:w-1/2 w-full">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            الجنس
          </label>
          <select
            name="gender"
            id="gender"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={gender == "" ? true : false}
            >
              اختر
            </option>
            {["male", "female"].map((type: any, idx) => (
              <>
                <option
                  selected={gender == type ? true : false}
                  key={idx}
                  value={type === "male" ? "1" : "2"}
                >
                  {type == "male" ? "ذكر" : "انثى"}
                </option>
              </>
            ))}
          </select>
        </div>

        <div className="relative  md:w-1/2 w-full">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            المستوي التعليمي
          </label>
          <select
            name="educationLevel"
            id="educationLevel"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setEducationLevel(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={educationLevel == "" ? true : false}
            >
              اختر
            </option>
            {EDUCATION_CHOICE?.map((type: any, idx) => (
              <>
                <option
                  selected={educationLevel == type ? true : false}
                  key={idx}
                  value={type.value}
                >
                  {type.label}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full md:flex-nowrap flex flex-wrap gap-2">
        <div className="relative  md:w-1/2 w-full">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            اقل عمر
          </label>
          <select
            name="course_type"
            id="course_type"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setAgeFrom(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={ageFrom == "" ? true : false}
            >
              اختر
            </option>
            {AGE_RANGE?.map((age: any, idx) => (
              <>
                <option
                  selected={ageFrom == age ? true : false}
                  key={idx}
                  value={age}
                >
                  {age}
                </option>
              </>
            ))}
          </select>
        </div>

        <div className="relative  md:w-1/2 w-full">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            اقصي عمر
          </label>
          <select
            name="course_type"
            id="course_type"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setAgeTo(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={ageTo == "" ? true : false}
            >
              اختر
            </option>
            {AGE_RANGE?.map((age: any, idx) => (
              <>
                <option
                  selected={ageTo == age ? true : false}
                  key={idx}
                  value={age}
                >
                  {age}
                </option>
              </>
            ))}
          </select>
        </div>

        {permission.permission.__04__all_tajweed_data_access && (
          <div className="relative  md:w-1/2 w-full">
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
              {centers.map((center: any, idx: number) => (
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
