import axios from 'axios';
import { useCookies } from 'react-cookie';

const BASE_URL = 'https://frontend-test-api.aircall.io/'

export default axios.create({ baseURL: BASE_URL });