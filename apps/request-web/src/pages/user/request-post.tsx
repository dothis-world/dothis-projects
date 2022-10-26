import { Box, Center, HStack, Spinner, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

import HorizonPostRequestItem from '@/components/article/HorizonPostRequestItem';
import Container from '@/components/layout/Container';
import HorizonPostRequestItemWrap from '@/components/layout/HorizonPostRequestItemWrap';
import LayoutTemplate from '@/components/layout/LayoutTemplate';
import Input from '@/components/ui/Input';
import { useModalStore } from '@/models/modal/useModalStore';
import { withUserSessionSsr } from '@/server/session';
import { typo } from '@/styles/chakraTheme/variable';
import trpcHooks from '@/utils/trpcHooks';

import SvgSearch from '../../components/ui/Icons/SvgSearch';

const querySchema = z.object({
  searchText: z.string().optional(),
});

export const getServerSideProps = withUserSessionSsr(
  async (context, userSession) => {
    const { searchText } = querySchema.parse(context.query);

    // const userRequest = await trpcServerClient.query(
    //   'user - infinite search user request',
    //   {
    //     userId: userSession.id,
    //     cursor: undefined,
    //     searchText,
    //   },
    // );

    return {
      props: {
        userId: userSession.id,
        searchText,
        // userRequest,
      },
    };
  },
);

const requestPost = ({
  searchText: _searchText,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchText, _setSearchText] = useState(_searchText);
  const router = useRouter();
  const trpcUtils = trpcHooks.useContext();
  const handleSetSearchText = useCallback(
    (_searchText: typeof searchText) => {},
    [],
  );
  const debouncedSearchText = useDebouncedCallback(
    (_searchText: typeof searchText) => {
      _setSearchText(_searchText === '' ? undefined : inputRef.current?.value);
      userSearchRequestPost.remove();
    },
    500,
  );
  useEffect(() => {
    console.log('request-post.tsx', '');
  }, []);

  const modalStore = useModalStore();
  const userSearchRequestPost = trpcHooks.useInfiniteQuery(
    [
      'user - infinite search user request',
      {
        userId,
        searchText,
      },
    ],
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      onSuccess: (data) => {
        router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              searchText,
            },
          },
          undefined,
          { shallow: true },
        );
      },
    },
  );

  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView) {
      userSearchRequestPost.fetchNextPage();
    }
  }, [inView]);

  return (
    <LayoutTemplate>
      <Container css={style}>
        <Text as="h2" my={40}>
          요청 관리
        </Text>
        <Box>
          <HStack>
            <Input
              key="input"
              Right={
                <Center h="100%" w={32} pr={8}>
                  <SvgSearch />
                </Center>
              }
              theme="white"
              size="sm"
              placeholder="검색"
              onChange={(e) => {
                debouncedSearchText(e.target.value);
              }}
              defaultValue={searchText}
              wrapProps={{ maxW: 210 }}
              ref={inputRef}
            />
          </HStack>
        </Box>
        <Box my={42}>
          {userSearchRequestPost.data?.pages?.[0] &&
          userSearchRequestPost.data.pages[0].items.length > 0 ? (
            <HorizonPostRequestItemWrap>
              <>
                {userSearchRequestPost.data?.pages.map(({ items }) =>
                  items.map((request) => (
                    <HorizonPostRequestItem
                      key={`${request.id}`}
                      matchText={searchText}
                      requestPost={request}
                    />
                  )),
                )}
                <div ref={ref}></div>
              </>
            </HorizonPostRequestItemWrap>
          ) : (
            <Center p={32}>
              {userSearchRequestPost.isLoading ? (
                <Spinner w={32} h={32} />
              ) : (
                '조건에 해당하는 요청이 없습니다.'
              )}
            </Center>
          )}
        </Box>
      </Container>
    </LayoutTemplate>
  );
};

const style = css`
  h2 {
    ${typo.h1};
  }
`;
export default requestPost;
