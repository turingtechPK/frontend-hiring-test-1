import React, { useState, useEffect } from "react";
import AuthContext  from "./AuthContext"
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN_MUTATION } from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log(storedToken)
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken().then(({ data }) => {
        console.log('refresh', data?.refreshToken);
        if (data) {
          setAuthData(data.refreshToken);
        }
      });
    }, 1000 * 60 * 5); //every 5 minutes 

    return () => clearInterval(interval);
  }, [refreshToken]);

  const setAuthData = (data) => {
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
