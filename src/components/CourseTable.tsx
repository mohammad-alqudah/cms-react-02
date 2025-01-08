import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { getCourses } from '../services/courses/api';
import { mapApiCourseToModel } from '../services/courses/mapper';
import { formatDate } from '../utils/date';
import type { Course } from '../types/course';
import TableFilters from './table/TableFilters';
import DataTable from './table/DataTable';
import Pagination from './Pagination';
import Card from './ui/Card';

interface CourseTableProps {
  onCourseClick: (courseId: string) => void;
}

export default function CourseTable({ onCourseClick }: CourseTableProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' | null }>({
    field: '',
    direction: null,
  });

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        const response = await getCourses(currentPage, sort.direction ? sort : undefined);
        setCourses(response.data.map(mapApiCourseToModel));
        setTotalCount(response.count);
        setHasNext(!!response.next);
        setHasPrevious(!!response.previous);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, [currentPage, sort]);

  const handleSort = (field: string) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const columns = [
    { label: "اسم الدورة", field: "name" },
    { label: "المدرب", field: "instructor" },
    { 
      label: "تاريخ البدء", 
      field: "startDate",
      render: (course: Course) => formatDate(course.startDate)
    },
    { 
      label: "تاريخ الانتهاء", 
      field: "endDate",
      render: (course: Course) => formatDate(course.endDate)
    },
    { 
      label: "وقت الانتهاء الفعلي", 
      field: "finishedAt",
      render: (course: Course) => formatDate(course.finishedAt)
    },
    { label: "عدد الطلاب", field: "studentCount" },
    { label: "عدد الحصص", field: "sessionsCount" },
    { 
      label: "نسبة الحضور", 
      field: "attendanceRate",
      render: (course: Course) => `${course.attendanceRate}%`
    },
    { 
      label: "المبلغ المحصل", 
      field: "collectedAmount",
      render: (course: Course) => `${course.collectedAmount} دينار`
    },
    { 
      label: "المبلغ المتوقع", 
      field: "expectedAmount",
      render: (course: Course) => `${course.expectedAmount} دينار`
    },
    { 
      label: "نسبة التحصيل", 
      field: "paymentRate",
      render: (course: Course) => `${course.paymentRate}%`
    }
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
          <p className="text-sm text-gray-500">إجمالي عدد الدورات: {totalCount}</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#67B37D] hover:bg-[#67B37D]/10 rounded-lg transition-colors"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'إخفاء الفلترة' : 'إظهار الفلترة'}
        </button>
      </div>

      <TableFilters
        show={showFilters}
        search={search}
        onSearchChange={setSearch}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
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
          />
          <Pagination
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Card>
  );
}