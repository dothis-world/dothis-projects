'use client';

import { useDashboardDaily } from '@/hooks/contents/useDashboard';

type DataObject = Extract<
  ApexAxisChartSeries[number]['data'][number],
  { x: any; y: any }
>;

const Page = () => {
  const { data } = useDashboardDaily(
    { keyword: '서울', relword: '정치' },
    'wjd',
  );

  console.log((data.at(-1) as DataObject)?.y);

  return <div>차트 확인용 </div>;
};

export default Page;
