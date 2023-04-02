import { login, startRefreshTimer } from "./authApi";
import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';

type LoginPayload = {
  username: string;
  password: string;
};

export const userLogin = (payload: LoginPayload) => async (dispatch: any) => {
  try {
    dispatch(loginRequest()); 
    const response = await login(payload);
    sessionStorage.setItem("access_token", response.data.access_token);
    sessionStorage.setItem("refresh_token", response.data.refresh_token);
    startRefreshTimer()
    dispatch(loginSuccess()); 
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const userLogout =()=>async(dispatch:any)=>{
  sessionStorage.clear();
  dispatch(logout());
}

