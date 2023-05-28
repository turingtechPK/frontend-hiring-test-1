/* 
  Service file that serve all api calling
*/

import axios from 'axios';
import StorageService from '../StorageService'

const API_TIMEOUT = 60000;

const BASE_URL = 'https://frontend-test-api.aircall.io'; 

export const apiClient = () => {

  const token = StorageService.instance.getAccessToken();

  // Dummy Condition, will remove with actual api
  let defaultOptions = !!token? {
    headers: {
      Authorization: token ? `Bearer ${token || null}` : '',
      'Content-Type': 'application/json'
    }
  }: {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request timeout
  defaultOptions = {
    ...defaultOptions,
    timeout: API_TIMEOUT
  }

  return {
    get: (url, options = {}) => (
      axios.get(
        `${BASE_URL}${url}`, 
        { ...defaultOptions, ...options }
      )
    ),
    post: (url, data, options = {}) => (
      axios.post(
        `${BASE_URL}${url}`, 
        data, 
        { ...defaultOptions, ...options }
      )
    ),
    put: (url, data, options = {}) => (
      axios.put(
        `${BASE_URL}${url}`, 
        data, 
        { ...defaultOptions, ...options }
      )
    ),
    delete: (url, options = {}) => (
      axios.delete(
        `${BASE_URL}${url}`, 
        { ...defaultOptions, ...options }
      )
    )
  };
};