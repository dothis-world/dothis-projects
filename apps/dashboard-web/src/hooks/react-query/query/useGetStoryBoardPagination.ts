import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';
import { DeepRequired } from 'react-hook-form';

const useGetStoryBoardPagination = ({
  page,
  offset,
  sortField,
  sortOption,
}: {
  // limit: number,
  page: number;
  offset?: string;
  sortField?: string;
  sortOption?: 'asc' | 'desc';
}) => {
  const queryResults = apiClient(1).storyBoard.getManyStoryBoard.useQuery(
    STORYBOARD_KEY.list([
      {
        page: page,
      },
    ]),
    {
      params: {
        limit: String(10),
        page: page,
        offset: offset ?? String(0),
        filed: sortField,
        param: sortOption ?? 'asc',
      },
    },
  );

  const requiredQueryResult = queryResults.data as DeepRequired<
    typeof queryResults.data
  >;

  return {
    ...queryResults,
    data: requiredQueryResult?.body,
  };
};

export default useGetStoryBoardPagination;
