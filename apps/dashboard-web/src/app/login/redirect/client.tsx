'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { apiInstance } from '@/utils/apiInstance';

const Client = ({ accessToken }: { accessToken: string | undefined }) => {
  const router = useRouter();
  useEffect(() => {
    if (accessToken) {
      apiInstance.defaults.headers.common['Authorization'] = accessToken;
      router.push('/login/choose-keyword');
    } else {
      throw new Error('accestoken이 넘어오지 않았습니다.');
    }
  }, []);
  return <></>;
};

export default Client;
