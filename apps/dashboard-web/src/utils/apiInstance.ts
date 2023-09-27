import axios from 'axios';

import { HTTP_BASE_URL } from '@/constants/http';

const isServer = typeof window === 'undefined';

export const apiInstance = axios.create({
  baseURL: HTTP_BASE_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value;

    if (token) {
      config.headers.Authorization = `${token}`;
      /**
       * config.headers['cookie'] = `refreshToken=${refreshToken}`;
       * 해당 부분 Cookie 도메인을 설정할 수 있으면 이렇게 수동으로 안넣어줘도 되지않을까 싶어서 주석처리를 진행하였습니다
       */
    }
  } else {
    const { getCookie } = await import('cookies-next');

    const token = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (token) {
      config.headers.Authorization = `${token}`;
      // config.headers['cookie'] = `refreshToken=${refreshToken}`;
    }
  }

  return config;
});

// accessToken 만료 시 에러핸들링 추가 예정  (verifyToken api 가 현재 미구현)
apiInstance.interceptors.response.use();
