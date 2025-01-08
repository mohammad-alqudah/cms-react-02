import { get, post, put, del } from './methods';

interface User {
  id: number;
  name: string;
  email: string;
}

// Example usage
export async function getUsers(): Promise<User[]> {
  return get<User[]>('/users');
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  return post<User>('/users', userData);
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  return put<User>(`/users/${id}`, userData);
}

export async function deleteUser(id: number): Promise<void> {
  return del<void>(`/users/${id}`);
}