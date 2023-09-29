import axios from 'axios';

import { HTTP_BASE_URL } from '@/constants/http';

const isServer = typeof window === 'undefined';

export const apiInstance = axios.create({
  baseURL: HTTP_BASE_URL,
  withCredentials: true,
});
//코드는 전혀 쓸모가 없음 코드 실행 시점이 불분명함
apiInstance.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies, headers } = await import('next/headers');

      const token = cookies().get('accessToken')?.value;
      const refreshToken = cookies().get('refreshToken')?.value;
      console.log('apiInstance', token, refreshToken);

      if (token && refreshToken) {
        config.headers.Authorization = `${token}`;
        config.headers.Cookie = refreshToken;
        /**
         * config.headers['cookie'] = `refreshToken=${refreshToken}`;
         * 해당 부분 Cookie 도메인을 설정할 수 있으면 이렇게 수동으로 안넣어줘도 되지않을까 싶어서 주석처리를 진행하였습니다
         */
      }
    } else {
      const { getCookie } = await import('cookies-next');

      const token = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      console.log('apiInstance cookies-next', token, refreshToken);
      if (token) {
        config.headers.Authorization = `${token}`;
        config.headers.Cookie = refreshToken;
      }
    }

    return config;
  },
  (err) => Promise.reject(err),
);

// accessToken 만료 시 에러핸들링 추가 예정  (verifyToken api 가 현재 미구현)
apiInstance.interceptors.response.use();
