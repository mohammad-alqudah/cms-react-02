export interface Course {
  id: string;
  name: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  feesCollectionRate: number;
  paymentRate: number;
  sessionsCount: number;
  collectedAmount: number;
  expectedAmount: number;
}

export interface Student {
  id: string;
  name: string;
  sessionsCount: number;
  status: string;
  joinDate: string;
  fees: number;
}

export interface StudentDetails {
  id: string;
  name: string;
  gender: 'ذكر' | 'أنثى';
  educationLevel: string;
  birthDate: string;
  notes: string;
}

export interface CourseDetails {
  teacher: string;
  startDate: string;
  endDate: string;
  courseFees: number;
  teacherBonus: number;
  collectionRate: number;
  collectedAmount: number;
  expectedAmount: number;
  studentCount: number;
  totalAttendanceRate: number;
  recentAttendanceRate: number;
}

export interface Statistics {
  coursesCount: number;
  coursesGrowth: number;
  studentsCount: number;
  studentsGrowth: number;
  monthlyHours: number;
  hoursGrowth: number;
}

export interface MonthlyRevenue {
  month: string;
  collected: number;
  expected: number;
}