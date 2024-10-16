import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetChannelContentsList from '@/hooks/react-query/query/useGetChannelContentsList';
import { cn } from '@/utils/cn';

import { useVideoFilterContext } from './VideoFilterContext';
import { useVideoUseTextContext } from './VideoUseTextContext';
import { useVideoUseTextFilterContext } from './VideoUseTextFilterContext';

interface Props {
  channelId: string;
  index: number;
  initKeywordCountTrigger: boolean;
}

const ContentCard = ({ channelId, index, initKeywordCountTrigger }: Props) => {
  const { datePeriodFilter, videoSortOption } =
    useVideoFilterContext('ContentCard');

  const { data: videos } = useGetChannelContentsList({
    channelId,
    order: videoSortOption.value.order,
    sort: videoSortOption.value.sort,
    startDate: datePeriodFilter.value,
  });

  const { searchKeyword, filterKeywords } =
    useVideoUseTextFilterContext('ContentCard');

  const scrollRef = useRef<HTMLDivElement>(null);

  const [hasLeftScroll, setHasLeftScroll] = useState(false);
  const [hasRightScroll, setHasRightScroll] = useState(false);

  const { keywordsCounts, setKeywordsCounts, setTopKeywords } =
    useVideoUseTextContext('ContentCard');

  const handleWheel = (e: WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      // deltaY 값을 기준으로 가로로 스크롤
      e.stopPropagation();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    if (!videos) return; // videos가 없으면 초기화 방지

    // 비디오에서 키워드를 카운트할 객체
    const counts: Record<string, number> = {};

    videos.forEach((video) => {
      video.videoUseText.forEach((keyword) => {
        counts[keyword] = (counts[keyword] || 0) + 1; // 새 키워드 카운트
      });
    });

    // 기존의 keywordCounts 가져오기
    setKeywordsCounts((prevCounts) => {
      // 기존 카운트를 병합
      const updatedCounts = { ...prevCounts };

      Object.entries(counts).forEach(([keyword, count]) => {
        updatedCounts[keyword] = (updatedCounts[keyword] || 0) + count; // 중복 카운트 추가
      });

      return updatedCounts; // 업데이트된 카운트를 반환
    });

    // 상위 6개 키워드 추출
  }, [JSON.stringify(videos), initKeywordCountTrigger]);

  // 스크롤 상태 확인
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setHasLeftScroll(scrollLeft > 0); // 왼쪽에 스크롤 가능한지 확인
      setHasRightScroll(scrollLeft < scrollWidth - clientWidth); // 오른쪽에 스크롤 가능한지 확인
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
      currentRef.addEventListener('scroll', checkScroll); // 스크롤 상태 확인
    }

    // 초기 스크롤 상태 확인
    checkScroll();

    // cleanup function
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
        currentRef.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);
  return (
    <div
      className={cn(
        'gap-30 custom-scroll-x-box flex overflow-x-scroll overflow-y-hidden boxboxbox min-h-[300px]',
      )}
      style={{
        position: 'relative', // 그림자 효과를 위해 position 설정
      }}
      ref={scrollRef}
      // onWheel={(event) => handleWheel(event)}
    >
      {videos
        ?.filter((item) => {
          // searchKeyword가 존재하는 경우
          if (searchKeyword) {
            return item.videoUseText.includes(searchKeyword);
          }

          // searchKeyword가 없으면 filterKeywords로 필터링
          return (
            filterKeywords?.length === 0 || // 필터 키워드가 없으면 모든 비디오를 표시
            filterKeywords?.some((keyword) =>
              item.videoUseText.includes(keyword),
            ) // 필터 키워드 중 하나라도 videoUseText에 포함된 경우
          );
        })
        .map((item, index) => {
          const compactNumber = new Intl.NumberFormat('ko', {
            notation: 'compact',
          });
          const videoViews = compactNumber.format(item.videoViews);

          const uploadDate = dayjs(item.videoPublished).format('YYYY-MM-DD');
          return (
            <SelectedMediaCard
              key={item.videoId}
              image={`https://img.youtube.com/vi/${item.videoId}/0.jpg`}
              link={item.videoId}
              provider={'채널이름'}
              title={item.videoTitle}
              element={`조회수 ${videoViews}`}
              uploadDate={uploadDate}
              isShrink={true}
            />
          );
        })}

      {/* 그림자 요소를 위한 div 추가 */}
      {hasLeftScroll && <div className="shadow-left" />}
      {hasRightScroll && <div className="shadow-right" />}
    </div>
  );
};

export default ContentCard;
