import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getStoredTokens } from "../auth";

export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const tokens = getStoredTokens();

      console.log("tokens?.access", tokens);

      if (tokens?.access) {
        config.headers.Authorization = `Bearer ${tokens.access}`;
      }
      return config;
    },
    (error) => {
      console.log("error::", error);
      Promise.reject(error);
    }
  );
}
