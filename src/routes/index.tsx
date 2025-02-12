import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import StudentsPage from "../pages/StudentsPage";
import StudentDetailsPage from "../pages/StudentDetailsPage";
import StatisticsPage from "../pages/StatisticsPage";
import InventoryPage from "../pages/InventoryPage";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/courses" replace />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailsPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="inventory" element={<InventoryPage />} />
      </Route>
    </Routes>
  );
}
