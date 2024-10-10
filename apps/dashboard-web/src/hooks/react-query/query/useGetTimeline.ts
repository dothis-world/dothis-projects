import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import {
  ANALYSIS_CHANNEL_LIST_KEY,
  CHANNEL_LIST_KEY,
  CHANNEL_TIMELINE_KEY,
} from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetTimeline = (
  { channelId }: { channelId: string },
  queryOptions?: UseQueryOptions<typeof apiRouter.channel.getVideoTimeline>,
) => {
  const queryResult = apiClient(1).channel.getVideoTimeline.useQuery(
    CHANNEL_TIMELINE_KEY.list([{ channelId }]),
    {
      query: {
        channelId,
      },
    },

    { ...queryOptions, enabled: !!channelId },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetTimeline;
