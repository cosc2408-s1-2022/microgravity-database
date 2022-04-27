import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: backendUrl,
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
    Promise.reject(error);
  },
);

export default api;
