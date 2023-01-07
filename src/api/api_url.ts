const API_URL = 'https://frontend-test-api.aircall.io';

export const AUTH_LOGIN = () => `${API_URL}/auth/login`;
export const GET_CALL = (offset: number, limit: number) =>
  `${API_URL}/calls?offset=${offset}&limit=${limit}`;
export const ARCHIVE_CALL = (id: string) => `${API_URL}/calls/${id}/archive`;
