import type { ApiDashboardStats, ApiDashboardMetrics, MonthlyRevenue } from '../../types/dashboard';
import type { Statistics } from '../../types';

export function mapApiStatsToRevenueData(apiStats: ApiDashboardStats): MonthlyRevenue[] {
  return apiStats.months.map((month, index) => ({
    month: formatMonth(month),
    collected: apiStats.paid_amounts[index],
    expected: apiStats.expected_payments[index],
  }));
}

export function mapApiMetricsToStats(metrics: ApiDashboardMetrics): Statistics {
  return {
    coursesCount: metrics.courses.recent_count,
    coursesGrowth: metrics.courses.percentage_change,
    studentsCount: metrics.students.recent_count,
    studentsGrowth: metrics.students.percentage_change,
    monthlyHours: metrics.sessions.recent_count,
    hoursGrowth: metrics.sessions.percentage_change,
  };
}

function formatMonth(monthStr: string): string {
  const date = new Date(monthStr);
  return date.toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });
}