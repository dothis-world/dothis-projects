import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import type { User } from '@prisma/client';
import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import React, { useCallback, useMemo } from 'react';

import NewRequestPost from '@/components/contents/NewRequestPost';
import viewRequestModalHandlers from '@/components/contents/ViewRequestPost/viewRequestModalHandlers';
import 후원금펀딩 from '@/components/contents/후원금펀딩';
import DotDotDotMenu from '@/components/ui/ActionMenu/DotDotDotMenu';
import Button from '@/components/ui/Button';
import SvgAccept from '@/components/ui/Icons/SvgAccept';
import SvgAlarmWarning from '@/components/ui/Icons/SvgAlarmWarning';
import SvgBack from '@/components/ui/Icons/SvgBack';
import SvgClose from '@/components/ui/Icons/SvgClose';
import SvgDelete from '@/components/ui/Icons/SvgDelete';
import SvgEdit from '@/components/ui/Icons/SvgEdit';
import SvgGiveUp from '@/components/ui/Icons/SvgGiveUp';
import SvgHandCoin from '@/components/ui/Icons/SvgHandCoin';
import SvgRegistration from '@/components/ui/Icons/SvgRegistration';
import SvgThumbDown from '@/components/ui/Icons/SvgThumbDown';
import ToastBox from '@/components/ui/ToastBox';
import UserAvatar from '@/components/ui/UserAvatar';
import { PAGE_KEYS, pagePath } from '@/constants';
import RequestFundingDomain from '@/domain/RequestFundingDomain';
import type RequestPostDomain from '@/domain/RequestPostDomain';
import useMustLoginFirst from '@/hooks/useMustLoginFirst';
import { useModalOptStore } from '@/models/modal/ModalContext';
import { useModalStore } from '@/models/modal/useModalStore';
import {
  colors,
  fontSizes,
  fontWeights,
  mediaQueries,
} from '@/styles/chakraTheme/variable';
import { shareUrlObject } from '@/utils/appUtils';
import NumberUtils from '@/utils/numberUtils';
import trpcHooks from '@/utils/trpcHooks';

import PostRequestStatus from '../../article/PostRequestStatus';
import SvgDonate from '../../ui/Icons/SvgDonate';
import SvgShareForward from '../../ui/Icons/SvgShareForward';
import SvgThumbUp from '../../ui/Icons/SvgThumbUp';
import YoutubeIframe from '../../ui/YoutubeIframe';
import _CommentsArea from './_CommentsArea';
import ViewPostRequestContainer from './ViewPostRequestContainer';

type Props = {
  requestPost: Pick<NonNullable<RequestPostDomain.GetItemT>, 'id'>;
};

