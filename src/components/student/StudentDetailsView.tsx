import React from 'react';
import StudentHeader from './StudentHeader';
import StudentInfo from './StudentInfo';
import StudentCourses from './StudentCourses';
import type { StudentDetails, StudentCourse } from '../../types/student';

interface StudentDetailsViewProps {
  student: StudentDetails;
  courses: StudentCourse[];
  onBack: () => void;
}

export default function StudentDetailsView({ student, courses, onBack }: StudentDetailsViewProps) {
  return (
    <div className="space-y-6">
      <StudentHeader student={student} onBack={onBack} />
      <StudentInfo student={student} />
      <StudentCourses courses={courses} />
    </div>
  );
}