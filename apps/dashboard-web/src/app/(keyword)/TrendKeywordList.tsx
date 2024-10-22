'use client';

import type { Route } from 'next';
import Link from 'next/link';

import { LandingButton } from '@/components/MainContents/KeywordSearch/style';
import useGetWeeklyTrendKeyword from '@/hooks/react-query/query/useGetWeeklyTrendKeyword';

const TrendKeywordList = () => {
  const { data } = useGetWeeklyTrendKeyword({ limit: 16 });

  return (
    <div className="flex flex-wrap justify-between gap-x-[30px] gap-y-[20px]">
      {data?.map((item, index) => (
        <Link
          href={`/keyword/${item.recommendedKeyword}` as Route}
          key={item.recommendedKeyword}
        >
          <LandingButton
            key={item.recommendedKeyword}
            $active={index % 2 === 1 ? true : false}
            className="cursor-pointer"
          >
            {item.recommendedKeyword}

            {/* 여기서 X버튼으로 delete시 modal을 하나 생성하고 지우는게 좋을 듯 싶다. */}
          </LandingButton>
        </Link>
      ))}
    </div>
  );
};

export default TrendKeywordList;
