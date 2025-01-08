import type { Course, CourseDetails, Student } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'دورة التجويد المستوى الأول',
    teacherName: 'أحمد محمد',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    studentCount: 25,
    feesCollectionRate: 85,
    paymentRate: 90,
    sessionsCount: 24,
    collectedAmount: 12500,
    expectedAmount: 15000,
  },
];

export const mockCourseDetails: CourseDetails = {
  teacher: 'أحمد محمد',
  startDate: '2024-03-01',
  endDate: '2024-06-01',
  courseFees: 1500,
  teacherBonus: 500,
  collectionRate: 85,
  collectedAmount: 12500,
  expectedAmount: 15000,
  studentCount: 25,
  totalAttendanceRate: 92,
  recentAttendanceRate: 88,
};

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'عبدالله أحمد',
    sessionsCount: 20,
    status: 'منتظم',
    joinDate: '2024-03-01',
    fees: 1500,
  },
];