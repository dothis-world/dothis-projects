import type { NextApiRequest, NextApiResponse } from 'next';

const mockApiBase = '/api/mock';
export default function handler(
  { url, method, query }: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('/****** MOCK API ******/');
  console.log('method: ', method);
  console.log('url: ', url);
  console.log('query: ', query);
  console.log('/**********************/');

  switch (method) {
    case 'GET':
      console.log(url, 'url');
      if (url?.includes('users/')) return res.status(200).json(mockUser);
      if (url?.includes('users'))
        return res.status(200).json([mockUser, mockUser, mockUser]);
      break;
    case 'POST':
      break;
    case 'PUT':
      break;
    case 'DELETE':
      break;
    case 'PATCH':
      break;
  }
}

const mockUser = {
  id: 'alkjlepoqwjdmsam',
  name: '홍길동',
  videoCount: 259,
  subscriberCount: 123456,
  averageViewCount: 42510000,
  profileImage: '',
};

const mockVideoTags = [
  { name: '부동산', useCount: 123, viewCount: 123456789 },
  {
    name: '호구',
    useCount: 421,
    viewCount: 948222,
  },
  {
    name: '호구',
    useCount: 421,
    viewCount: 948222,
  },
];
const mockChannelTags = ['정보', '경제', '이슈'];
