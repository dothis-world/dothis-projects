import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetChannelContentsList from '@/hooks/react-query/query/useGetChannelContentsList';

interface Props {
  channelId: string;
  index: number;
}

const ContentCard = ({ channelId, index }: Props) => {
  const { data } = useGetChannelContentsList({ channelId });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      // deltaY 값을 기준으로 가로로 스크롤
      e.stopPropagation();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // useEffect로 passive:false 설정
  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    // cleanup function
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div
      className="gap-30 custom-scroll-x-box flex  overflow-x-scroll"
      ref={scrollRef}
      // onWheel={(event) => handleWheel(event)}
    >
      {data?.map((item, index) => {
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
    </div>
  );
};

export default ContentCard;
