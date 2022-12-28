import axios from 'axios'
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
})

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const token = TokenService.getLocalAccessToken();

const instance2 = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

instance.interceptors.request.use(async config => {
  const decodedJwt = parseJwt(token);
  if (token && (decodedJwt.exp * 1000 - (Date.now()) <=  240000  ) && !config._retry) {
    const response = await instance2.post(`/auth/refresh-token`)

    console.log('response ', response)
    const { access_token } = response.data;
    TokenService.updateLocalAccessToken(access_token);
    config.headers['Authorization'] = 'Bearer ' + access_token;
    return config;
  } else {
    // access token is still valid, add it to the request headers
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  }
});

export default instance;
