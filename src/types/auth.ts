export interface LoginCredentials {
  mobile_number: string;
  password: string;
}

export interface AuthTokens {
  refresh: string;
  access: string;
  group: string | null;
  new_user: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: boolean;
  error: string | null;
}