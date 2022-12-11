export const getApiHeaders = (accessToken) => ({
  "Content-Type": "application/json",
  "Accept-Language": "en",
  Authorization: accessToken ? `Bearer ${accessToken}` : null,
});
