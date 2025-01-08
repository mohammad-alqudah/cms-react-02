import React from 'react';
import { Phone, GraduationCap, Calendar, Clock, FileText } from 'lucide-react';
import Card from '../ui/Card';
import { formatDate } from '../../utils/date';
import type { StudentDetails } from '../../types/student';

interface StudentInfoProps {
  student: StudentDetails;
}

export default function StudentInfo({ student }: StudentInfoProps) {
  const infoItems = [
    { icon: GraduationCap, label: 'المستوى التعليمي', value: student.education_level },
    { icon: Phone, label: 'رقم الهاتف', value: student.mobile_number },
    { icon: Calendar, label: 'تاريخ الميلاد', value: formatDate(student.date_of_birth) },
    { icon: Clock, label: 'العمر', value: `${student.age} سنة` },
  ];

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">معلومات الطالب</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-[#67B37D]" />
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>
      {student.notes && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#67B37D]" />
            <div>
              <p className="text-sm text-gray-500">ملاحظات</p>
              <p className="mt-1 text-gray-700">{student.notes}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}