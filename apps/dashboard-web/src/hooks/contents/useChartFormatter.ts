import { useMemo } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import {
  formatToApexChart,
  handleAveragePerformanceData,
  handleDailyViewData,
  handleScopePerformanceData,
} from '@/utils/contents/dailyview';

import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetPerformanceData from '../react-query/query/useGetPerformanceData';

export const useDailyViewDataFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyView({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const handleDailyViewDataCallback = formatToApexChart(handleDailyViewData, {
    name: '일일조회수',
    type: 'line',
  });

  return useMemo(
    () =>
      handleDailyViewDataCallback(dailyViewData.flat(), { startDate, endDate }),
    [JSON.stringify(dailyViewData)],
  );
};

export const useAveragePerformanceFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: performanceData } = useGetPerformanceData({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const averagePerformanceDataCallback = formatToApexChart(
    handleAveragePerformanceData,
    {
      name: '평균성과',
      type: 'line',
    },
  );

  return useMemo(
    () =>
      averagePerformanceDataCallback(performanceData, {
        startDate,
        endDate,
      }),
    [JSON.stringify(performanceData)],
  );
};

export const useScopePerformanceFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: performanceData } = useGetPerformanceData({
    keyword,
    relword,
  });

  // console.log(performanceData);

  const startDate = useStartDate();
  const endDate = useEndDate();

  const scopePerformanceDataCallback = formatToApexChart(
    handleScopePerformanceData,
    {
      name: '범위성과',
      type: 'rangeArea',
    },
  );

  return useMemo(
    () =>
      scopePerformanceDataCallback(performanceData, {
        startDate,
        endDate,
      }),
    [JSON.stringify(performanceData)],
  );
};
// export const useExpectedViewChartDataForNivo = (
//   {
//     keyword,
//     relword,
//   }: {
//     keyword: string | null;
//     relword: string | null;
//   },
//   title: string,
// ) => {
//   const { data: expectedViewData } = useGetExpectedView({ keyword, relword });

//   const startDate = useStartDate();
//   const endDate = useEndDate();

//   return useMemo(
//     () =>
//       formatToLineGraph(
//         expectedViews(expectedViewData, { startDate, endDate }),
//         title,
//       ),
//     [JSON.stringify(expectedViewData)],
//   );
// };
