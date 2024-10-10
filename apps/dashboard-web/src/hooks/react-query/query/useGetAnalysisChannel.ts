import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import {
  ANALYSIS_CHANNEL_LIST_KEY,
  CHANNEL_LIST_KEY,
} from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetAnalysisChannel = (
  queryOptions?: UseQueryOptions<
    typeof apiRouter.channel.getRegisterChannelAnalysis
  >,
) => {
  const queryResult = apiClient(1).channel.getRegisterChannelAnalysis.useQuery(
    ANALYSIS_CHANNEL_LIST_KEY.all,
    {},
    {
      ...queryOptions,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetAnalysisChannel;
