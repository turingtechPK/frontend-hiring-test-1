"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { decodeJWT } from "./auth-utils"

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  makeAuthenticatedRequest: (endpoint: string, options?: RequestInit) => Promise<Response>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  // Check if token is expired
  const isTokenExpired = useCallback((token: string): boolean => {
    const decoded = decodeJWT(token)
    if (!decoded || !decoded.exp) return true
    return decoded.exp < Date.now() / 1000
  }, [])

  // Initialize token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token")
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken)
    } else {
      // Clear invalid/expired token
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
  }, [isTokenExpired])

  // Login function
  const login = useCallback(
    async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
          return { success: false, error: "Invalid username or password" }
        }

        const data = await response.json()

        // Store tokens and user data
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("refresh_token", data.refresh_token)
        localStorage.setItem("user", JSON.stringify(data.user))

        setToken(data.access_token)
        return { success: true }
      } catch (error) {
        return { success: false, error: "Login failed" }
      }
    },
    [],
  )

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    setToken(null)
    router.push("/login")
  }, [router])

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<string | null> => {
    const refreshTokenValue = localStorage.getItem("refresh_token")
    if (!refreshTokenValue) return null

    try {
      const response = await fetch("https://frontend-test-api.aircall.dev/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshTokenValue}`,
        },
      })

      if (!response.ok) {
        logout()
        return null
      }

      const data = await response.json()
      const newToken = data.access_token

      localStorage.setItem("access_token", newToken)
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token)
      }

      setToken(newToken)
      return newToken
    } catch (error) {
      console.error("Token refresh failed:", error)
      logout()
      return null
    }
  }, [logout])

  // Make authenticated request
  const makeAuthenticatedRequest = useCallback(
    async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
      let currentToken = token || localStorage.getItem("access_token")

      if (!currentToken) {
        router.push("/login")
        throw new Error("No token available")
      }

      // Check if token is expired and try to refresh
      if (isTokenExpired(currentToken)) {
        currentToken = await refreshToken()
        if (!currentToken) {
          throw new Error("Authentication failed")
        }
      }

      const response = await fetch(`https://frontend-test-api.aircall.dev${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
          ...options.headers,
        },
      })

      if (response.status === 401) {
        // Try to refresh token once more
        const newToken = await refreshToken()
        if (!newToken) {
          throw new Error("Authentication failed")
        }

        // Retry the request with new token
        return fetch(`https://frontend-test-api.aircall.dev${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
            ...options.headers,
          },
        })
      }

      return response
    },
    [token, isTokenExpired, refreshToken, router],
  )

  const contextValue: AuthContextType = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
    makeAuthenticatedRequest,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