const ViewRequestPost = ({ requestPost: _requestPost }: Props) => {
  const { data: session } = useSession();
  const trpcUtils = trpcHooks.useContext();
  const mustLoginFirst = useMustLoginFirst();

  const requestDetail = trpcHooks.useQuery(
    ['request post - detail item', { id: _requestPost.id }],
    {
      select(data) {
        if (!data) return data;
        const reactions = data.requestReactions.reduce(
          (acc, { userId, type }) => {
            if (!userId) return acc;
            if (type === 'LIKE') acc.likeSet.add(userId);
            if (type === 'DISLIKE') acc.dislikeSet.add(userId);

            return acc;
          },
          {
            likeSet: new Set<User['id']>(),
            dislikeSet: new Set<User['id']>(),
          },
        );
        const additionalData = {
          fundingUserSet: new Set(
            data.requestFundings.map(({ userId }) => userId),
          ),
        };
        return Object.assign({}, data, additionalData, reactions);
      },
    },
  );

  const reactionMutation = trpcHooks.useMutation('request reaction - update', {
    onSuccess() {
      trpcUtils.invalidateQueries([
        'request post - detail item',
        { id: _requestPost.id },
      ]);
    },
  });

  const statusMutation = trpcHooks.useMutation(
    ['request post - update status'],
    {
      onSuccess(_, requestData) {
        trpcUtils.invalidateQueries(['request post - detail item']);
        useModalStore.getState().closeLast();

        switch (requestData.status) {
          case 'ACCEPT':
            ToastBox.successToast('요청을 수락했습니다.');
            break;
          case 'REFUSE':
            ToastBox.successToast(
              requestData.refusalReason
                ? '요청을 포기했습니다.'
                : '요청을 거절했습니다.',
            );
            break;
          case 'REGISTRATION':
            ToastBox.successToast('콘텐츠 등록에 성공했습니다.');
            break;
          // case 'COMPLETION':
          //   ToastBox.successToast('콘텐츠 등록에 성공했습니다.');
          //   break;
        }
      },
      onError(e) {
        console.error(e);
        ToastBox.errorToast(
          '요청 상태 변경에 실패했습니다. 다시 시도해주세요.',
        );
      },
    },
  );
  const deleteRequestMutation = trpcHooks.useMutation(
    ['request post - delete'],
    {
      onError(e) {
        ToastBox.toast({
          status: 'error',
          message: e.message,
        });
      },
      onSuccess() {
        modalStore.closeLast();
        ToastBox.successToast('요청을 삭제했습니다.');
        trpcUtils.invalidateQueries([
          'request post - detail item',
          { id: _requestPost.id },
        ]);

        trpcUtils.invalidateQueries([
          'request post - user items requested by the creator',
        ]);

        trpcUtils.invalidateQueries(['request post - main recommend items']);
        trpcUtils.invalidateQueries(['user - get', { id: session?.user.id }]);

        modalStore.close(PAGE_KEYS.viewPostRequest);
      },
    },
  );
  const { isInnerModal } = useModalOptStore();
  const completeRequestMutation = trpcHooks.useMutation(
    ['request post - complete'],
    {
      onError(e) {
        ToastBox.toast({
          status: 'error',
          message: e.message,
        });
      },
      onSuccess() {
        ToastBox.successToast('요청이 성공적으로 완료되었습니다!');
        trpcUtils.invalidateQueries([
          'request post - detail item',
          { id: _requestPost.id },
        ]);
        // TODO: 나중에 삭제
        if (requestDetail?.data?.creator?.userId)
          trpcUtils.invalidateQueries([
            'user - get',
            { id: requestDetail.data.creator.userId },
          ]);
      },
    },
  );

  const user = session?.user;
  const my = trpcHooks.useQuery(['user - get', { id: user?.id }]);

  const handleLike = useCallback(
    () =>
      mustLoginFirst(() => {
        if (!user?.id) return;
        reactionMutation.mutate({
          requestId: _requestPost.id,
          userId: user?.id,
          type: 'LIKE',
        });
      }),
    [my?.data],
  );
  const handleDislike = useCallback(
    () =>
      mustLoginFirst(() => {
        if (!user?.id) return;
        reactionMutation.mutate({
          requestId: _requestPost.id,
          userId: user?.id,
          type: 'DISLIKE',
        });
      }),
    [my?.data],
  );

  const modalStore = useModalStore();

  const myReaction = useMemo(() => {
    if (!user?.id) return null;
    if (requestDetail.data?.likeSet.has(user.id)) return 'LIKE';
    if (requestDetail.data?.dislikeSet.has(user.id)) return 'DISLIKE';
    return null;
  }, [requestDetail.data]);

  const 요청삭제Submit = useCallback(() => {
    deleteRequestMutation.mutate({
      id: _requestPost.id,
    });
  }, [deleteRequestMutation]);

  const 요청포기Submit = useCallback(
    (refusalReason: string) => {
      statusMutation.mutate({
        id: _requestPost.id,
        status: 'REFUSE',
        refusalReason,
      });
    },
    [statusMutation],
  );

  const 요청수락Submit = useCallback(() => {
    statusMutation.mutate({
      id: _requestPost.id,
      status: 'ACCEPT',
    });
  }, [statusMutation]);

  const 요청가져오기Submit = useCallback(() => {
    if (!my?.data?.creator?.id) {
      ToastBox.errorToast('크리에이터 정보를 찾을 수 없습니다.');
      return;
    }
    statusMutation.mutate({
      id: _requestPost.id,
      creatorId: my?.data?.creator?.id,
      status: 'ACCEPT',
    });
  }, [statusMutation]);

  const 요청거절Submit = useCallback(() => {
    statusMutation.mutate({
      id: _requestPost.id,
      status: 'REFUSE',
    });
  }, [statusMutation]);

  const 등록콘텐츠URLSubmit = useCallback(
    async (solvedUrl: string) => {
      await statusMutation.mutateAsync({
        id: _requestPost.id,
        status: 'REGISTRATION',
        solvedUrl,
      });
      completeRequestMutation.mutate({ id: _requestPost.id });
    },
    [statusMutation],
  );
  // const 등록콘텐츠리뷰Submit = useCallback(() => {
  //   statusMutation.mutate({
  //     id: _requestPost.id,
  //     status: 'COMPLETION',
  //   });
  // }, [statusMutation]);

  // 나에게 들어온 요청인지?
  const isRequestIGot = useMemo(
    () =>
      requestDetail.data?.creator &&
      user?.id === requestDetail.data?.creator.userId,
    [requestDetail.data, user],
  );
  // 내가 한 요청인지?
  const isMyRequest = useMemo(
    () => requestDetail.data?.user && user?.id === requestDetail.data?.userId,
    [requestDetail.data, user],
  );

  const handleOpenFundingModal = useCallback(() => {
    if (!requestDetail.data) {
      ToastBox.toast({
        message: '데이터를 불러오는 중 입니다. 잠시만 기다려주세요.',
        status: 'error',
      });
      return;
    }
    modalStore.open('후원금펀딩', {
      title: '후원금 펀딩',
      Component: () => (
        <Box w={460}>
          <후원금펀딩 requestPost={requestDetail.data!} />
        </Box>
      ),
    });
  }, [requestDetail.data]);

  const dotdotdotMenuItems = useMemo(() => {
    return [
      isMyRequest && {
        text: '수정',
        Icon: <SvgEdit fill={colors.gray['90']} />,
        onClick: () => {
          if (!requestDetail.data) return;
          modalStore.open('요청수정', {
            title: '요청 수정',
            Component: () => (
              <Box w={640}>
                <NewRequestPost editRequestPostId={_requestPost.id} />
              </Box>
            ),
          });
        },
      },
      isMyRequest && {
        text: '삭제',
        Icon: <SvgDelete fill={colors.gray['90']} />,
        onClick: () => viewRequestModalHandlers.요청삭제(요청삭제Submit),
      },
      // TODO: 신고 기능 나중에
      {
        text: '신고',
        Icon: <SvgAlarmWarning fill={colors.gray['90']} />,
        onClick() {
          ToastBox.toast({
            message: '신고 기능은 준비중입니다.',
            status: 'info',
          });
        },
      },
    ];
  }, [
    isMyRequest,
    requestDetail.data,
    viewRequestModalHandlers,
    _requestPost.id,
  ]);

  return (
    <>
      {isInnerModal && (
        <Box
          position="sticky"
          display={{ base: 'flex', tablet: 'none' }}
          justifyContent="space-between"
          top={0}
          left={0}
          right={0}
          h={56}
          bg="white"
          zIndex={1}
          borderBottom={`1px solid ${colors.border['2']}`}
          alignItems="center"
        >
          <Button px={16} h="100%" onClick={modalStore.closeAll}>
            <SvgBack />
          </Button>
          {isMyRequest && (
            <DotDotDotMenu
              menuItems={dotdotdotMenuItems}
              buttonProps={{
                pr: 8,
              }}
            />
          )}
        </Box>
      )}
      {requestDetail.data && (
        <Box css={style} pt={20} pb={24}>
          <ViewPostRequestContainer>
            <Flex justifyContent="space-between">
              <PostRequestStatus status={requestDetail.data.status} />
              <Box display={{ base: 'none', tablet: 'block' }}>
                {isMyRequest && (
                  <DotDotDotMenu menuItems={dotdotdotMenuItems} />
                )}
              </Box>
            </Flex>
            <Box as="header" mt={16}>
              <Text as="h3" color="gray.80" fontSize={22} fontWeight="b">
                {requestDetail.data.title}
              </Text>
              <Flex mt={8} fontWeight="m">
                <Flex alignItems="center" color="gray.70">
                  {requestDetail.data.expires && (
                    <Text>
                      {format(requestDetail.data.expires, 'yy.MM.dd HH:mm ')}
                    </Text>
                  )}
                  &nbsp;&nbsp;|
                  <Button
                    className={clsx(myReaction === 'LIKE' && '--like')}
                    p={8}
                    fontWeight="m"
                    onClick={handleLike}
                  >
                    <SvgThumbUp width={16} height={16} />
                    &nbsp;
                    <Text as="span" color="gray.70">
                      {NumberUtils.thousandsSeparators(
                        requestDetail.data.likeSet.size,
                      )}
                    </Text>
                  </Button>
                  <Button
                    className={clsx(myReaction === 'DISLIKE' && '--dislike')}
                    p={8}
                    fontWeight="m"
                    onClick={handleDislike}
                  >
                    <SvgThumbDown width={16} height={16} />
                    &nbsp;
                    <Text as="span" color="gray.70">
                      {NumberUtils.thousandsSeparators(
                        requestDetail.data.dislikeSet.size,
                      )}
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </Box>
            <Box className="request-info" mt={12}>
              <VStack
                className="request-info_detail"
                spacing={16}
                alignItems="start"
              >
                {requestDetail.data.user && (
                  <Flex className="request-info-row" h={40} alignItems="center">
                    <label>요청자</label>
                    <Link
                      href={pagePath.user({
                        userId: requestDetail.data.user.id,
                      })}
                    >
                      <a onClick={modalStore.closeAll}>
                        <Flex className="request-info_user" alignItems="center">
                          <Avatar
                            w={32}
                            h={32}
                            name={requestDetail.data.user.name ?? undefined}
                            src={requestDetail.data.user.image ?? undefined}
                          />
                          <Text
                            as="span"
                            ml={10}
                            fontWeight="m"
                            color="gray.70"
                          >
                            {requestDetail.data.user?.name}
                          </Text>
                        </Flex>
                      </a>
                    </Link>
                  </Flex>
                )}
                {requestDetail.data.creator && (
                  <Flex className="request-info-row" h={40} alignItems="center">
                    <label>멘션</label>
                    <Link
                      href={pagePath.user({
                        userId: requestDetail.data.creator.userId,
                      })}
                    >
                      <a onClick={modalStore.closeAll}>
                        <Flex className="request-info_user" alignItems="center">
                          <Avatar
                            w={32}
                            h={32}
                            name={
                              requestDetail.data.creator.user?.name ?? undefined
                            }
                            src={
                              requestDetail.data.creator.user?.image ??
                              undefined
                            }
                          />
                          <Text
                            as="span"
                            ml={10}
                            fontWeight="m"
                            color="gray.70"
                          >
                            {requestDetail.data.creator?.user.name
                              ? `@${requestDetail.data.creator?.user.name}`
                              : '-'}
                          </Text>
                        </Flex>
                      </a>
                    </Link>
                  </Flex>
                )}
                <Box className="request-info-row">
                  <label>후원금</label>
                  <span>
                    {NumberUtils.thousandsSeparators(
                      RequestFundingDomain.utils.sumFundings(
                        requestDetail.data.requestFundings,
                      ),
                    )}
                    &nbsp;P
                  </span>
                  <Flex ml={{ base: 16, tablet: 80 }} alignItems="center">
                    <SvgDonate />
                    <Text as="span" ml={4} color="gray.70">
                      {requestDetail.data.requestFundings.length}
                    </Text>
                  </Flex>
                  <Button
                    theme="primary"
                    w={{ base: 80, tablet: 120 }}
                    size="md"
                    h={40}
                    ml={{ base: 16, tablet: 32 }}
                    onClick={handleOpenFundingModal}
                  >
                    <SvgHandCoin fill={colors.white} />
                    <Text as="span" ml={10} fontWeight="b">
                      펀딩
                    </Text>
                  </Button>
                </Box>
                {/*{requestDetail.data.expires && (*/}
                {/*  <Box className="request-info-row">*/}
                {/*    <label>기간제한</label>*/}
                {/*    <span>{format(requestDetail.data.expires, 'MM.dd')}까지</span>*/}
                {/*  </Box>*/}
                {/*)}*/}

                <Flex className="request-info-row">
                  {isRequestIGot && requestDetail.data.status === 'REQUEST' && (
                    <>
                      <Button
                        theme="primary"
                        w={150}
                        h={40}
                        onClick={() =>
                          viewRequestModalHandlers['요청수락'](요청수락Submit)
                        }
                      >
                        <SvgAccept fill={colors.white} />
                        <Text ml={10}>수락</Text>
                      </Button>
                      <Button
                        theme="white"
                        w={150}
                        h={40}
                        ml={28}
                        onClick={() =>
                          viewRequestModalHandlers['요청거절'](요청거절Submit)
                        }
                      >
                        <SvgClose fill={colors.gray['90']} />
                        <Text ml={10}>거절</Text>
                      </Button>
                    </>
                  )}
                  {isRequestIGot && requestDetail.data.status === 'ACCEPT' && (
                    <>
                      <Button
                        theme="primary"
                        w={150}
                        h={40}
                        onClick={() =>
                          viewRequestModalHandlers['등록콘텐츠URL'](
                            등록콘텐츠URLSubmit,
                          )
                        }
                      >
                        <SvgRegistration fill={colors.white} />
                        <Text ml={10}>콘텐츠 등록</Text>
                      </Button>
                      <Button
                        theme="white"
                        w={150}
                        h={40}
                        ml={28}
                        onClick={() =>
                          viewRequestModalHandlers['요청포기'](요청포기Submit)
                        }
                      >
                        <SvgGiveUp fill={colors.gray['90']} />
                        <Text ml={10}>포기</Text>
                      </Button>
                    </>
                  )}
                  {/*{isMyRequest && requestDetail.data.status === 'REGISTRATION' && (*/}
                  {/*  <Button*/}
                  {/*    theme="primary"*/}
                  {/*    // w={150}*/}
                  {/*    h={40}*/}
                  {/*    onClick={() =>*/}
                  {/*      viewRequestModalHandlers['등록콘텐츠리뷰'](*/}
                  {/*        등록콘텐츠리뷰Submit,*/}
                  {/*      )*/}
                  {/*    }*/}
                  {/*  >*/}
                  {/*    <SvgRegistration fill={colors.white} />*/}
                  {/*    <Text ml={10}>콘텐츠 등록 확인</Text>*/}
                  {/*  </Button>*/}
                  {/*)}*/}
                  {!requestDetail.data.creator && my?.data?.creator && (
                    <Button
                      theme="primary"
                      w={150}
                      h={40}
                      onClick={() =>
                        viewRequestModalHandlers['요청가져오기'](
                          요청가져오기Submit,
                        )
                      }
                    >
                      <SvgRegistration fill={colors.white} />
                      <Text ml={10}>요청 수락</Text>
                    </Button>
                  )}
                </Flex>
              </VStack>
            </Box>
          </ViewPostRequestContainer>

          {requestDetail.data.solvedUrl && (
            <Box className="reqeust-solved-contents" mt={36}>
              <YoutubeIframe url={requestDetail.data.solvedUrl}></YoutubeIframe>
              <ViewPostRequestContainer>
                <Text
                  as="h3"
                  color="gray.80"
                  fontSize={20}
                  fontWeight="b"
                  mt={10}
                >
                  등록된 컨텐츠
                </Text>
                <Flex mt={10} alignItems="center">
                  <UserAvatar
                    size={32}
                    user={requestDetail.data.creator?.user}
                    Text={
                      <Text as="span" ml={10} mr={30}>
                        {requestDetail.data.creator?.user?.name}
                      </Text>
                    }
                  />
                </Flex>
              </ViewPostRequestContainer>
            </Box>
          )}
          <ViewPostRequestContainer
            display="flex"
            flexDirection="column"
            flex="auto"
          >
            <Divider my={20} />
            <Box
              display="flex"
              flexDirection="column"
              flex="auto"
              dangerouslySetInnerHTML={{
                __html: requestDetail.data?.content
                  ? requestDetail.data?.content
                  : '',
              }}
            />
            <Flex justifyContent="center" mt={30}>
              <Button
                className={clsx(
                  'like-button',
                  myReaction === 'LIKE' && '--like',
                )}
                onClick={handleLike}
              >
                <Flex gap={6} alignItems="center">
                  <SvgThumbUp fill={colors.gray['50']} />
                  <Text as="span" fontSize={14} fontWeight="sb">
                    {requestDetail?.data?.likeSet.size}
                  </Text>
                </Flex>
                <span>좋아요</span>
              </Button>
              <Button
                className={clsx(
                  'dislike-button',
                  myReaction === 'DISLIKE' && '--dislike',
                )}
                ml={32}
                onClick={handleDislike}
              >
                <Flex gap={6} alignItems="center">
                  <SvgThumbDown fill={colors.gray['50']} />
                  <Text as="span" fontSize={14} fontWeight="sb">
                    {requestDetail?.data?.dislikeSet.size}
                  </Text>
                </Flex>
                <span>싫어요</span>
              </Button>
            </Flex>
            <HStack
              className="request-post-actions"
              justifyContent="center"
              mt={20}
              spacing={16}
            >
              <Button
                theme="white"
                w={120}
                h={40}
                onClick={() => {
                  if (requestDetail.data) {
                    shareUrlObject({
                      title: requestDetail.data.title,
                      urlObject: pagePath.viewPostRequest({
                        requestId: `${requestDetail.data.id}`,
                      }),
                    });
                  }
                }}
              >
                <SvgShareForward fill={colors.gray['90']} />
                <Text ml={10}>공유</Text>
              </Button>
              <Button
                theme="primary"
                w={120}
                size="md"
                h={40}
                onClick={handleOpenFundingModal}
              >
                <SvgHandCoin fill={colors.white} />
                <Text as="span" ml={10} fontWeight="b">
                  펀딩
                </Text>
              </Button>
            </HStack>
            <Divider my={24} />
          </ViewPostRequestContainer>
          <_CommentsArea
            requestId={_requestPost.id}
            fundingUserSet={requestDetail.data.fundingUserSet}
          />
        </Box>
      )}
    </>
  );
};

