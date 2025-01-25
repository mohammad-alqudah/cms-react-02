import type { LoginCredentials, AuthTokens, ApiResponse } from "../types/auth";
import { post } from "./api";

const TOKEN_KEY = "tajweed_auth_tokens";

export function getStoredTokens(): AuthTokens | null {
  try {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch {
    return null;
  }
}

export function storeTokens(tokens: AuthTokens): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

export function removeTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getStoredTokens();
}

export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<{ tokens: AuthTokens }>> {
  const response = await post<ApiResponse<{ tokens: AuthTokens }>>(
    "/dashboard/login/",
    credentials
  );

  if (response.status && response.data.tokens) {
    storeTokens(response.data.tokens);
  }

  return response;
}
