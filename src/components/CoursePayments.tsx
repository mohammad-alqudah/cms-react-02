import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils/date';
import type { Payment } from '../types/student';

interface CoursePaymentsProps {
  payments: Payment[];
}

export default function CoursePayments({ payments }: CoursePaymentsProps) {
  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'تم الدفع';
      case 'pending':
        return 'قيد الانتظار';
      case 'overdue':
        return 'متأخر';
    }
  };

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#67B37D]" />
            <span className="text-sm text-gray-600">
              {formatDate(payment.date)}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-medium">{payment.amount} ريال</span>
            <div className="flex items-center gap-2">
              {getStatusIcon(payment.status)}
              <span className="text-sm">{getStatusText(payment.status)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}