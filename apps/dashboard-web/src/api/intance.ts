import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:8080',
  withCredentials: true,
});

const isServer = typeof window !== 'undefined';

instance.interceptors.request.use((config) => {
  if (isServer) return config;
  else if (config.headers) {
    config.headers.Authorization = localStorage.getItem('Authorization') ?? '';
  }
  return config;
});

instance.interceptors.response.use((response) => {
  if (isServer) return response;
  else if (response.headers['authorization']) {
    console.log(response);
    localStorage.setItem('Authorization', response.headers['authorization']);
  }
  return response;
});
export default instance;
