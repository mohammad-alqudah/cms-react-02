export function getAttendanceStatusColor(status: string): string {
  switch (status) {
    case 'ملتزم تمامًا':
      return 'text-green-600 bg-green-50';
    case 'ملتزم بالحضور':
      return 'text-emerald-600 bg-emerald-50';
    case 'حضور متوسط':
      return 'text-yellow-600 bg-yellow-50';
    case 'حضور ضعيف':
      return 'text-orange-600 bg-orange-50';
    case 'حضور نادر':
      return 'text-red-600 bg-red-50';
    case 'لم يحضر مطلقا':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}