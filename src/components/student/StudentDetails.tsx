import React from 'react';
import { ArrowRight } from 'lucide-react';
import StudentProfile from './StudentProfile';
import PaymentHistory from './PaymentHistory';
import RegisteredCourses from './RegisteredCourses';
import type { StudentProfile as StudentProfileType, PaymentRecord, StudentCourse } from '../../types/student';

interface StudentDetailsProps {
  profile: StudentProfileType;
  payments: PaymentRecord[];
  courses: StudentCourse[];
  onBack: () => void;
}

export default function StudentDetails({ profile, payments, courses, onBack }: StudentDetailsProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#67B37D] hover:text-[#67B37D]/80 transition-colors"
      >
        <ArrowRight className="h-5 w-5" />
        <span>العودة إلى قائمة الطلاب</span>
      </button>

      <div className="space-y-6">
        <StudentProfile profile={profile} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaymentHistory payments={payments} />
          <RegisteredCourses courses={courses} />
        </div>
      </div>
    </div>
  );
}