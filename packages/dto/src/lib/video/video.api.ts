import { z } from 'zod';
import { c } from '../contract';

export const videoBaseApiUrl = '/video';

export const videoApi = c.router({
  getVideo: {
    method: 'GET',
    path: `${videoBaseApiUrl}`,
    pathParams: videoBaseApiUrl,
    responses: {
      200: 'video 튜플',
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
    description: '관련어와 탐색어를 기준으로 비디오를 가져옵니다.',
  },
});
