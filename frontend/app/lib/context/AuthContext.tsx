"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { getCookie, clearAuthCookies } from "@/app/lib/cookies";

export type Role = "donor" | "ngo" | "admin" | string;

interface AuthUser {
  role: Role | null;
  userId: string | null;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Reads the same "token" / "role" / "userId" cookies that
  // donor.actions.ts and ngo.actions.ts already write on login.
  const checkAuth = useCallback(() => {
    try {
      const token = getCookie("token");
      const role = getCookie("role");
      const userId = getCookie("userId");

      setIsAuthenticated(!!token);
      setUser(token ? { role, userId } : null);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = () => {
    clearAuthCookies();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
