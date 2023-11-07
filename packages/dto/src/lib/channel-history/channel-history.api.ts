import { z } from 'zod';
import { c } from '../contract';

export const expectedViewsApiUrl = '/expected-views';

export const expectedViewsApi = c.router({
  getExpectedViews: {
    method: 'GET',
    path: `${expectedViewsApiUrl}/:clusterNumber`,
    pathParams: z.object({
      clusterNumber: z.string(),
    }),
    query: z.object({
      keyword: z.string(),
      relationKeyword: z.string().optional(),
      from: z.string(),
      to: z.string(),
    }),
    responses: {
      200: 'OK',
      401: 'Not Found',
      500: '서버에 문제가 있으면 리턴한다.',
    },
    summary: '기대 조회수를 가져옵니다',
    description:
      '클러스터 번호(clusterNumber),탐색어(keyword),연관어(relationKeyword), 날짜(from,to)로 기대 조회수 를 출력합니다.',
  },
});
