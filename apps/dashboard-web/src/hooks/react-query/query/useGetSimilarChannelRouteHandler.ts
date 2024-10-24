import type { QueryOptions } from '@tanstack/query-core';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetSimilarChannelRouteHandler = (
  {
    keyword,
    tags,
    cluster,
    subscribers,
    channelId,
  }: {
    keyword: string[];
    tags: string[];
    cluster: number;
    subscribers: number;
    channelId?: string;
  },
  queryOptions?: QueryOptions,
): UseQueryResult<any> => {
  return useQuery(
    ['similar', { keyword, tags, cluster, subscribers, channelId }],
    () =>
      queryFn({
        keyword,
        tags,
        cluster,
        subscribers,
        channelId,
      }),
    {
      ...queryOptions,
      enabled: !!channelId,
    },
  );
};

export default useGetSimilarChannelRouteHandler;

const queryFn = async ({
  keyword,
  tags,
  cluster,
  subscribers,
  channelId,
}: {
  keyword: string[];
  tags: string[];
  cluster: number;
  subscribers: number;
  channelId?: string;
}): Promise<any> => {
  const response = await axios.post<any>('/api/similar', {
    keyword,
    tags,
    cluster,
    subscribers,
    channelId,
  });
  return response.data;
};
