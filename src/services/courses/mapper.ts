import { formatDate } from '../../utils/date';
import type { ApiCourse, Course, ApiCourseDetails, CourseDetails, ApiCourseStudent, CourseStudent } from '../../types/course';

export function mapApiCourseToModel(apiCourse: ApiCourse): Course {
  return {
    id: apiCourse.id.toString(),
    name: apiCourse.name,
    instructor: apiCourse.instructor,
    startDate: formatDate(apiCourse.date),
    endDate: formatDate(apiCourse.end_date),
    finishedAt: formatDate(apiCourse.finished_at),
    studentCount: apiCourse.number_of_students,
    sessionsCount: apiCourse.number_of_sessions,
    attendanceRate: apiCourse.attendance_percentage,
    collectedAmount: parseFloat(apiCourse.payment || '0'),
    expectedAmount: parseFloat(apiCourse.payment_goal),
    paymentRate: apiCourse.payment_percentage || 0,
    alert: apiCourse.alert,
  };
}

export function mapApiCourseDetailsToModel(apiResponse: ApiCourseDetails): CourseDetails {
  const apiDetails = apiResponse.data;
  
  return {
    id: apiDetails.id.toString(),
    name: apiDetails.name,
    instructor: apiDetails.instructor,
    instructorCost: apiDetails.instructor_cost,
    price: apiDetails.price,
    startDate: formatDate(apiDetails.date),
    endDate: formatDate(apiDetails.end_date),
    studentCount: apiDetails.number_of_students,
    sessionsCount: apiDetails.number_of_sessions,
    attendanceRate: apiDetails.attendance_percentage,
    collectedAmount: apiDetails.payment || 0,
    expectedAmount: parseFloat(apiDetails.payment_goal),
    paymentRate: apiDetails.payment_percentage || 0,
  };
}

export function mapApiCourseStudentToModel(apiStudent: ApiCourseStudent): CourseStudent {
  return {
    id: apiStudent.id.toString(),
    name: apiStudent.name,
    age: apiStudent.age,
    enrollmentDate: formatDate(apiStudent.enrollment_date),
    attendedSessionsCount: apiStudent.attended_sessions,
    attendancePercentage: apiStudent.attendance_percentage,
    totalPayment: apiStudent.total_payment,
    attendanceStatus: apiStudent.attendance_status,
  };
}