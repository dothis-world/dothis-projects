import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const reqUrl = 'http://dothis2.iptime.org:8003/nlp/channelsimiler';

const fetchTodos = async () => {
  return await axios.post(reqUrl, {
    ntop: 10,
    channel_id: 'UC72V934gDqmHztP9xJZhpDg',
    cluster: 9,
    subscribers: 119230,
    keywords: '기초수급자',
    tags: '기초수급자',
  });
};

const useGetSimilarChannel = () => {
  const queryResult = useQuery({ queryKey: ['similar'], queryFn: fetchTodos });

  return { ...queryResult };
};

export default useGetSimilarChannel;
