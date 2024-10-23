import { WEEKLY_TREND_KEYWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetWeeklyTrendKeyword = ({ limit }: { limit: number }) => {
  const queryResult = apiClient(1).hits.getKeywordThisWeekly.useQuery(
    WEEKLY_TREND_KEYWORD_KEY.list([{ limit }]),
    {
      query: {
        limit: limit.toString(),
      },
    },
  );

  return { ...queryResult, data: queryResult.data?.body.data };
};

export default useGetWeeklyTrendKeyword;
