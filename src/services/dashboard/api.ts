import { getStoredTokens, removeTokens } from "../auth";
import type {
  ApiDashboardStats,
  ApiDashboardMetrics,
} from "../../types/dashboard";

const API_BASE_URL = "https://cms-app.org/";

export async function getDashboardStats(): Promise<{
  data: ApiDashboardStats;
  status: boolean;
  error: null;
}> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(`${API_BASE_URL}tajweed/dashboard/index`, {
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
  });

  if (response.status === 401) {
    removeTokens();
    window.location.reload();
    window.location.href = "/login";
  }

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard statistics");
  }

  return response.json();
}

export async function getDashboardMetrics(): Promise<{
  data: ApiDashboardMetrics;
  status: boolean;
  error: null;
}> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(
    `${API_BASE_URL}tajweed/dashboard/index/data_over_time`,
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
    throw new Error("Failed to fetch dashboard metrics");
  }

  return response.json();
}
