import { useNavigate } from 'react-router-dom';
import StudentsTable from '../components/StudentsTable';

export default function StudentsPage() {
  const navigate = useNavigate();

  return (
    <StudentsTable 
      onStudentClick={(studentId) => navigate(`/students/${studentId}`)} 
    />
  );
}