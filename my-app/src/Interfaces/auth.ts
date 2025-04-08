export interface authResponse {
    access_token: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  }