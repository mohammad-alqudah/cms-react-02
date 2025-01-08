import React from 'react';
import { Calendar } from 'lucide-react';
import Card from '../ui/Card';
import type { PaymentRecord } from '../../types/student';

export default function PaymentHistory({ payments }: { payments: PaymentRecord[] }) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">سجل المدفوعات</h3>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#67B37D]" />
              <span className="text-sm text-gray-600">{payment.date}</span>
            </div>
            <span className="font-medium text-green-600">{payment.amount} ريال</span>
          </div>
        ))}
      </div>
    </Card>
  );
}