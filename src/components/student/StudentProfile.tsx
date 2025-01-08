import React from 'react';
import { Calendar, Wallet } from 'lucide-react';
import Card from '../ui/Card';
import type { StudentProfile } from '../../types/student';

export default function StudentProfile({ profile }: { profile: StudentProfile }) {
  const isDeficit = profile.balanceAmount < 0;

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#67B37D]" />
            <div>
              <p className="text-sm text-gray-500">تاريخ الانضمام</p>
              <p className="font-medium">{profile.joinDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-[#67B37D]" />
            <div>
              <p className="text-sm text-gray-500">
                {isDeficit ? 'العجز في الدفع' : 'المبلغ المتبقي'}
              </p>
              <p className={`font-medium ${isDeficit ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(profile.balanceAmount)} ريال
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}