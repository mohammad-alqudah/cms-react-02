import { useEffect, useState } from 'react';
import Statistics from '../components/Statistics';
import RevenueChart from '../components/RevenueChart';
import { getDashboardStats, getDashboardMetrics } from '../services/dashboard/api';
import { mapApiStatsToRevenueData, mapApiMetricsToStats } from '../services/dashboard/mapper';
import type { Statistics as StatsType, MonthlyRevenue } from '../types';

export default function StatisticsPage() {
  const [revenueData, setRevenueData] = useState<MonthlyRevenue[]>([]);
  const [stats, setStats] = useState<StatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        const [statsResponse, metricsResponse] = await Promise.all([
          getDashboardStats(),
          getDashboardMetrics()
        ]);
        
        setRevenueData(mapApiStatsToRevenueData(statsResponse.data));
        setStats(mapApiMetricsToStats(metricsResponse.data));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">جاري تحميل البيانات...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {stats && <Statistics stats={stats} />}
      <RevenueChart data={revenueData} />
    </div>
  );
}