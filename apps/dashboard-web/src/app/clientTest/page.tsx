'use client';

import { z } from 'zod';

import { apiClient } from '@/utils/apiClient';

export default function clientTest() {
  // const { data, isLoading } = apiClient.dailyViews.getDailyViews.useQuery(
  //   ['daily'],
  //   {
  //     query: { from: 'string', to: 'string' },
  //     params: { relationKeyword: 'string' },
  //   },
  // );

  const { data, isLoading } = apiClient.user.getUser.useQuery(['user'], {
    query: {
      search: 'mini',
    },
    params: {
      id: '1',
    },
  });
  if (!isLoading) console.log('data', data);

  return (
    <>
      <div>{!isLoading && <p>current userData: {String(data?.body)}</p>}</div>
      <div>clientTest</div>
    </>
  );
}
