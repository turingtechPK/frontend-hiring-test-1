import { LOCAL_STORAGE_KEYS } from '../../constants/General';

export default class StorageService {
  static instance = null;

  // Constuctor
  constructor(storage) {
    this.localStorage = storage;
  }

  // Set Access Token
  setAccessToken(accessToken) {
    this.localStorage.setItem(
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      accessToken || null
    );
  }

  // Get Access Token
  getAccessToken() {
    try {
      const token = this.localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      return token;
    } catch (error) {
      return '';
    }
  }

  // Set Refresh Token
  setRefreshToken(token) {
    this.localStorage.setItem(
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
      token || null
    );
  }

  // Get Refresh Token
  getRefreshToken() {
    try {
      const token = this.localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      return token;
    } catch (error) {
      return '';
    }
  }

  // Set User Info
  setUserInfo(info) {
    this.localStorage.setItem(
      LOCAL_STORAGE_KEYS.USER_INFO,
      JSON.stringify(info || {})
    );
  }

  // Get User Info
  getUserInfo() {
    try {
      const info = this.localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO);
      return JSON.parse(info);
    } catch (error) {
      return '';
    }
  }

  deleteLoginData() {
    this.localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    this.localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    this.localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO);
    this.localStorage.removeItem(LOCAL_STORAGE_KEYS.PERMISSIONS);
  }
}