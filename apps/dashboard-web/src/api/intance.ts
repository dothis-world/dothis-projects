import axios from 'axios';

import LocalStorage from '@/utils/localstorage/LocalStorage';

const instance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BASE_URL'],
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = LocalStorage.getItem('Authorization') ?? '';
  }
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.headers['authorization']) {
    LocalStorage.setItem('Authorization', 'item');
  }
  return response;
});
export default instance;
