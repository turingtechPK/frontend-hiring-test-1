import { useState, useEffect, ReactNode, FC } from "react";
import { AuthContext } from "@/components";
import { useMutation } from "@apollo/client";
import { AuthResponseType } from "@/lib/types";

import { REFRESH_TOKEN_MUTATION } from "@/api/mutation";

interface AuthProviderProps {
  children: ReactNode;
}

interface RefreshTokenData {
  refreshToken: AuthResponseType;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthResponseType["user"] | null>(null);
  const [token, setToken] = useState<AuthResponseType["access_token"] | null>(
    null
  );
  const [refreshToken] = useMutation<RefreshTokenData>(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken().then(({ data }) => {
        console.log(data?.refreshToken);
        if (data) {
          setAuthData(data.refreshToken);
        }
      });
    }, 1000 * 60 * 5); 

    return () => clearInterval(interval);
  }, [refreshToken]);

  const setAuthData = (data: AuthResponseType) => {
    setUser(data.user);
    setToken(data.access_token);
    sessionStorage.setItem("token", data.access_token);
  };

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
