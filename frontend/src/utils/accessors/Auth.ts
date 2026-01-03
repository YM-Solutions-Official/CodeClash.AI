import axiosInstance from "@/lib/axios";
import { AuthResponse, User } from "../types/auth";
import { useAuthStore } from "@/store/useAuthStore";

class AuthAccessor {
  /**
   * Create a guest account automatically
   */
  async createGuestAccount(): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/guest');
      
      if (response.data.success) {
        this.saveAuth(response.data.token, response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to create guest account');
    }
  }

  /**
   * Sign up with email and password
   */
  async signup(email: string, password: string, username: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signup', {
        email,
        password,
        username,
      });
      
      if (response.data.success) {
        this.saveAuth(response.data.token, response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      
      if (response.data.success) {
        this.saveAuth(response.data.token, response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  /**
   * Upgrade guest account to full account
   */
  async upgradeGuestAccount(email: string, password: string, username: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/upgrade', {
        email,
        password,
        username,
      });
      
      if (response.data.success) {
        this.saveAuth(response.data.token, response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Account upgrade failed');
    }
  }

  /**
   * Get current user from token
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await axiosInstance.get<{ user: User }>('/auth/me');
      return response.data.user;
    } catch (error) {
      // Token invalid or expired
      this.clearAuth();
      return null;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearAuth();
    window.location.href = '/';
  }

  /**
   * Save authentication data
   */
  private saveAuth(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update Zustand store
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setToken(token);
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear Zustand store
    useAuthStore.getState().clearAuth();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Check if user is guest
   */
  isGuest(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    try {
      const user = JSON.parse(userStr);
      return user.isGuest === true;
    } catch {
      return false;
    }
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Get stored user
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Initialize auth on app load
   */
  async initializeAuth(): Promise<void> {
    const token = this.getToken();
    
    if (!token) {
      // No token, create guest account
      await this.createGuestAccount();
      return;
    }

    // Verify token and get current user
    const user = await this.getCurrentUser();
    
    if (!user) {
      // Token invalid, create new guest account
      await this.createGuestAccount();
    }
  }
}

export const authAccessor = new AuthAccessor();