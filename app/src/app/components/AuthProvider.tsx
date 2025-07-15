"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, refreshToken as apiRefreshToken } from "../services/api";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = "https://frontend-test-api.aircall.dev";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userStr = localStorage.getItem("user");
    if (token) setAccessToken(token);
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

 
  useEffect(() => {
    if (accessToken) localStorage.setItem("access_token", accessToken);
    else localStorage.removeItem("access_token");
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [accessToken, user]);

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      setAccessToken(data.access_token);
      setUser({ username: data.user?.username || username });
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  const refreshToken = async () => {
    if (!accessToken) return;
    try {
      const data = await apiRefreshToken(accessToken);
      setAccessToken(data.access_token);
      setUser({ username: data.user?.username || user?.username || "" });
    } catch (e) {
      logout();
    }
  };


  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(() => {
      refreshToken();
    }, 9 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
} 