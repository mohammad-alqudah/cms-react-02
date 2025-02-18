export interface ApiCourse {
  id: number;
  name: string;
  date: string;
  end_date: string;
  finished_at: string | null;
  number_of_students: number;
  instructor_name: string;
  number_of_sessions: number;
  attendance_percentage: number;
  payment: number;
  payment_goal: string;
  payment_percentage: number;
  price: number;
  instructor_cost: number;
  instructor: string;
  alert: string | null;
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  startDate: string;
  endDate: string;
  finishedAt: string | null;
  finished_at: string | null;
  studentCount: number;
  student_count: number;
  sessionsCount: number;
  attendanceRate: number;
  collectedAmount: number;
  expectedAmount: number;
  paymentRate: number;
  alert: string | null;
  date: string;
  end_date: string;
  center: string;
  mode_of_instruction: string;
}
