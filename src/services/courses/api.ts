import { get, post } from "../api";
import { getStoredTokens } from "../auth";
// import type {
//   CourseResponse,
//   ApiCourseDetails,
//   ApiCourseStudent,
// } from "../../types/course";

export async function getCourses(
  page: number = 1,
  sort?: { field: string; direction: "asc" | "desc" | null },
  search?: string,
  startDate?: string,
  endDate?: string,
  courseType?: string,
  centerId?: string,
  modeOfInstructionId?: string
): Promise<any> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(sort?.field && { sort: `${sort.field}` }),
    ...(sort?.direction && { order: `${sort.direction}` }),
    ...(search && { search }),
    ...(startDate && { date: startDate }),
    ...(endDate && { end_date: endDate }),
    ...(courseType && { type: courseType }),
    ...(centerId && { center: centerId }),
    ...(modeOfInstructionId && { mode_of_instruction: modeOfInstructionId }),
  });

  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  let endpoint = `tajweed/dashboard/courses/?${params.toString()}`;
  // if (sort?.field && sort?.direction) {
  //   endpoint += `&sort=${encodeURIComponent(
  //     sort.field
  //   )}&order=${encodeURIComponent(sort.direction)}&${params.toString()}`;
  // }

  return get<any>(endpoint, tokens.access);
}

export async function getCenters(): Promise<any> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  let endpoint = `center/centers/`;

  return get<any>(endpoint, tokens.access);
}

export async function getCoursesType(): Promise<any> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  let endpoint = `tajweed/courses/types/`;

  return get<any>(endpoint, tokens.access);
}

export async function getCourseDetails(
  courseId: string
): Promise<{ data: any; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return get(`tajweed/dashboard/course/${courseId}/`, tokens.access);
}

export async function getCourseStudents(
  courseId: string
): Promise<{ data: any[]; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return get(`tajweed/dashboard/course/${courseId}/students`, tokens.access);
}

export async function finishCourse(
  courseId: string
): Promise<{ data: string; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  return post(
    `tajweed/dashboard/finish_course/${courseId}/`,
    {},
    tokens.access
  );
}
