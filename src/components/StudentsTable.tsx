import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  getStudents,
  getStudentDetails,
  getStudentCourses,
  downloadExcelFile,
} from "../services/students/api";
import { mapApiStudentToModel } from "../services/students/mapper";
import type { StudentDetails, StudentCourse } from "../types/student";
import DataTable from "./table/DataTable";
import Pagination from "./Pagination";
import StudentDetailsView from "./student/StudentDetailsView";
import Card from "./ui/Card";
import StudentTableFilters from "./student/StudentTableFilters";
import { getCenters } from "../services/courses/api";

export default function StudentsTable() {
  const [students, setStudents] = useState<StudentDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gender, setGender] = useState("");
  const [centerId, setCenterId] = useState<any>("");
  const [centers, setCenters] = useState<any[]>([]);

  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc" | null;
  }>({
    field: "",
    direction: null,
  });

  // New state for student details
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(
    null
  );
  const [studentCourses, setStudentCourses] = useState<StudentCourse[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    async function fetchCenters() {
      try {
        setIsLoading(true);

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

    fetchCenters();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      try {
        setIsLoading(true);
        const response = await getStudents(
          currentPage,
          sort.direction ? sort : undefined,
          search,
          startDate,
          endDate,
          gender,
          centerId
        );

        setStudents(response.data.map(mapApiStudentToModel));
        setTotalCount(Number(response.count));
        setHasNext(!!response.next);
        setHasPrevious(!!response.previous);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch students"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
  }, [currentPage, sort, search, centerId, startDate, endDate, gender]);

  const handleStudentClick = async (studentId: string) => {
    try {
      setIsLoadingDetails(true);
      setSelectedStudentId(studentId);

      // Fetch both student details and courses in parallel
      const [detailsResponse, coursesResponse] = await Promise.all([
        getStudentDetails(studentId),
        getStudentCourses(studentId),
      ]);

      setSelectedStudent(detailsResponse.data);
      setStudentCourses(coursesResponse.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch student details"
      );
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleBack = () => {
    setSelectedStudentId(null);
    setSelectedStudent(null);
    setStudentCourses([]);
  };

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const columns = [
    { label: "الاسم", field: "name" },
    { label: "الجنس", field: "gender" },
    { label: "العمر", field: "age" },
    { label: "المستوى التعليمي", field: "educationLevel" },
    { label: "رقم الهاتف", field: "mobileNumber" },
    { label: "ملاحظات", field: "notes" },
  ];

  if (error) {
    return (
      <Card>
        <div className="text-red-600 text-center py-4">{error}</div>
      </Card>
    );
  }

  if (selectedStudentId && selectedStudent) {
    return (
      <StudentDetailsView
        student={selectedStudent}
        courses={studentCourses}
        onBack={handleBack}
      />
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">الطلاب</h2>
          <p className="text-sm text-gray-500">
            إجمالي عدد الطلاب: {totalCount}
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
            onClick={() => downloadExcelFile()}
            className="bg-green-100 py-2 px-4 rounded-lg text-green-700 font-medium hover:bg-green-200 transition-colors"
          >
            تحميل ملف Excel
          </button>
        </div>
      </div>

      <StudentTableFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        gender={gender}
        setGender={setGender}
        centerId={centerId}
        setCenterId={setCenterId}
        centers={centers}
      />

      {/* اسم المركز ذكر وانثي العمر */}

      {isLoading || isLoadingDetails ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={students}
            onSort={handleSort}
            onRowClick={handleStudentClick}
            storageKeyName="students-table-columns"
          />
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
