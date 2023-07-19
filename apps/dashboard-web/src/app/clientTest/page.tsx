import { dehydrate } from '@tanstack/query-core';

import { apiServer } from '@/utils/apiServer';

import getQueryClient from '../../query/getQuery';
import ReactQueryHydrate from '../../query/Hydrate';
import Keyword from './Keyword';

export default async function PostPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['rel'], () =>
    apiServer.relwords.getRelWords({
      params: {
        keyword: '손흥민',
      },
    }),
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Keyword />
    </ReactQueryHydrate>
  );
}
