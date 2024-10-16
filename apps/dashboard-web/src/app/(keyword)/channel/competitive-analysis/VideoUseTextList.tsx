import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

import { useVideoUseTextContext } from './VideoUseTextContext';
import { useVideoUseTextFilterContext } from './VideoUseTextFilterContext';

const VideoUseTextList = () => {
  const { keywordsCounts, topKeywords } =
    useVideoUseTextContext('VideoUseTextList');

  const { searchKeyword, filterKeywords, setFilterKeywords, setSearchKeyword } =
    useVideoUseTextFilterContext('VideoUseTextList');

  const handleFilterKeyword = (keyword: string) => {
    if (filterKeywords?.includes(keyword)) {
      setFilterKeywords((prev) => {
        const updatedKeywords = prev ?? []; // prev가 null이면 빈 배열로 설정
        return updatedKeywords.filter((item) => item !== keyword);
      });
    } else {
      setFilterKeywords((prev) => {
        const updatedKeywords = prev ?? []; // prev가 null이면 빈 배열로 설정

        return [...updatedKeywords, keyword];
      });
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      // deltaY 값을 기준으로 가로로 스크롤
      e.stopPropagation();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    // 초기 스크롤 상태 확인

    // cleanup function
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="border-grey400 rounded-10  ml-auto flex items-center overflow-hidden whitespace-nowrap border px-[20px] py-[8px]">
      <p className="text-grey600 mr-[10px] text-[14px] font-[500]">
        주요 키워드
      </p>

      <div
        className="custom-scroll-x-box  flex items-center gap-[20px] overflow-x-scroll scroll-smooth"
        ref={scrollRef}
      >
        {topKeywords?.map((item) => (
          <div
            className={cn(
              'border-grey500 rounded-8 text-grey600 border px-[20px] py-[8px] font-[400] cursor-pointer transition-all duration-300',
              {
                'bg-primary50 text-primary500 border-primary500':
                  filterKeywords?.includes(item) && !searchKeyword,
              },
            )}
            key={item}
            onClick={() => handleFilterKeyword(item)}
          >
            {`${item} (${keywordsCounts?.[item] ?? 0})`}
          </div>
        ))}

        {searchKeyword && (
          <div
            className={cn(
              'border-grey500 rounded-8 text-grey600 border px-[20px] py-[8px] font-[400] cursor-pointer transition-all duration-300',
              {
                'bg-primary50 text-primary500 border-primary500': searchKeyword,
              },
            )}
            key={searchKeyword}
            onClick={() => setSearchKeyword(null)}
          >
            {`${searchKeyword}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUseTextList;
