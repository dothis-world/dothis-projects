'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import type { TKeywords } from '@/types/common';
import { cn } from '@/utils/cn';

import ComparisonSummaryCard from './ComparisonSummaryCard';
import { useSelectedKeywordContext } from './SelectedKeywordProvider';

const ComparisonSummary = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  const selectSize = 3;

  const { data, isLoading, isError, refetch } =
    useGetRankingRelWords(baseKeyword);

  //   const relatedKeywordList = data?.slice(0, 10);
  const { relatedKeywordList, setRelatedKeywordList } =
    useSelectedKeywordContext('RelatedKeywordList');

  const sortedRelatedKeywordList = relatedKeywordList.sort((a, b) => {
    if (!data || data.indexOf(a) === data.indexOf(b)) {
      return 0;
    }

    // nulls sort after anything else
    if (data.indexOf(a) === -1) {
      return 1;
    }
    if (data.indexOf(b) === -1) {
      return -1;
    }

    return data.indexOf(a) < data.indexOf(b) ? -1 : 1;
  });

  const selectedListcolors = ['green', 'blue'];

  return (
    <div className="border-grey200 grid  grid-rows-[56px_repeat(3,74px)] border-b-2">
      <div className="text-grey500 border-grey400 grid grid-cols-[40px_minmax(180px,1fr)_repeat(2,110px)_repeat(3,100px)_minmax(140px,1fr)] items-center gap-[10px] border-b-2 text-center text-[14px] font-[500]">
        <p>No.</p>
        <p>소재</p>
        <p>기대조회 수</p>
        <p>일일조회 수</p>
        <p>영상 수</p>
        <p>검색량 변화</p>
        <p>경쟁 강도</p>
      </div>

      {sortedRelatedKeywordList.map((item, index) => {
        const color =
          item === relatedKeyword
            ? 'red'
            : selectedListcolors.length > 0
            ? (selectedListcolors.shift() as 'blue' | 'green') // Assuming the other colors are blue and green
            : 'blue';

        return (
          <ComparisonSummaryCard
            baseKeyword={baseKeyword}
            relatedKeyword={item}
            rank={
              data?.indexOf(item) !== -1
                ? data?.indexOf(item)
                  ? data?.indexOf(item) + 1
                  : 1
                : '-'
            }
            color={color}
            index={index}
            selectSize={selectSize}
            key={index}
          />
        );
      })}

      {sortedRelatedKeywordList.length < selectSize && (
        <div
          className={cn(
            'text-grey900 border-grey200  grid items-center border-b-2 pl-[50px] text-[14px] font-[500]',
            {
              'border-0': sortedRelatedKeywordList.length > selectSize - 2,
            },
          )}
        >
          키워드를 선택해주세요
        </div>
      )}
    </div>
  );
};

export default ComparisonSummary;
