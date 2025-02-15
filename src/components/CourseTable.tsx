import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  downloadCoursesExcelFile,
  getCenters,
  getCourses,
  getCoursesType,
} from "../services/courses/api";
import { mapApiCourseToModel } from "../services/courses/mapper";
import { formatDate } from "../utils/date";
import type { Course } from "../types/course";
import TableFilters from "./table/TableFilters";
import DataTable from "./table/DataTable";
import Pagination from "./Pagination";
import Card from "./ui/Card";

interface CourseTableProps {
  onCourseClick: (courseId: string) => void;
}

export default function CourseTable({ onCourseClick }: CourseTableProps) {
  const filterDefaults = JSON.parse(localStorage.getItem("filterData") || "{}");
  const [courses, setCourses] = useState<Course[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(
    filterDefaults.showFilters || false
  );
  const [search, setSearch] = useState(filterDefaults.search || "");
  const [startDate, setStartDate] = useState(filterDefaults.startDate || "");
  const [endDate, setEndDate] = useState(filterDefaults.endDate || "");
  const [courseType, setCourseType] = useState<any>();
  const [courseTypeId, setCourseTypeId] = useState<any>(
    filterDefaults.courseTypeId || ""
  );
  const [centerId, setCenterId] = useState<any>(filterDefaults.centerId || "");
  const [modeOfInstructionId, setModeOfInstructionId] = useState<any>(
    filterDefaults.modeOfInstructionId || ""
  );
  const [isFinished, setIsFinished] = useState<any>(
    filterDefaults.isFinished || false
  );
  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc" | null;
  }>({
    field: "",
    direction: null,
  });

  useEffect(() => {
    async function fetchFilteredCourses() {
      try {
        setIsLoading(true);
        const response = await getCourses(
          currentPage,
          sort.direction ? sort : undefined,
          search,
          startDate,
          endDate,
          courseTypeId,
          centerId,
          modeOfInstructionId,
          isFinished
        );

        setCourses(response.data.map(mapApiCourseToModel));
        setTotalCount(response.count);
        setHasNext(!!response.next);
        setHasPrevious(!!response.previous);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilteredCourses();
  }, [
    currentPage,
    sort,
    search,
    startDate,
    endDate,
    courseTypeId,
    centerId,
    modeOfInstructionId,
    isFinished,
  ]);

  useEffect(() => {
    async function fetchCoursesType() {
      try {
        setIsLoading(true);
        const response = await getCoursesType();
        setCourseType(response.data.map(mapApiCourseToModel));

        const centers = await getCenters();
        setCenters(centers.data);

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoursesType();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "filterData",
      JSON.stringify({
        save: true,
        showFilters,
        search,
        centerId,
        courseTypeId,
        startDate,
        endDate,
        modeOfInstructionId,
        isFinished,
      })
    );
  }, [
    showFilters,
    search,
    courseTypeId,
    centerId,
    startDate,
    endDate,
    modeOfInstructionId,
    isFinished,
  ]);

  useEffect(() => {
    localStorage.setItem("filterData", JSON.stringify({ save: false }));

    if (!filterDefaults.save) localStorage.removeItem("filterData");
  }, []);

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const columns = [
    { label: "اسم الدورة", field: "name" },
    { label: "المدرب", field: "instructor" },
    {
      label: "تاريخ البدء",
      field: "date",
      render: (course: Course) => formatDate(course.date),
    },
    {
      label: "تاريخ الانتهاء",
      field: "end_date",
      render: (course: Course) => formatDate(course.end_date),
    },
    {
      label: "وقت الانتهاء الفعلي",
      field: "finished_at",
      render: (course: Course) => formatDate(course.finishedAt),
    },
    { label: "عدد الطلاب", field: "number_of_students" },
    { label: "عدد الحصص", field: "number_of_sessions" },
    {
      label: "نسبة الحضور",
      field: "attendance_percentage",
      render: (course: Course) => `${course.attendanceRate}%`,
    },
    {
      label: "المبلغ المحصل",
      field: "payment",
      render: (course: Course) => `${course.collectedAmount} دينار`,
    },
    {
      label: "المبلغ المتوقع",
      field: "payment_goal",
      render: (course: Course) => `${course.expectedAmount} دينار`,
    },
    {
      label: "نسبة التحصيل",
      field: "payment_percentage",
      render: (course: Course) => `${course.paymentRate}%`,
    },
    {
      label: " المراكز",
      field: "center",
      // render: (course: Course) => `${course.center}---`,
    },
    {
      label: "طريقة التدريس",
      field: "mode_of_instruction",
      render: (course: Course) =>
        `${course.mode_of_instruction === "face_to_face" ? "وجاهي" : "عن بعد"}`,
    },
  ];

  if (error) {
    return (
      <Card>
        <div className="text-red-600 text-center py-4">{error}</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">دورات التجويد</h2>
          <p className="text-sm text-gray-500">
            إجمالي عدد الدورات: {totalCount}
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#67B37D] hover:bg-[#67B37D]/10 rounded-lg transition-colors"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "إخفاء الفلترة" : "إظهار الفلترة"}
        </button>
        <div>
          <button
            onClick={() => downloadCoursesExcelFile()}
            className="bg-green-100 py-2 px-4 rounded-lg text-green-700 font-medium hover:bg-green-200 transition-colors"
          >
            تحميل ملف Excel
          </button>
        </div>
      </div>

      <TableFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        courseType={courseType}
        courseTypeId={courseTypeId}
        setCourseTypeId={setCourseTypeId}
        centers={centers}
        centerId={centerId}
        setCenterId={setCenterId}
        modeOfInstructionId={modeOfInstructionId}
        setModeOfInstructionId={setModeOfInstructionId}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />

      {isLoading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={courses}
            onRowClick={onCourseClick}
            sort={sort}
            onSort={handleSort}
            storageKeyName="course-table-columns"
          />
          {/* <ReactTable /> */}
          <Pagination
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={setCurrentPage}
            count={totalCount}
          />
        </>
      )}
    </Card>
  );
}
