export const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const ENDPOINTS = {
  // Get endpoints
  calls: (offset: number, limit: number) => `/calls?offset=${offset}&limit=${limit}`,
  call: (id: string) => `/calls/${id}`,
  user: '/me',

  // Post endpoints
  login: '/auth/login',
  refreshToken: '/auth/refresh-token',

  createNote: (callId: string) => `/calls/${callId}/note`,

  // Put endpoints
  archive: (callId: string) => `/calls/${callId}/archive`,
};
