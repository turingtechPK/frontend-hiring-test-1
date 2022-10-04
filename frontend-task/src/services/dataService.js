import axios from 'axios';
import AppConstants from '../constants/AppConstants';

const api = axios.create({baseURL: AppConstants.baseURL});

export default api;