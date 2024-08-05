// src/api/auth.js
export const login = async (username, password) => {
    const response = await fetch('https://frontend-test-api.aircall.dev/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to login');
    }
  
    const data = await response.json();
    return data.access_token;
  };
  
  // You can also add the refreshToken function if needed
  export const refreshToken = async (token) => {
    const response = await fetch('https://frontend-test-api.aircall.dev/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
  
    const data = await response.json();
    return data.access_token;
  };
  