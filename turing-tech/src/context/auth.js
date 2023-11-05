import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql";
import { setAccessToken } from "../apollo-client/cache";

export const AuthContext = createContext({
  user: null,
  signUp: () => {},
  removeUser: () => {},
  signedIn: null,
  setSignedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [loginUser, { data: userData, loading: userLoading, error }] =
    useMutation(LOGIN);
  const navigate = useNavigate();
  const [_1, setUser] = useLocalStorage("user-data");
  const [_2, storeAccessToken] = useLocalStorage("access-token");

  useEffect(() => {
    if (!userLoading && !error && userData) {
      updateStore();
      navigate("/");
    }
  }, [userData, userLoading]);

  const updateStore = () => {
    setUser(userData?.login?.user);
    storeAccessToken(userData?.login?.access_token);
    setAccessToken(userData?.login?.access_token);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ updateStore, loginUser, userData, userLoading }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
