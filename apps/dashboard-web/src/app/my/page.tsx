'use client';

import { useEffect } from 'react';

import { apiClient } from '@/utils/apiClient';

const MyPage = () => {
  const { data } = apiClient.auth.getOwnInfo.useQuery(['my_1'], {});

  console.log(data);

  return <>마이페이지</>;
};

export default MyPage;
