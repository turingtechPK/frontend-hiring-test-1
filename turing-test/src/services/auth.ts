import { User } from "@/hooks/use-user";
import BaseAPI from "./base-api";

export const AUHT_ROUTES = {
  login: "/auth/login",
  refreshToken: "/auth/refresh-token",
};

export namespace authService {
  export const login = (username: string, password: string) => {
    return BaseAPI.post<User>(AUHT_ROUTES.login, {
      username,
      password,
    });
  };

  export const refreshToken = () => {
    return BaseAPI.post<User>(AUHT_ROUTES.refreshToken, {});
  };
}
