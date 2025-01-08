import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Statistics } from '../types';

interface StatCardProps {
  title: string;
  value: number;
  growth: number;
}

function StatCard({ title, value, growth }: StatCardProps) {
  const isPositive = growth >= 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 ml-1" /> : <TrendingDown className="w-4 h-4 ml-1" />}
        <span className="font-medium">{Math.abs(growth)}%</span>
      </div>
    </div>
  );
}

export default function Statistics({ stats }: { stats: Statistics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="عدد الدورات"
        value={stats.coursesCount}
        growth={stats.coursesGrowth}
      />
      <StatCard
        title="عدد الطلاب"
        value={stats.studentsCount}
        growth={stats.studentsGrowth}
      />
      <StatCard
        title="عدد الساعات المعطاة هذا الشهر"
        value={stats.monthlyHours}
        growth={stats.hoursGrowth}
      />
    </div>
  );
}