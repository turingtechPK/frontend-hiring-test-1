import {
  performGetRequest,
  performPostRequest,
  performPutRequest,
} from "./network-service";
import { PATHS } from "../../app-config";

const BASE_URL = PATHS.BASE_URL;

const API_PATHS = {
  loginPath: `${BASE_URL}/auth/login`,
  refreshTokenPath: `${BASE_URL}/auth/refresh-token`,
  callsPath: (offset, limit) =>
    offset && limit
      ? `${BASE_URL}/calls?offset=${offset}&limit${limit}`
      : `${BASE_URL}/calls`,
  callPath: (id) => `${PATHS.BASE_URL}/calls/${id}`,
  userInfo: `${BASE_URL}/me`,
  notePath: (id) => `${BASE_URL}/calls/${id}/note`,
  archivePath: (id) => `${BASE_URL}/calls/${id}/archive`,
};

export const loginAPICall = async (data) => {
  try {
    const response = await performPostRequest(API_PATHS.loginPath, data, "");
    return response;
  } catch (error) {
    console.error("Error", error.message);
    return { error: true };
  }
};

export const getCalls = async (offset = "", limit = "", token) => {
  try {
    const response = await performGetRequest(
      API_PATHS.callsPath(offset, limit),
      token
    );
    return {
      calls: response.data.nodes,
      count: response.data.totalCount,
      hasNext: response.data.hasNextPage,
    };
  } catch (error) {
    console.error("Error", error.message);
    return { error: true };
  }
};

export const getCallDetails = async (id, token) => {
  try {
    const response = await performGetRequest(API_PATHS.callPath(id), token);
    return response;
  } catch (error) {
    console.error("Error", error.message);
    return { error: true };
  }
};

export const getUserDetail = async (token) => {
  try {
    const response = await performGetRequest(API_PATHS.userInfo, token);
    return response;
  } catch (error) {
    console.error("Error", error.message);
    return { error: true };
  }
};

export const addNote = async (id, note, token) => {
  try{
    const response = await performPostRequest(API_PATHS.notePath(id), note, token);
    if(!response.error){
      return response;
    }else{
      return { error: true }
    }
  }catch(error){
    console.error("Error", error.message);
    return { error: true };
  }
}

export const archiveCall = async (id, token) => {
  try{
    const response = await performPutRequest(API_PATHS.archivePath(id), "", token);
    if(!response.error){
      return response;
    }else{
      return { error: true }
    }
  }catch(error){
    console.error("Error", error.message);
    return { error: true };
  }
} 

export const getRefreshToken = async (token) => {
  try {
    const response = await performPostRequest(API_PATHS.refreshTokenPath, {}, token);
    return response;
  } catch (error) {
    console.error("Error", error.message);
    return { error: true };
  }
};
