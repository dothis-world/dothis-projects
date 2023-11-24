import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetVideoCount = () => {
  const selectedRelWord = useSelectedRelWord();
  const { data } = useGetRelWords();

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(1).video.getAccVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: VIDEO_COUNT_KEY.list([
          { clusterNumber, relword: selectedRelWord, keyword: data?.keyword },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-11-19',
          to: '2023-11-22',
        },
        enabled: !!data && !!selectedRelWord,
      };
    }),
  });

  return {
    ...queryResults,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoCount;
