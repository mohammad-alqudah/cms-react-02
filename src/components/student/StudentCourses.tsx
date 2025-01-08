import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';
import Card from '../ui/Card';
import CoursePayments from './CoursePayments';
import { formatDate } from '../../utils/date';
import type { StudentCourse } from '../../types/student';

interface StudentCoursesProps {
  courses: StudentCourse[];
}

export default function StudentCourses({ courses }: StudentCoursesProps) {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">الدورات المسجلة</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="border border-gray-100 rounded-lg">
            <button
              onClick={() => setExpandedCourseId(expandedCourseId === course.id ? null : course.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-[#67B37D]" />
                <div className="text-right">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-gray-500">
                    المدرب: {course.instructor} | تاريخ البدء: {formatDate(course.start_date)}
                  </p>
                </div>
              </div>
              {expandedCourseId === course.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {expandedCourseId === course.id && (
              <div className="p-4 border-t border-gray-100">
                <CoursePayments payments={course.payments} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}