// Add to existing types
export interface StudentDetails {
  previous: any;
  next: any;
  count(count: any): unknown;
  data: any;
  id: string;
  name: string;
  image: string | null;
  gender: string;
  education_level: string;
  mobile_number: string;
  age: number;
  date_of_birth: string;
  notes: string | null;
  created_at: string;
}

export interface StudentCourse {
  id: string;
  name: string;
  start_date: string;
  instructor: string;
  payments: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}
