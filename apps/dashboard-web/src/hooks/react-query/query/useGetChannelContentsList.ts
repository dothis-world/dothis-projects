import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { CHANNEL_CONTENTS_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetChannelContentsList = (
  { channelId }: { channelId: string },
  queryOptions?: UseQueryOptions<
    typeof apiRouter.channel.getRegisterChannelContentList
  >,
) => {
  const queryResult = apiClient(
    1,
  ).channel.getRegisterChannelContentList.useQuery(
    CHANNEL_CONTENTS_KEY.list([{ channelId }]),
    {
      query: {
        channelId,
      },
    },

    { ...queryOptions, enabled: !!channelId },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body,
  };
};

export default useGetChannelContentsList;
