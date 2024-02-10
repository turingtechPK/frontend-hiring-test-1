import { LS_KEYS } from '@/constants';

export function getAccessToken() {
  return localStorage.getItem(LS_KEYS.accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem(LS_KEYS.refreshToken);
}

export function isAuthenticated() {
  const tokens = [getAccessToken(), getRefreshToken()];

  return tokens.every(Boolean);
}

export const getFormattedTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes ${remainingSeconds} seconds`;
};
