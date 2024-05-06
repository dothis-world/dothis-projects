'use client';

import './YourComponent.css'; // CSS 파일 임포트

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DashboardLineChart from '@/components/common/Charts/DashboardLineChart';
import { useSearchRatioFormatter } from '@/hooks/contents/useChartFormatter';
import useGetNaverSearchRatio, {
  NaverAPI_Results,
} from '@/hooks/react-query/query/useGetNaverSearchRatio';
import { handleNaverSearchRatio } from '@/utils/contents/chart';

const request_body = {
  startDate: '2017-01-01',
  endDate: '2017-04-30',
  timeUnit: 'month',
  keywordGroups: [
    {
      groupName: '한글',
      keywords: ['한글', 'korean'],
    },
    {
      groupName: '영어',
      keywords: ['영어', 'english'],
    },
  ],
  device: 'pc',
  ages: ['1', '2', '3', '4'],
  gender: 'f',
};

const YourComponent = () => {
  const [testUnmounted, setTestUnmounted] = useState(false);

  const { data } = useGetNaverSearchRatio({ keyword: '키위', relword: '새' });
  data?.results;
  console.log(
    data &&
      handleNaverSearchRatio(data.results, {
        startDate: data.startDate,
        endDate: data.endDate,
      }),
  );

  const search = useSearchRatioFormatter({ keyword: '키위', relword: '새' });

  useEffect(() => {
    // async function test() {
    //   const data = await axios.post('api/search', {});
    //   console.log(data);
    // }
    // async function clientTest() {
    //   const response = await fetch('v1/search', {
    //     method: 'POST',
    //     headers: {
    //       'X-Naver-Client-Id': 'w5hxMTJtn4za98VEUhnr',
    //       'X-Naver-Client-Secret': 'jzLwJId4wN',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(request_body),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // }
    // test();
    // clientTest();
  });

  const handleTestUnmount = () => {
    setTestUnmounted(true);
  };

  return (
    <div className="m-10">
      {!testUnmounted && <div id="test">sdsds</div>}
      {testUnmounted && (
        <div id="up" className="up-animation">
          ddd
        </div>
      )}
      <div onClick={handleTestUnmount}>테스트</div>

      <DashboardLineChart series={[{ ...search }]} />
    </div>
  );
};
export default YourComponent;
