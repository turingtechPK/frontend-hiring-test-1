export const setRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};
