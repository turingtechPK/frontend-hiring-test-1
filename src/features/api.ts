import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { BASE_URL, ENDPOINTS } from '@/config/endpoints';
import { ApiErrorResponseSchema, LS_KEYS } from '@/constants';
import { type AuthResponse, Call, CallsResponse, type LoginFormData } from '@/models';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LS_KEYS.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.request?.status !== 401) {
        const parsedError = ApiErrorResponseSchema.safeParse(error.response?.data);
        if (parsedError.success) {
          const msg = parsedError.data.message;
          if (Array.isArray(msg)) {
            enqueueSnackbar(msg.join(', '), { variant: 'error' });
          } else {
            enqueueSnackbar(msg, { variant: 'error' });
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export const loginAsync = async (data: LoginFormData) => {
  const response = await api.post<AuthResponse>(ENDPOINTS.login, data);

  const { access_token, refresh_token } = response.data;
  localStorage.setItem(LS_KEYS.accessToken, access_token);
  localStorage.setItem(LS_KEYS.refreshToken, refresh_token);

  return response.data;
};

export const refreshTokenAsync = async () => {
  const response = await api.post<AuthResponse>(ENDPOINTS.refreshToken);

  const { access_token, refresh_token } = response.data;
  localStorage.setItem(LS_KEYS.accessToken, access_token);
  localStorage.setItem(LS_KEYS.refreshToken, refresh_token);

  return response.data;
};

export const getCallsAsync = async (offset: number, refreshToken = false): Promise<CallsResponse | null> => {
  if (refreshToken) {
    await refreshTokenAsync();
  }

  try {
    const response = await api.get<CallsResponse>(ENDPOINTS.calls(offset, 10));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401 && !refreshToken) {
        return getCallsAsync(offset, true);
      }
    }
    return null;
  }
};

export const archiveCallAsync = async (callId: string, refreshToken = false): Promise<Call | null> => {
  if (refreshToken) {
    await refreshTokenAsync();
  }

  try {
    const response = await api.put<Call>(ENDPOINTS.archive(callId));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401 && !refreshToken) {
        return archiveCallAsync(callId, true);
      }
    }
    return null;
  }
};

export const addNoteAsync = async (callId: string, content: string, refreshToken = false): Promise<Call | null> => {
  if (refreshToken) {
    await refreshTokenAsync();
  }

  try {
    const response = await api.post<Call>(ENDPOINTS.createNote(callId), { content });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401 && !refreshToken) {
        return addNoteAsync(callId, content, true);
      }
    }
    return null;
  }
};
