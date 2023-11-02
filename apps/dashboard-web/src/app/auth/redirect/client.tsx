'use client';

import { setCookie } from 'cookies-next';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoginLoadingComponent from '@/components/Auth/LoginLoading';
import { isProduction } from '@/constants/dev';
import { useAuthActions } from '@/store/authStore';
import { apiClient } from '@/utils/api/apiClient';
import {
  combinedKeywordsAndTags,
  convertKeywordsToArray,
  isHashKeyword,
} from '@/utils/keyword';

const isServer = typeof window === 'undefined';

// 추 후 그냥 dev단계 컴포넌트(token 관리)를 새로 생성예정

const Client = ({
  accessToken,
  refreshToken,
  isNewUser,
}: {
  accessToken: string | string[] | undefined;
  refreshToken: string | string[] | undefined;
  isNewUser: string | string[] | undefined;
}) => {
  const router = useRouter();
  const { setIsSignedIn, setIsTokenRequired } = useAuthActions();

  if (!isProduction && accessToken) {
    setCookie('accessToken', `Bearer ${accessToken}`);
  }

  const { data: userData, isLoading: userLoading } = apiClient(
    1,
  ).auth.getOwnInfo.useQuery(['user']);

  const { data: keyword, isLoading: keywordLoading } = apiClient(
    2,
  ).user.getUserKeyword.useQuery(['keyword']);

  useEffect(() => {
    if (!userLoading && !keywordLoading) {
      if (accessToken && refreshToken) {
        setIsSignedIn(true);
        setIsTokenRequired(false);
        if (isNewUser === 'true' || !userData?.body.data.agreePromotion) {
          router.replace('/login/terms');
          return;
        }
        if (
          !isHashKeyword(
            convertKeywordsToArray(userData.body.data.personalizationTag),
          )
        ) {
          router.replace('/login/choose-keyword');
          return;
        }

        router.replace('/contents');
      } else {
        throw new Error('로그인이 정상적으로 진행되지 않았습니다.');
      }
    }
  }, [userLoading, keywordLoading]);
  return (
    <>
      {/* 현재 LoadingComponent가 서버 측 redirect로는 나오지않는 이슈가 존재*/}
      <LoginLoadingComponent />

      <h2 className="mt-3 text-center text-2xl font-bold">채널 분석 중</h2>
    </>
  );
};

export default Client;
