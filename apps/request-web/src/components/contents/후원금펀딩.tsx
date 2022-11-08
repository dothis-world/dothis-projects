import { Box, Center, Flex, VStack } from '@chakra-ui/react';
import Button from '@dothis/share/components/ui/Button';
import FormValidMessage from '@dothis/share/components/ui/FormValidMessage';
import FormatInput from '@dothis/share/components/ui/Input/FormatInput';
import ToastBox from '@dothis/share/components/ui/ToastBox';
import UserAvatar from '@dothis/share/components/ui/UserAvatar';
import type { RequestPostDomain } from '@dothis/share/domain';
import { RequestFundingDomain, UserDomain } from '@dothis/share/domain';
import {
  colors,
  fontWeights,
  mediaQueries,
} from '@dothis/share/lib/styles/chakraTheme';
import {
  isNilStr,
  onEnter,
  removeSeparators,
  thousandsSeparators,
} from '@dothis/share/lib/utils';
import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import UserLink from '@/components/ui/Links/UserLink';
import useMustLoginFirst from '@/hooks/useMustLoginFirst';
import { trpc } from '@/utils/trpc';

type Props = {
  user?: User;
  requestPost: Pick<
    NonNullable<RequestPostDomain.GetItemT>,
    'id' | 'requestFundings'
  >;
};

const formSchema = z.object({
  quantity: RequestFundingDomain.schema.shape.quantity.min(200, {
    message: '최소 200원 이상 입력해주세요.',
  }),
});
type Form = z.infer<typeof formSchema>;

const 후원금펀딩 = ({ requestPost }: Props) => {
  const { data: session, status } = useSession();
  const mustLoginFirst = useMustLoginFirst();

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      quantity: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const fundingDetail = trpc.requestPost.getDetail.useQuery(
    { id: requestPost.id },
    {
      initialData: requestPost,
    },
  );

  const isFundingDisabled = useMemo(
    () =>
      fundingDetail.data?.status === 'REFUSE' ||
      fundingDetail.data?.status === 'EXPIRATION' ||
      fundingDetail.data?.status === 'COMPLETION',
    [fundingDetail.data?.status],
  );

  const trpcUtils = trpc.useContext();
  const result = trpc.requestFunding.funding.useMutation({
    onSuccess(_, request) {
      resetField('quantity');

      trpcUtils.requestPost.getDetail.invalidate({ id: requestPost.id });
      trpcUtils.requestPost.getUserForCreator.invalidate();
      if (session?.user.id)
        trpcUtils.user.get.invalidate({ id: session?.user?.id });
      ToastBox.toast({
        message: `${request.quantity}원을 펀딩했습니다.`,
        status: 'success',
      });
    },
    onError(error) {
      ToastBox.errorToast('후원금 펀딩에 실패했습니다.');
    },
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (result.isLoading) return;
    if (!session?.user.id) throw Error('사용자 정보를 찾을 수 없습니다.');
    const user = await trpcUtils.user.get.fetch({ id: session.user.id });

    if (!user) throw Error('사용자 정보를 찾을 수 없습니다.');
    if (user.totalPoint < data.quantity) {
      return setError('quantity', { message: '보유 포인트가 부족합니다.' });
    }

    result.mutate({
      quantity: data.quantity,
      userId: user.id,
      requestId: requestPost.id,
    });
  };

  return (
    <Box css={style}>
      {fundingDetail.data &&
        (fundingDetail.data.requestFundings.length === 0 ? (
          <Center py={24}>펀딩 내역이 없습니다.</Center>
        ) : (
          <Box className="funding-list" as="ul">
            {fundingDetail.data.requestFundings.map(({ user, quantity }) => (
              <Flex
                key={`${user ? user.id : null}`}
                as="li"
                justifyContent="space-between"
                alignItems="center"
              >
                {user ? (
                  <UserLink userId={user.id}>
                    <UserAvatar
                      size={32}
                      user={user}
                      Text={<b className="avatar-name">{user.name}</b>}
                    />
                  </UserLink>
                ) : (
                  <UserAvatar
                    size={32}
                    user={{ name: UserDomain.constants.resignedUserName }}
                    Text={
                      <b className="avatar-name">
                        {UserDomain.constants.resignedUserName}
                      </b>
                    }
                  />
                )}
                <b className="price">{thousandsSeparators(quantity)}&nbsp;원</b>
              </Flex>
            ))}
          </Box>
        ))}
      <Box className="funding-form">
        <VStack flex="auto" spacing={4} alignItems="start">
          <FormatInput
            format="thousandsSeparators"
            Right={<Center>원</Center>}
            onKeyDown={onEnter(handleSubmit(onSubmit))}
            placeholder="200원부터 입력가능합니다."
            {...register('quantity', {
              setValueAs(v) {
                if (isNilStr(v)) return undefined;
                return typeof v === 'number'
                  ? v
                  : parseInt(removeSeparators(v));
              },
            })}
            isDisabled={isFundingDisabled}
          />
          <FormValidMessage errorMessage={errors.quantity?.message} pl={2} />
        </VStack>
        <Button
          theme="primary"
          h={50}
          minW={100}
          fontSize={15}
          onClick={() => mustLoginFirst(handleSubmit(onSubmit))}
          disabled={isFundingDisabled || result.isLoading}
        >
          후원하기
        </Button>
      </Box>
    </Box>
  );
};

const style = css`
  .funding-list {
    padding: 24px 16px;
    overflow-y: auto;
    max-height: 210px;

    ${mediaQueries.tablet} {
      padding: 24px;
    }

    > li {
      height: 32px;
    }

    > li + li {
      margin-top: 26px;
    }

    .avatar-name {
      margin-left: 12px;
      font-size: 15px;
    }

    .price {
      font-weight: ${fontWeights.b};
      font-size: 16px;
    }
  }

  .funding-form {
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${colors.border['2']};
    gap: 16px;

    padding: 24px 16px;

    ${mediaQueries.tablet} {
      padding: 24px;
      flex-direction: row;

      button {
        margin-top: 0;
      }
    }
  }
`;
export default 후원금펀딩;
