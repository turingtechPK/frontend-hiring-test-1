const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}
