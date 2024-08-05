const fetchCalls = async (token, offset = 0, limit = 50) => {
  try {
    let response = await fetch(`https://frontend-test-api.aircall.dev/calls?offset=${offset}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    
    if (response.status === 401) {
      console.warn('Token expired, attempting to refresh...');
      token = await refreshToken();
      response = await fetch(`https://frontend-test-api.aircall.dev/calls?offset=${offset}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch calls: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchCalls:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch('https://frontend-test-api.aircall.dev/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to refresh token: ${response.status} ${response.statusText} ${errorText}`);
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error in refreshToken:', error);
    throw error;
  }
};

export { fetchCalls };
