interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  startLabel: string;
  endLabel: string;
  isFinished: string;
  setIsFinished: (value: string) => void;
}

export default function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startLabel,
  endLabel,
  isFinished,
  setIsFinished,
}: DateFilterProps) {
  return (
    <div className="flex items-center gap-4">
      {/* <Calendar className="h-5 w-5 text-[#67B37D]" /> */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
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
        {/* <div className="relative" dir="ltr">
          <label htmlFor="isFinished">هل تم الانتهاء</label>
          <input
            id="isFinished"
            type="checkbox"
            defaultChecked={Boolean(false)}
            checked={Boolean(isFinished)}
            onChange={(e) => {
              setIsFinished(Boolean(e.target.checked));
            }}
          />
        </div> */}
        <div className="relative  ">
          <label className="absolute -top-2 right-3 bg-white px-2 text-xs font-medium text-gray-600">
            الدورات
          </label>
          <select
            name="course_type"
            id="course_type"
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67B37D] focus:border-transparent"
            onChange={(e) => {
              setIsFinished(e.target.value);
            }}
          >
            <option
              value=""
              defaultChecked
              selected={isFinished == "" ? true : false}
            >
              الكل
            </option>
            {["true", "false"]?.map((type: any, idx) => (
              <>
                <option
                  selected={isFinished == type ? true : false}
                  key={idx}
                  value={type}
                >
                  {type === "true" ? "تم الانتهاء" : "غير مكتمل"}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
