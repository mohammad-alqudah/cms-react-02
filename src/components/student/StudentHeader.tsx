import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { formatDate } from '../../utils/date';
import type { StudentDetails } from '../../types/student';

interface StudentHeaderProps {
  student: StudentDetails;
  onBack: () => void;
}

export default function StudentHeader({ student, onBack }: StudentHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          {student.image ? (
            <img 
              src={student.image} 
              alt={student.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
          <p className="text-sm text-gray-500">
            تاريخ الانضمام: {formatDate(student.created_at)}
          </p>
        </div>
      </div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#67B37D] hover:text-[#67B37D]/80 transition-colors"
      >
        <ArrowRight className="h-5 w-5" />
        <span>العودة إلى قائمة الطلاب</span>
      </button>
    </div>
  );
}