import { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { ApiRouteResponse } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import type { Method } from 'axios';

import { apiBaseUrl } from '@/constants/dev';

import { myAxios } from './apiAxiosInstance';

export type ApiRouterResponse = ApiRouteResponse<typeof apiRouter>;

export const apiClient = initQueryClient(apiRouter, {
  baseUrl: apiBaseUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  api: async ({ path, method, headers, body }) => {
    const result = await myAxios.request({
      headers,
      method: method as Method,
      url: path,
      data: body,
    });
    return { status: result.status, body: result.data };
  },
});
