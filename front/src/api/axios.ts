import axios from 'axios';
import { getTokenFromLocalStorage } from '../shared/utils/local-storage';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api', // .env
  headers: {
    'Content-Type': 'application/json', // helper
  },
});

api.interceptors.request.use(config => {
  const accessToken = getTokenFromLocalStorage();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
