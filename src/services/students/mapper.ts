import { formatDate } from '../../utils/date';
import type { ApiStudent, Student } from '../../types/student';

export function mapApiStudentToModel(apiStudent: ApiStudent): Student {
  return {
    id: apiStudent.id.toString(),
    name: apiStudent.name,
    gender: apiStudent.gender,
    educationLevel: apiStudent.education_level,
    mobileNumber: apiStudent.mobile_number,
    age: apiStudent.age,
    notes: apiStudent.notes || '',
    createdAt: formatDate(apiStudent.created_at),
  };
}