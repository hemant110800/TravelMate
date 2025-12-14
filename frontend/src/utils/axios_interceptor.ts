// api.ts
import axios  from "axios";
import {updateAuthTokensExternal} from '../context/AuthContext'

const API_ROOT = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
});


// --- Global state for refresh handling ---
let isRefreshing = false;
let requestQueue: ((token: string | null) => void)[] = [];

// Add token before each request
// attach token automatically
api.interceptors.request.use(
  (config) => {
    const tokenStr = localStorage.getItem("authToken");
    if (tokenStr) {
      const token = JSON.parse(tokenStr).access;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshStr = localStorage.getItem("authToken");
          if (!refreshStr) throw new Error("No refresh token");

          const refreshToken = JSON.parse(refreshStr).refresh;
          const resp = await axios.post(`${API_ROOT}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          if (resp.status === 200) {
            const newTokens = {
              access: resp.data.access,
              refresh: refreshToken,
            };

            localStorage.setItem("authToken", JSON.stringify(newTokens));
            updateAuthTokensExternal?.(newTokens);

            // Resolve all queued requests with new token
            requestQueue.forEach((cb) => cb(newTokens.access));
            requestQueue = [];

            return api(originalRequest); // retry current
          }
        } catch (refreshError) {
          requestQueue.forEach((cb) => cb(null)); // reject waiting requests
          requestQueue = [];

          localStorage.removeItem("authToken");
          window.location.href = "/login";
        } finally {
          isRefreshing = false;
        }
      }

      // if already refreshing → queue the request
      return new Promise((resolve, reject) => {
        requestQueue.push((newAccessToken) => {
          if (!newAccessToken) {
            reject(error);
          } else {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(api(originalRequest));
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
