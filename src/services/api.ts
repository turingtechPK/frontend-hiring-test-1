import axios from 'axios';
import { AuthResponse, LoginCredentials, Call, PaginatedCallsResponse } from '../types';

const BASE_URL = 'https://frontend-test-api.aircall.dev';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // No refresh token, logout user
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Attempt to refresh the token
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });
        
        const { access_token } = response.data;
        
        // Store the new token
        localStorage.setItem('accessToken', access_token);
        
        // Update the Authorization header for the original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store tokens in localStorage
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
  
  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await api.post<{ access_token: string }>('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
    
    localStorage.setItem('accessToken', response.data.access_token);
    
    return response.data.access_token;
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};

// Calls services
export const callsService = {
  // Get paginated list of calls
  getCalls: async (offset = 0, limit = 10): Promise<PaginatedCallsResponse> => {
    const response = await api.get<PaginatedCallsResponse>(`/calls?offset=${offset}&limit=${limit}`);
    return response.data;
  },
  
  // Get a specific call by ID
  getCall: async (id: string): Promise<Call> => {
    const response = await api.get<Call>(`/calls/${id}`);
    return response.data;
  },
  
  // Archive a call
  archiveCall: async (id: string): Promise<Call> => {
    const response = await api.put<Call>(`/calls/${id}/archive`);
    return response.data;
  },
  
  // Add a note to a call
  addNote: async (id: string, content: string): Promise<Call> => {
    const response = await api.post<Call>(`/calls/${id}/note`, { content });
    return response.data;
  },
};

export default api; 