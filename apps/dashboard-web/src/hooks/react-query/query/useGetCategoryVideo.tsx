import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { CATEGORY_VIDEO_LIST_KEY } from '@/constants/querykey';

const reqUrl = 'https://api.dothis.kr/v1/video/issue/category';

interface Video {
  videoId: string;
  videoViews: number;
  videoTitle: string;
  videoPublished: string;
  avgViews: string;
  channelName: string;
}

interface ApiResponse {
  success: boolean;
  data: { data: Video[] };
}

const queryFn = async ({
  categoryNumbers,
  limit,
  startDate,
  endDate,
}: {
  categoryNumbers: number[];
  limit: number;
  startDate: string;
  endDate: string;
}): Promise<ApiResponse> => {
  const formattedCategoryNumbers = categoryNumbers.join(',');
  return await axios.get(reqUrl, {
    params: {
      categoryNumbers: formattedCategoryNumbers,
      limit,
      to: endDate,
      from: startDate,
    },
  });
};
const useGetCategoryVideo = ({
  categoryNumbers,
  limit,
  startDate,
  endDate,
}: {
  categoryNumbers: number[];
  limit: number;
  startDate: string;
  endDate: string;
}) => {
  const queryResult = useQuery<ApiResponse>(
    CATEGORY_VIDEO_LIST_KEY.list([
      { categoryNumbers, limit, startDate, endDate },
    ]),

    () => queryFn({ categoryNumbers, limit, startDate, endDate }),
    {
      enabled: !!startDate && !!endDate,
    },
  );

  return { ...queryResult };
};

export default useGetCategoryVideo;
