import { useMemo } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import {
  formatToApexChart,
  handleAveragePerformanceData,
  sumViews,
} from '@/utils/contents/dailyview';

import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetExpectedView from '../react-query/query/useGetExpectedView';

export const useDashboardDaily = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  title: string,
) => {
  const { data: dailyViewData } = useGetDailyView({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const test = formatToApexChart(sumViews, {
    name: '평균성과',
    type: 'line',
  });

  return useMemo(
    () => test(dailyViewData.flat(), { startDate, endDate }),
    [JSON.stringify(dailyViewData)],
  );
};

export const useAveragePerformance = () => {};

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
