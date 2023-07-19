import axios from 'axios';

import { apiBaseUrl } from '@/constants/dev';

export const myAxios = axios.create({
  baseURL: apiBaseUrl,
  // withCredentials: true,
});
