"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login, logout as logoutApi, refreshToken } from "@/lib/auth";
import { TOKEN_REFRESH_INTERVAL } from "@/constants";

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTimerId, setRefreshTimerId] = useState<NodeJS.Timeout | null>(
    null
  );

  const setupRefreshTimer = () => {
    if (refreshTimerId) {
      clearInterval(refreshTimerId);
    }

    const timerId = setInterval(async () => {
      try {
        if (localStorage.getItem("access_token")) {
          const userData = await refreshToken();
          setUser(userData);
        }
      } catch {
        logout();
      }
    }, TOKEN_REFRESH_INTERVAL);

    setRefreshTimerId(timerId);
    return timerId;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const userData = await refreshToken();
          setUser(userData);

          setupRefreshTimer();
        }
      } catch {
        localStorage.removeItem("access_token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (refreshTimerId) {
        clearInterval(refreshTimerId);
      }
    };
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      setLoading(true);
      const userData = await login(username, password);
      setUser(userData);

      setupRefreshTimer();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);

    if (refreshTimerId) {
      clearInterval(refreshTimerId);
      setRefreshTimerId(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
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
