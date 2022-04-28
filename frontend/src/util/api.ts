import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: backendUrl,
});

export default api;
