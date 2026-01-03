"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { authAccessor } from "@/utils/accessors";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setToken, setLoading, setInitialized, isInitialized } =
    useAuthStore();

  useEffect(() => {
    if (isInitialized) return;

    const initAuth = async () => {
      setLoading(true);

      try {
        // Check for existing token
        const token = authAccessor.getToken();
        const storedUser = authAccessor.getStoredUser();

        if (token && storedUser) {
          // Verify token is still valid
          const user = await authAccessor.getCurrentUser();

          if (user) {
            setUser(user);
            setToken(token);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, [isInitialized, setUser, setToken, setLoading, setInitialized]);

  return <>{children}</>;
}
