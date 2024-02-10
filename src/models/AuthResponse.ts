export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    username: string;
    id: string;
  };
};
