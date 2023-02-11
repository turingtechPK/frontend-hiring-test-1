import { User } from "@/hooks/use-user";
import { notification } from "antd";
import {
  IconType,
  NotificationPlacement,
} from "antd/es/notification/interface";
import { secondsToMinutes } from "date-fns";
import jwtDecode from "jwt-decode";

export const getLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getAccessToken = () => {
  const user = getLocalStorageItem("user");
  let accessToken = "";
  if (user) {
    const { access_token } = JSON.parse(user) as User;
    accessToken = access_token;
  }

  return accessToken;
};

export const firstLetterUppercase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

type DecodeToken = {
  exp: number;
  iat: number;
  sub: string;
  username: string;
};

export const isTokenExpired = (accessToken: string) => {
  let decodedToken = jwtDecode<DecodeToken>(accessToken);
  return decodedToken.exp >= Date.now();
};

export const secondsToMinutesString = (seconds: number): string => {
  const minutes = secondsToMinutes(seconds);
  const remainingSeconds = seconds % 60;

  return `${minutes} minutes ${remainingSeconds} seconds`;
};
