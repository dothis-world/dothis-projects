import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const reqUrl = 'http://dothis2.iptime.org:8003/nlp/channelsimiler';

const fetchTodos = async ({ channelId }: { channelId: string | undefined }) => {
  return await axios.post(reqUrl, {
    ntop: 10,
    channel_id: channelId,
    cluster: 9,
    subscribers: 119230,
    keywords: '개그',
    tags: '개그',
  });
};

const useGetSimilarChannel = ({ channelId }: { channelId?: string }) => {
  const queryResult = useQuery(
    ['similar', { channelId }],
    () => fetchTodos({ channelId }),
    {
      enabled: !!channelId,
    },
  );

  return { ...queryResult };
};

export default useGetSimilarChannel;
