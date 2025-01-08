import React from 'react';
import { Book } from 'lucide-react';
import Card from '../ui/Card';
import type { StudentCourse } from '../../types/student';

export default function RegisteredCourses({ courses }: { courses: StudentCourse[] }) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">الدورات المسجلة</h3>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-[#67B37D]" />
              <div>
                <p className="font-medium text-gray-900">{course.name}</p>
                <p className="text-sm text-gray-500">تاريخ الانضمام: {course.joinDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}