import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getStore } from "../store/store";
import { API_CONSTANT } from "../utils/constant";

const api: AxiosInstance = axios.create({
  baseURL:` ${API_CONSTANT}`,
 
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = getStore();
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const store = getStore();
      const refreshToken = "";
   
      if (!refreshToken) {
        // store.dispatch(clearAuthToken());
       window.location.href = "/login";

        return Promise.reject(error);
      
      }
      try {

        const refreshResponse = await api.post<{ token: string }>("/refresh_token", { refreshToken });
        if (refreshResponse.status === 200) {
          // store.dispatch(setAuthToken(refreshResponse.data.token));
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // store.dispatch(clearAuthToken());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
