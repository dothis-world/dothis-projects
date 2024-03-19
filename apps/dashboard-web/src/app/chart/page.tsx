'use client';

import { useEffect } from 'react';

import DashboardAreaChart from '@/components/common/Charts/DashboardAreaChart';
import DashboardLineChart from '@/components/common/Charts/DashboardLineChart';
import {
  useAveragePerformanceFormatter,
  useDailyViewDataFormatter,
  useScopePerformanceFormatter,
} from '@/hooks/contents/useChartFormatter';
import { useIsSignedIn } from '@/store/authStore';

const Page = () => {
  const dailyView = useDailyViewDataFormatter({
    keyword: '서울',
    relword: '정치',
  });

  const scopePerformance = useScopePerformanceFormatter({
    keyword: '서울',
    relword: '정치',
  });

  // console.log(scopeData);

  const averagePerformance = useAveragePerformanceFormatter({
    keyword: '서울',
    relword: '정치',
  });

  return (
    <div className="ml-10">
      차트 확인용
      <DashboardAreaChart
        series={[{ ...scopePerformance }, { ...averagePerformance }]}
      />
      <DashboardLineChart series={[{ ...dailyView }]} />
    </div>
  );
};

export default Page;
