'use client';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MainArticleList from '@/components/MainContents/MediaArticles/MainArticleList';
import { CONTENT } from '@/constants/route';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import { useDateActions, useEndDate, useStartDate } from '@/store/dateStore';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const TestPage = () => {
  const router = useRouter();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const testData = [2000000, 2000000, 2200000, 2000000, 2000000, 2000000, 50];

  const rangeData = [
    [3100, 3400],
    [4200, 5200],
    [3900, 4900],
    [3400, 3900],
    [5100, 5900],
    [5400, 6700],
    [4300, 4600],
  ];

  const testObj = {
    '2024-02-01': 5,
    '2024-02-02': 15,
    '2024-02-03': 80,
    '2024-02-04': 75,
    '2024-02-05': 0,
    '2024-02-06': 150,
    '2024-02-07': 120,
  };

  const rangeTargetData = [3300, 4900, 4300, 3700, 5500, 5900, 4500];

  const { setStartDate, setEndDate } = useDateActions();
  useEffect(() => {}, []);

  const handleDate = () => {
    setStartDate('2023-05-16');
    setEndDate('2023-05-23');
  };
  return (
    <div>
      {/* <MainArticleList /> */}
      <div onClick={handleDate}>버튼</div>
      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1,
            },
          },

          stroke: {
            width: 2,
          },
          fill: {
            opacity: 0.1,
          },

          xaxis: {
            categories: [
              '리그오브레전드',
              '음식',
              '먹방',
              '키워드',
              '유통',
              '물류',
            ],
          },
          yaxis: {
            axisTicks: {
              // show: false,
            },

            axisBorder: {
              // show: false,
              //   color: '#F0516D',
            },
            labels: {
              style: {
                fontSize: '0px',
                // radar차트 y축 라벨을 지우려면 fontsize로 컨트롤해야함.
                colors: '#F0516D',
              },
              show: false,
            },

            // tooltip: {
            //     enabled: true,
            // },
          },
          markers: {
            size: 1,
            colors: ['#038FFB', '#00E397', '#FEB11A'],

            strokeWidth: 3,
            strokeColors: ['#038FFB', '#00E397', '#FEB11A'],
          },

          tooltip: {
            // y: {
            //   formatter(val, opts) {
            //     return String(val);
            //   },
            // },
          },
          dataLabels: {
            // enabled: true,
          },
        }}
        series={[
          {
            name: '테스트',
            data: [
              { y: 80, x: '리그오브레전드' },
              { y: 30, x: '음식' },
              { y: 40, x: '먹방' },
              { y: 60, x: '키워드' },
              { y: 100, x: '유통' },
              { y: 20, x: '물류' },
            ],
          },
          {
            name: '조회 수',
            data: [
              { y: 100, x: '리그오브레전드' },
              { y: 30, x: '음식' },
              { y: 40, x: '먹방' },
              { y: 60, x: '키워드' },
              { y: 100, x: '유통' },
              { y: 90, x: '물류' },
            ],
          },
          {
            name: '영상 수',
            data: [
              { y: 80, x: '리그오브레전드' },
              { y: 100, x: '음식' },
              { y: 80, x: '먹방' },
              { y: 100, x: '키워드' },
              { y: 10, x: '유통' },
              { y: 70, x: '물류' },
            ],
          },
        ]}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default TestPage;

function getDateObjTime(date: string) {
  return new Date(date).getTime();
}
