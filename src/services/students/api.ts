import { getStoredTokens, removeTokens } from "../auth";
import type { StudentDetails, StudentCourse } from "../../types/student";
import { mockStudentDetails, mockStudentCourses } from "./mockData";

const API_BASE_URL = "https://cms-app.org/";

export async function getStudents(page: number = 1): Promise<StudentDetails> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(
    `${API_BASE_URL}tajweed/dashboard/students/?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }
  );

  if (response.status === 401) {
    removeTokens();
    window.location.reload();
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export async function downloadExcelFile(): Promise<any> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(
    `${API_BASE_URL}tajweed/dashboard/students/?data-type=excel`,
    {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    }
  );

  if (response.status === 401) {
    removeTokens();
    window.location.reload();
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export async function getStudentDetails(
  studentId: string
): Promise<{ data: StudentDetails; status: boolean; error: null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockStudentDetails,
    status: true,
    error: null,
  };
}

export async function getStudentCourses(
  studentId: string
): Promise<{ data: StudentCourse[]; status: boolean; error: null }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: mockStudentCourses,
    status: true,
    error: null,
  };
}
