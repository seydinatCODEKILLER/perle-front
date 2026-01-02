import axios from "axios";
import { API_CONFIG, DEFAULT_HEADERS } from "./config/api.config";
import {
  requestInterceptor,
  requestErrorInterceptor,
} from "./interceptors/request.interceptor";
import {
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors/response.interceptor";

/**
 * Instance Axios configurée
 */
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Intercepteurs de requêtes
apiClient.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

// Intercepteurs de réponses
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

/**
 * Helpers API simplifiés
 */
export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};

export default apiClient;