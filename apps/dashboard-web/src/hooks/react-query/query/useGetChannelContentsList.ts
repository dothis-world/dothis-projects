import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import type { VideoSort } from '@/app/(keyword)/channel/competitive-analysis/VideoFilterContext';
import { CHANNEL_CONTENTS_KEY } from '@/constants/querykey';
import type { SortingQuery } from '@/types/common';
import { apiClient } from '@/utils/api/apiClient';

const useGetChannelContentsList = (
  {
    channelId,
    startDate,
    sort,
    order,
  }: { channelId: string; startDate?: string } & Partial<
    SortingQuery<VideoSort>
  >,
  queryOptions?: UseQueryOptions<
    typeof apiRouter.channel.getRegisterChannelContentList
  >,
) => {
  const queryResult = apiClient(
    1,
  ).channel.getRegisterChannelContentList.useQuery(
    CHANNEL_CONTENTS_KEY.list([{ channelId, startDate, order, sort }]),
    {
      query: {
        channelId,
        from: startDate,
        sort: sort,
        order: order,
      },
    },

    { ...queryOptions, enabled: !!channelId },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetChannelContentsList;
