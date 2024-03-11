import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';
import { DeepRequired } from 'react-hook-form';

const useGetStoryBoard = (storyBoardId: string) => {
  const queryResult = apiClient(1).storyBoard.getOneStoryBoard.useQuery(
    [STORYBOARD_KEY.detail([{ id: storyBoardId }])],
    {
      param: { storyBoardId: storyBoardId },
    },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body,
  };
};

export default useGetStoryBoard;
