import type { AuthResponse, LoginCredentials, RegisterData } from "../types/entities/auth";
import type { User } from "../types/entities/user";
import { get, post, put, type ApiResponse } from "./Apis";

const endpoint = "/auth";


const AuthService = {
  
  login: async (credentials: LoginCredentials): ApiResponse<AuthResponse> => 
    post<AuthResponse>(`${endpoint}/login`, credentials).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response;
    }),
    
  register: async (data: RegisterData): ApiResponse<AuthResponse> => 
    post<AuthResponse>(`${endpoint}/register`, data).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response;
    }),
    
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },
    
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
    
  getCurrentUser: (): ApiResponse<User> => 
    get<User>(`${endpoint}/me`),
    
  updateProfile: (data: Partial<User>): ApiResponse<User> => 
    put<User>(`${endpoint}/profile`, data),
    
  refreshToken: (): ApiResponse<{ token: string }> => {
    const refreshToken = localStorage.getItem('refreshToken');
    return post<{ token: string }>(`${endpoint}/refresh-token`, { refreshToken });
  },
    
  forgotPassword: (email: string): ApiResponse<{ message: string }> => 
    post<{ message: string }>(`${endpoint}/forgot-password`, { email }),
    
  resetPassword: (token: string, newPassword: string): ApiResponse<{ message: string }> => 
    post<{ message: string }>(`${endpoint}/reset-password`, { token, newPassword })
};

export default AuthService;