import { ApiCourse, Course } from "../types/course";
import { getStoredTokens } from "./auth";

const API_BASE_URL = "https://cms-app.org/";

export async function getCourses(page: number = 1): Promise<ApiCourse> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(
    `${API_BASE_URL}tajweed/dashboard/courses/?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}

export function mapApiCourseToModel(apiCourse: ApiCourse): Course {
  return {
    id: apiCourse.id.toString(),
    name: apiCourse.name,
    startDate: apiCourse.date,
    endDate: apiCourse.end_date,
    studentCount: apiCourse.number_of_students,
    sessionsCount: apiCourse.number_of_sessions,
    attendanceRate: apiCourse.attendance_percentage,
    collectedAmount: Number(apiCourse.payment),
    expectedAmount: parseFloat(apiCourse.payment_goal),
    paymentRate: apiCourse.payment_percentage,
    instructor: apiCourse.instructor,
    finishedAt: apiCourse.finished_at,
    alert: apiCourse.alert,
  };
}
