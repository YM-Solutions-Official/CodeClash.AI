import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    username?: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    signupWithGoogle: () => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    checkAuth: () => Promise<void>;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    username?: string;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('http://localhost:8080/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Login failed');
                    }

                    const data = await response.json();

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Login failed';
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false,
                        user: null,
                        token: null
                    });
                    throw error;
                }
            },

            loginWithGoogle: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('http://localhost:8080/api/auth/google/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Google login failed');
                    }

                    const data = await response.json();

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Google login failed';
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false
                    });
                    throw error;
                }
            },

            signup: async (data) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('http://localhost:8080/api/auth/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Signup failed');
                    }

                    const responseData = await response.json();

                    set({
                        user: responseData.user,
                        token: responseData.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false,
                        user: null,
                        token: null
                    });
                    throw error;
                }
            },

            signupWithGoogle: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await fetch('http://localhost:8080/api/auth/google/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Google signup failed');
                    }

                    const data = await response.json();

                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    });
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Google signup failed';
                    set({
                        isLoading: false,
                        error: errorMessage,
                        isAuthenticated: false
                    });
                    throw error;
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    error: null
                });

                fetch('http://localhost:8080/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${get().token}`
                    }
                }).catch(console.error);
            },

            setUser: (user) => set({ user, isAuthenticated: true }),

            setToken: (token) => set({ token }),

            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            checkAuth: async () => {
                const token = get().token;

                if (!token) {
                    set({ isAuthenticated: false, user: null });
                    return;
                }

                try {
                    const response = await fetch('http://localhost:8080/api/auth/verify', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Token invalid');
                    }

                    const data = await response.json();
                    set({
                        user: data.user,
                        isAuthenticated: true
                    });
                } catch (error) {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false
                    });
                }
            },
        }),
        {
            name: 'codeclash-auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthToken = () => useAuthStore((state) => state.token);