import { createContext } from "react";
import { AuthResponseType } from '@/lib/types';

interface AuthContextType {
  user: AuthResponseType['user'] | null;
  token: AuthResponseType['access_token'] | null;
  setAuthData: (data: AuthResponseType) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setAuthData: () => {},
  clearAuthData: () => {},
});


export default AuthContext;