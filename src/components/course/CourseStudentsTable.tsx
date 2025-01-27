// import type { CourseStudent } from "../../types/course";
import { getAttendanceStatusColor } from "../../utils/attendance";
import { formatDate, getNumberBeforeDot } from "../../utils/date";
import Card from "../ui/Card";

interface CourseStudentsTableProps {
  students: any[];
}

export default function CourseStudentsTable({
  students,
}: CourseStudentsTableProps) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">قائمة الطلاب</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                الاسم
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                العمر
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                تاريخ الانضمام
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                عدد الحصص المحضورة
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                نسبة الحضور
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                المبلغ المدفوع
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
              >
                حالة الحضور
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(student.enrollment_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.attended_sessions_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getNumberBeforeDot(student.attendance_percentage)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.total_payment
                    ? `${student.total_payment} دينار`
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getAttendanceStatusColor(
                      student.attendance_status
                    )}`}
                  >
                    {student.attendance_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
