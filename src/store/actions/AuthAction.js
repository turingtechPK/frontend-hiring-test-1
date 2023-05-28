// Service
import service from '../../services/Api/Service';
import StorageService from '../../services/StorageService';

// Constatns
import { USER_ACTIONS } from '../../constants/ActionKeys';
import { API_URLS } from '../../constants/ApiUrl';
import { STATUS_CODES } from '../../constants/General';

// General
import { request, success, failure } from './index';

function login(loginModel) {

  return async (dispatch) => {
    try {

      dispatch(request(USER_ACTIONS.LOGIN_REQUEST));

      // API Calling
      const response = await service.postService(
        API_URLS.AUTHENTICATE.LOGIN,
        loginModel
      );

      if(response?.status=== STATUS_CODES.SUCCESS || response?.status === STATUS_CODES.SUCCESS_2){

        // Save Access Token
        const token = response?.data?.access_token || null;
        StorageService.instance?.setAccessToken(token);
  
        // Save User Info
        StorageService.instance?.setUserInfo(response?.data?.user || {});
  
        dispatch(success(USER_ACTIONS.LOGIN_SUCCESS, response));
      }
      else{
        dispatch(failure(USER_ACTIONS.LOGIN_FAILURE));
      }

      return response;
      
    } catch (error) {
      dispatch(failure(USER_ACTIONS.LOGIN_FAILURE));
      throw error;
    }
  };
}

function logout() {
  return async (dispatch) => {
    try {
      dispatch(request(USER_ACTIONS.LOGOUT_REQUEST));
      await StorageService.instance?.deleteLoginData();
      dispatch(success(USER_ACTIONS.LOGOUT_SUCCESS));
    } catch (error) {
      dispatch(failure(USER_ACTIONS.LOGOUT_FAILURE, error));
      throw error;
    }
  };
}

export {
  login,
  logout
};
