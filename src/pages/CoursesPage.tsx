import { useNavigate } from "react-router-dom";
import CourseTable from "../components/CourseTable";

export default function CoursesPage() {
  const navigate = useNavigate();

  return (
    <CourseTable
      onCourseClick={(courseId) => navigate(`/courses/${courseId}`)}
    />
  );
}
