import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';
import { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import { ClientArgs } from '@ts-rest/core';
import { UseMutationOptions } from '@ts-rest/react-query';

export const useCreateStoryBoardMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.createStoryBoard,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).storyBoard.createStoryBoard.useMutation({
    ...mutationOptions,
    onSuccess: (item) => {
      queryClient.invalidateQueries(STORYBOARD_KEY.all);
      console.log('useCreateStoryBoardMutation mutate', item.body.data);
    },
  });

  return { ...mutationResult };
};

export const useUpdateStoryBoardTitleMutation = (
  storyBoardId: string,
  title: string,
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.updateStoryBoardTitle,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(
    1,
  ).storyBoard.updateStoryBoardTitle.useMutation({
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(
        STORYBOARD_KEY.detail([{ id: storyBoardId }]),
      );
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          value: title,
        },
      }),
  };
};

export const useUpdateStoryBoardOverviewMutation = (
  // storyBoardId: string,
  description: string,
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.addStoryBoardOverviews,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(
    1,
  ).storyBoard.updateStoryBoardTitle.useMutation({
    ...mutationOptions,
    onSuccess: () => {
      // detail
      queryClient.invalidateQueries(STORYBOARD_KEY.all);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          description: description,
        },
      }),
  };
};
