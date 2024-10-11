import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import { ANALYSIS_CHANNEL_LIST_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useAddAnalysisChannel = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.channel.registerChannelAnalysis,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(
    1,
  ).channel.registerChannelAnalysis.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(ANALYSIS_CHANNEL_LIST_KEY.all);
    },
  });

  return {
    ...mutationResult,
    mutate: (channelId: string) =>
      mutationResult.mutate({
        body: { registeredChannelId: channelId },
      }),
  };
};

export default useAddAnalysisChannel;
