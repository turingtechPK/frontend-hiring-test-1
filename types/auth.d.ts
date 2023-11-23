type UserType = {
  id: string | null;
  username: string | null;
};

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: UserType;
}

interface LoginCredentials {
  username: string;
  password: string;
}

type LoginAction = PayloadAction<any>;
