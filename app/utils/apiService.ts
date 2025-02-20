const BASE_URL = "https://frontend-test-api.aircall.dev";

export const api = {
  // 🔹 Login Function
  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    return data;
  },

  // 🔹 Refresh Token Function
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // Redirect if refresh fails
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    return data.access_token;
  },

  // 🔹 General API Request Handler (Handles Token Expiry)
  createApiRequest: async (requestFn: () => Promise<any>) => {
    try {
      return await requestFn();
    } catch (error) {
      if (error instanceof Error && error.message.includes("401")) {
        try {
          const newAccessToken = await api.refreshToken(); // Refresh token
          return await requestFn(); // Retry the request
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          throw refreshError;
        }
      }
      throw error;
    }
  },

  // 🔹 Get Calls (Paginated)
  getCalls: async (offset = 0, limit = 10) => {
    return api.createApiRequest(async () => {
      const response = await fetch(`${BASE_URL}/calls?offset=${offset}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      const text = await response.text(); // Read response as text first
      try {
        return JSON.parse(text); // Parse JSON manually
      } catch (error) {
        console.error("Invalid JSON response:", text);
        throw new Error("Failed to parse JSON response");
      }
    });
  },
  

  // 🔹 Get Single Call Details
  getCall: async (id: string) => {
    return api.createApiRequest(async () => {
      const response = await fetch(`${BASE_URL}/calls/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.json();
    });
  },

  // 🔹 Add a Note to a Call
  addNote: async (callId: string, content: string) => {
    return api.createApiRequest(async () => {
      const response = await fetch(`${BASE_URL}/calls/${callId}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      return response.json();
    });
  },

  // 🔹 Toggle Archive Status of a Call
  toggleArchive: async (callId: string) => {
    return api.createApiRequest(async () => {
      const response = await fetch(`${BASE_URL}/calls/${callId}/archive`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.json();
    });
  },

  // 🔹 Logout Function (Clears Tokens)
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/"; // Redirect to login
  },

  // 🔹 Check If User Is Logged In
  isLoggedIn: () => {
    return !!localStorage.getItem("accessToken");
  },
};
