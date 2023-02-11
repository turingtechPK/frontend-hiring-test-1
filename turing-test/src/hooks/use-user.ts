import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useLocalStorage } from "./use-localstorage";

export interface User {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const removeUser = () => {
    setItem("user", "");
    setUser(null);
  };

  return { user, addUser, removeUser };
};
