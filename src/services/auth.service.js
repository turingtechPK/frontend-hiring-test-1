import api from "./api";
import TokenService from "./token.service";

const login = (username, password) => {
  return api
    .post("/auth/login", {
      username,
      password
    })
    .then((response) => {
      if (response.data.access_token) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
