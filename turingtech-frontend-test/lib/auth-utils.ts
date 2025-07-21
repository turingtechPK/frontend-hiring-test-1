export interface DecodedToken {
  username?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function decodeJWT(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = parts[1];
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const decodedPayload = atob(paddedPayload.replace(/-/g, "+").replace(/_/g, "/"));

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export function getCurrentUser(): {
  username: string | null;
  isAuthenticated: boolean;
} {
  if (typeof window === "undefined") {
    return { username: null, isAuthenticated: false };
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    return { username: null, isAuthenticated: false };
  }

  const decoded = decodeJWT(token);
  if (!decoded) {
    return { username: null, isAuthenticated: false };
  }

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp && decoded.exp < currentTime) {
    return { username: null, isAuthenticated: false };
  }

  return {
    username: decoded.username || null,
    isAuthenticated: true,
  };
}

// Simple hook to get user info from localStorage
export function useUser() {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}
