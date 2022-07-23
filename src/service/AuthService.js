import MainApi from "./MainApi";
import TokenService from "./TokenService";

const login = () => {
  return MainApi.post("auth/login", {
    username: "hirakhan",
    password: "hira.123",
  }).then((response) => {
    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  login,
  getCurrentUser,
};
export default AuthService;
