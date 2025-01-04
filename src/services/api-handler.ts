import axios from 'axios';
import { API_URL } from '../config/index.ts';

const apiHandler = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiHandler;
