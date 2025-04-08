import { useDispatch, useSelector } from 'react-redux';
import { login, logout, refreshToken } from '../store/slices/authSlice';
import { login as loginApi, refreshToken as refreshTokenApi } from '../api/authApi';
import { RootState } from '../store/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  const loginUser = async (username: string, password: string) => {
    try {
      const data = await loginApi(username, password);
      dispatch(login({ token: data.access_token, username: data.user.username }));
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('username', data.user.username); 
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  const refreshUserToken = async (accessToken: string) => {
    try {
      const data = await refreshTokenApi(accessToken);
      dispatch(refreshToken(data.access_token));
    } catch (error) {
      console.error('Token refresh failed', error);
    }
  };

  return { loginUser, logoutUser, refreshUserToken, username };
};
