import { get, post } from '../api';
import { getStoredTokens } from '../auth';
import type { CourseResponse, ApiCourseDetails, ApiCourseStudent } from '../../types/course';

export async function getCourses(
  page: number = 1, 
  sort?: { field: string; direction: 'asc' | 'desc' }
): Promise<CourseResponse> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error('No authentication tokens found');
  }

  let endpoint = `/tajweed/dashboard/courses/?page=${page}`;
  if (sort?.field && sort?.direction) {
    endpoint += `&sort=${encodeURIComponent(sort.field)}&order=${encodeURIComponent(sort.direction)}`;
  }

  return get<CourseResponse>(endpoint, tokens.access);
}

export async function getCourseDetails(
  courseId: string
): Promise<{ data: ApiCourseDetails; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error('No authentication tokens found');
  }

  return get(`/tajweed/dashboard/course/${courseId}/`, tokens.access);
}

export async function getCourseStudents(
  courseId: string
): Promise<{ data: ApiCourseStudent[]; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error('No authentication tokens found');
  }

  return get(`/tajweed/dashboard/course/${courseId}/students`, tokens.access);
}

export async function finishCourse(courseId: string): Promise<{ data: string; status: boolean; error: null }> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error('No authentication tokens found');
  }

  return post(`/tajweed/dashboard/finish_course/${courseId}/`, {});
}