import { AxiosError } from 'axios';

interface APIError {
  message: string;
  code: string;
  status: number;
}

export function handleError(error: AxiosError): APIError {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      code: error.response.data?.code || 'SERVER_ERROR',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  } else {
    // Request setup error
    return {
      message: error.message || 'Request failed',
      code: 'REQUEST_ERROR',
      status: 0,
    };
  }
}