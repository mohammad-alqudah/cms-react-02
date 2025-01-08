import { apiClient } from './client';

export async function get<T>(endpoint: string): Promise<T> {
  const response = await apiClient.get<T>(endpoint);
  return response.data;
}

export async function post<T>(endpoint: string, data?: any): Promise<T> {
  const response = await apiClient.post<T>(endpoint, data);
  return response.data;
}