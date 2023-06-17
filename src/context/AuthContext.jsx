import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  setAuthData: () => {},
  clearAuthData: () => {},
});

export default AuthContext;