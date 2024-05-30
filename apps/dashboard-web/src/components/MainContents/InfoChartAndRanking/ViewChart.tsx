'use client';

import './styles.css';

import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

import DashboardAreaChart from '@/components/common/Charts/DashboardAreaChart';
import DashboardLineChart from '@/components/common/Charts/DashboardLineChart';
import {
  useAveragePerformanceFormatter,
  useDailyVideoCountFormatter,
  useDailyViewDataFormatter,
  useScopePerformanceFormatter,
  useSearchRatioFormatter,
} from '@/hooks/contents/useChartFormatter';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetPerformanceData from '@/hooks/react-query/query/useGetPerformanceData';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { getDateObjTime } from '@/utils/contents/dateObject';

const ViewChart = () => {
  const selectedWord = useSelectedWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const { isLoading: dailyViewIsLoading } = useGetDailyView(selectedWord);

  const { data: performanceData, isLoading: expectedViewIsLoading } =
    useGetPerformanceData(selectedWord);

  // 1. true의 개수 세기
  const trueCount = dailyViewIsLoading.filter(
    (value) => value === false,
  ).length;

  // 2. 전체 배열의 길이로 나누어 비율 계산
  const percentage = (trueCount / dailyViewIsLoading.length) * 100;

  // 3. 퍼센트로 변환
  const formattedPercentage = `${percentage.toFixed(2)}%`;

  // 배열에서 false의 개수를 세는 함수
  const countTrue = (arr: boolean[]) =>
    arr.filter((value) => value === false).length;

  // 배열의 길이로 나누어 퍼센트 계산하는 함수
  const calculatePercentage = (arr: boolean[]) =>
    (countTrue(arr) / arr.length) * 100;

  // 두 배열을 합치기
  const combinedArray = [...dailyViewIsLoading, expectedViewIsLoading];

  // 전체 배열에 대한 퍼센트 계산
  const totalPercentage = useMemo(
    () =>
      calculatePercentage(combinedArray)
        ? `${calculatePercentage(combinedArray)}%`
        : '0%',
    [],
  );

  const rangeTargetData = [
    [3300],
    [4900],
    [4300],
    [3700],
    [5500],
    [5900],
    [4500],
  ];

  const rangeData = [
    [3100, 3400],
    [4200, 5200],
    [3900, 4900],
    [3400, 3900],
    [5100, 5900],
    [5400, 6700],
    [4300, 4600],
  ];

  // api 데이터 -> 데이터 안정화시 적용작업 예정
  const dailyView = useDailyViewDataFormatter({
    keyword: selectedWord.keyword,
    relword: selectedWord.relword,
  });

  // function safelyGetY(item: any): number {
  //   return typeof item?.y === 'number' ? Math.abs(item.y) : 0;
  // }
  // const AbsDailyView = {
  //   ...dailyView,
  //   data: dailyView.data.map((item) => ({
  //     ...(item as Object),
  //     y: safelyGetY(item), // y 값에 절대값 적용
  //   })),
  // };

  // console.log(AbsDailyView);

  const dailyVideoCount = useDailyVideoCountFormatter({
    keyword: selectedWord.keyword,
    relword: selectedWord.relword,
  });
  // dailyVideoCount  -> dailyView api에서 함께 가져오는 video 수로 책정한다.

  // videoViews filter 걸어주기
  const scopePerformance = useScopePerformanceFormatter({
    keyword: selectedWord.keyword,
    relword: selectedWord.relword,
  });

  const averagePerformance = useAveragePerformanceFormatter({
    keyword: selectedWord.keyword,
    relword: selectedWord.relword,
  });

  const search = useSearchRatioFormatter({
    keyword: selectedWord.keyword,
    relword: selectedWord.relword,
  });

  // if (
  //   combinedArray.length === 0 ||
  //   combinedArray.some((item) => item === true)
  // ) {
  //   return (
  //     <div className=" mr-7 flex h-[460px] w-full  flex-col">
  //       <div className=" flex h-3/6 justify-center [&_svg]:overflow-visible">
  //         <DashboardLineChart
  //           series={[
  //             {
  //               name: '일일 조회 수',
  //               type: 'line',
  //               color: '#F0516D',
  //               data: [60000, 56000, 70000, 73000, 70000, 64500, 67000].map(
  //                 (item, index) => [
  //                   getDateObjTime(
  //                     dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
  //                   ),
  //                   item,
  //                 ],
  //               ),
  //             },
  //             {
  //               name: '검색량',
  //               type: 'line',
  //               color: '#818CF8',
  //               data: [23, 31, 33, 14, 15, 12, 18].map((item, index) => [
  //                 getDateObjTime(
  //                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
  //                 ),
  //                 item,
  //               ]),
  //             },
  //             {
  //               name: '영상 수',
  //               type: 'column',
  //               color: '#34D399',
  //               data: [20, 29, 37, 36, 44, 45, 75].map((item, index) => [
  //                 getDateObjTime(
  //                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
  //                 ),
  //                 item,
  //               ]),
  //             },
  //           ]}
  //         />
  //       </div>
  //       <div className="ml-[2px] flex h-3/6 justify-center [&_svg]:overflow-visible">
  //         <DashboardAreaChart
  //           series={[
  //             {
  //               type: 'rangeArea',
  //               name: '평균성과 기대치',
  //               data: rangeData.map((item, index) => ({
  //                 x: getDateObjTime(
  //                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
  //                 ),
  //                 y: item,
  //               })),
  //             },

  //             {
  //               type: 'line',
  //               name: '평균성과',
  //               data: rangeTargetData.map((item, index) => ({
  //                 x: getDateObjTime(
  //                   dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
  //                 ),
  //                 y: item,
  //               })),
  //             },
  //           ]}
  //         />
  //       </div>
  //       <div className="bg-grey200 dark:bg-grey700 mb-4  h-2.5 w-[90%]  translate-x-[60px] rounded-full">
  //         <div
  //           className="dark:bg-primary400 bg-primary600 h-2.5 rounded-full"
  //           style={{ width: totalPercentage }}
  //         ></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
      <div className="flex h-3/6 justify-center [&_svg]:overflow-visible">
        <DashboardLineChart
          series={[
            {
              ...dailyView,
              // name: '일일 조회 수',
              // type: 'line',
              // color: '#F0516D',
              // data: [60000, 56000, 70000, 73000, 70000, 64500, 67000].map(
              //   (item, index) => {
              //     return {
              //       x: getDateObjTime(
              //         dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //       ),
              //       y: item,
              //     };
              //   },
              // ),
            },
            {
              ...search,
              // name: '검색량',
              // type: 'line',
              // color: '#818CF8',
              // data: [23, 31, 33, 14, 15, 12, 18].map((item, index) => {
              //   return {
              //     y: item,
              //     x: getDateObjTime(
              //       dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //     ),
              //   };
              // }),
            },
            {
              ...dailyVideoCount,
              // name: '영상 수',
              // type: 'column',
              // color: '#34D399',
              // data: [20, 29, 37, 36, 44, 45, 75].map((item, index) => {
              //   return {
              //     x: getDateObjTime(
              //       dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //     ),
              //     y: item,
              //   };
              // }),
            },
            // 이거는 주석풀면 apex 에러가 발생한다 (series의 포맷팅은 동일해야함)
          ]}
        />
      </div>
      <div className="ml-[2px] flex h-3/6 justify-center [&_svg]:overflow-visible">
        <DashboardAreaChart
          series={[
            {
              ...scopePerformance,
              // type: 'rangeArea',
              // name: '평균성과 기대치',
              // data: rangeData.map((item, index) => ({
              //   x: getDateObjTime(
              //     dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //   ),
              //   y: item,
              // })),
            },

            {
              ...averagePerformance,
              // type: 'line',
              // name: '평균성과',
              // data: rangeTargetData.map((item, index) => ({
              //   x: getDateObjTime(
              //     dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //   ),
              //   y: item,
              // })),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ViewChart;
