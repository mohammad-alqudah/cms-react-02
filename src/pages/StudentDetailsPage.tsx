import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentDetailsView from '../components/student/StudentDetailsView';
import { getStudentDetails, getStudentCourses } from '../services/students/api';
import type { StudentDetails, StudentCourse } from '../types/student';

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudentData() {
      if (!id) return;

      try {
        setIsLoading(true);
        const [detailsResponse, coursesResponse] = await Promise.all([
          getStudentDetails(id),
          getStudentCourses(id)
        ]);
        
        setStudent(detailsResponse.data);
        setCourses(coursesResponse.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch student data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudentData();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <StudentDetailsView
      student={student}
      courses={courses}
      onBack={() => navigate('/students')}
    />
  );
}