export interface ApiDashboardStats {
  months: string[];
  paid_amounts: number[];
  expected_payments: number[];
}

export interface MonthlyRevenue {
  month: string;
  collected: number;
  expected: number;
}

export interface ApiDashboardMetrics {
  students: {
    recent_count: number;
    previous_count: number;
    percentage_change: number;
  };
  courses: {
    recent_count: number;
    previous_count: number;
    percentage_change: number;
  };
  sessions: {
    recent_count: number;
    previous_count: number;
    percentage_change: number;
  };
}