import type { AxiosInstance } from "axios";
import axios from "axios";

export function setupUnauthorizationInterceptor(api: AxiosInstance): void {

  api.interceptors.response.use(
    (response) => response,
    (error) => {      
      if (axios.isAxiosError(error) && error.response?.status === 401 && !window.location.href.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}