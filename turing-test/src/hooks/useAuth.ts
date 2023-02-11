import { useEffect } from "react";
import { useUser, User } from "@/hooks/use-user";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { authService } from "@/services/auth";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    let intervalId: string | NodeJS.Timer = "";
    if (user) {
      addUser(JSON.parse(user));
      intervalId = setInterval(async () => {
        const { data } = await authService.refreshToken();
        login(data);
      }, 300000);
    }

    return () => clearInterval(intervalId);
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