const style = css`
  display: flex;
  flex-direction: column;
  flex: auto;
  width: 100%;

  .request-info_detail {
    align-items: start;
    font-weight: ${fontWeights.m};

    .request-info-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      label {
        display: flex;
        align-items: center;
        min-width: 72px;
        font-size: ${fontSizes.t3};

        ${mediaQueries.tablet} {
          min-width: 132px;
        }
      }

      a {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }

  .like-button,
  .dislike-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    //border: 1px solid ${colors.border['2']};
    border-radius: 50%;
    width: 80px;
    height: 80px;
    padding: 8px;
    gap: 6px;
    font-weight: ${fontWeights.m};
    font-size: 12px;
    color: ${colors.gray['50']};

    svg {
      fill: ${colors.gray['50']};
    }
  }

  .--like,
  .--dislike {
    border-color: ${colors.primary.default};

    span {
      color: ${colors.primary.default};
    }

    svg path {
      fill: ${colors.primary.default};
    }
  }
`;

ViewRequestPost.title = () => '요청 상세';

ViewRequestPost.modalOpen = (props: Props) => {
  useModalStore.getState().open(PAGE_KEYS.viewPostRequest, {
    Component: () => (
      <Box width="100vw">
        <ViewRequestPost {...props} />
      </Box>
    ),
    title: ViewRequestPost.title(),
    modalOpt: {
      hiddenOnMobile: true,
      isFull: true,
    },
  });
};
ViewRequestPost.ModalLink = function ViewRequestPostModalLink({
  children,
  ...props
}: {
  children: ReactNode;
} & Props) {
  const modalStore = useModalStore();
  const handleModalOpen = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      ViewRequestPost.modalOpen(props);
    },
    [props],
  );

  return (
    <Link
      href={pagePath.viewPostRequest({
        requestId: `${props.requestPost.id}`,
      })}
      passHref
    >
      <a onClick={handleModalOpen} css={linkStyle}>
        {children}
      </a>
    </Link>
  );
};

const linkStyle = css`
  &:hover {
    strong,
    b {
      text-underline-offset: 2px;
      text-decoration: underline;
    }
  }
`;

export default ViewRequestPost;
