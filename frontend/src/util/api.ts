import axios from 'axios';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('authToken');
    }

    Promise.reject(error);
  },
);

export default api;
