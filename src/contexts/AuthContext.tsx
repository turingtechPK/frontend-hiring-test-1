'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/api';
import { AuthState, LoginCredentials } from '../types';

// Create the context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
} | undefined>(undefined);

// Context provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  });

  // Check for existing auth on component mount
  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (accessToken && refreshToken) {
        // TODO: We could validate the token here if needed
        setAuthState({
          isAuthenticated: true,
          user: null, // We don't store user info in localStorage for security
          accessToken,
          refreshToken,
          loading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await authService.login(credentials);
      
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        loading: false,
        error: null,
      });
      
      // Redirect to calls page
      router.push('/calls');
    } catch {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Login failed. Please check your credentials.',
      }));
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
    });
    
    // Redirect to login page
    router.push('/login');
  };

  const contextValue = {
    authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext; 