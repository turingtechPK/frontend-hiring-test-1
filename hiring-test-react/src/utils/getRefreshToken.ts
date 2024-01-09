export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};
