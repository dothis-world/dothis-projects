import { useRouter } from 'next/router';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next/types';
import { z } from 'zod';

import ViewRequestPost from '@/components/contents/ViewRequestPost';
import Container from '@/components/layout/Container';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import getTrpcSSGHelpers from '@/server/getTrpcSSGHelpers';
import stringUtils from '@/utils/stringUtils';

const querySchema = z.object({
  requestId: z.string().transform(BigInt),
});

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const query = querySchema.parse(context.query);
  const trpcSSGHelpers = await getTrpcSSGHelpers();

  const requestDetail = await trpcSSGHelpers.fetchQuery(
    'request post - detail item',
    { id: query.requestId },
  );

  if (!requestDetail)
    return {
      notFound: true,
      redirect: {
        destination: '/404',
      },
    };

  return {
    props: {
      requestDetail,
    },
  };
};

export default function RequestViewPage({
  requestDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const query = querySchema.parse(
    stringUtils.extractQueryParams(router.asPath),
  );

  return (
    <LayoutTemplate>
      <Container py={24}>
        <ViewRequestPost requestPost={requestDetail}></ViewRequestPost>
      </Container>
    </LayoutTemplate>
  );
}
