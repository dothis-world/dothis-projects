import type { NextApiRequest, NextApiResponse } from 'next';

const mockApiBase = '/api/mock';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('/****** MOCK API ******/');
  console.log('req.method: ', req.method);
  console.log('req.url: ', req.url);
  console.log('req.query: ', req.query);
  console.log('/**********************/');
  // const f = apiBuilder({
  //   path: '/aaa/:id',
  //   method: 'get',
  //   response: undefined,
  // });

  if (req.method === 'GET') {
    res.status(200).json({ id: 'asf124213', name: 'John Doe' });
  }
}
