import { getStoredTokens, removeTokens } from "./auth";

const API_BASE_URL = "https://cms-app.org/";

export async function getPermission(): Promise<any> {
  const tokens = getStoredTokens();
  if (!tokens) {
    throw new Error("No authentication tokens found");
  }

  const response = await fetch(`${API_BASE_URL}account/user/`, {
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
    throw new Error("Failed to fetch courses");
  }

  return response.json();
}
