import axios, { AxiosInstance } from 'axios';
import { API_CONFIG, DEFAULT_HEADERS } from './config';
import { setupInterceptors } from './interceptors';

const createAPIClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: DEFAULT_HEADERS,
  });

  setupInterceptors(client);
  return client;
};

export const apiClient = createAPIClient();