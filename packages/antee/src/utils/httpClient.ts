import axios, { AxiosInstance } from 'axios';
import { REACT_APP_API_URI } from 'configs/env.conf';

const httpClient: AxiosInstance = axios.create({
  baseURL: REACT_APP_API_URI,
  timeout: 120000, // Waiting 2m for request timeout
  headers: {
    'Cache-Control': 'no-cache',
  },
});

httpClient.interceptors.request.use(function handleRequest(reqConfig) {
  const configOverride = reqConfig;

  const token = localStorage.getItem('token');

  if (token) {
    configOverride.headers.Authorization = `Bearer ${token}`;
  }

  return configOverride;
});

export default httpClient;
