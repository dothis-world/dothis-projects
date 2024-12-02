'use client';

import dayjs from 'dayjs';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetCategoryVideo from '@/hooks/react-query/query/useGetCategoryVideo';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';
import type { MediaProps } from '@/utils/media/mediaFormat';

interface Video {
  videoId: string;
  videoViews: number;
  videoTitle: string;
  videoPublished: string;
  avgViews: string;
  channelName: string;
}
export const formatYoutubeForMediaProps = (data: Video): MediaProps => {
  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  const uploadDate = data.videoPublished
    ? dayjs(data.videoPublished).format('YYYY-MM-DD')
    : data.videoPublished;
  return {
    title: data.videoTitle,
    provider: data.channelName,
    element: `조회수 ${compactNumber.format(data.videoViews)}`,
    uploadDate: uploadDate,
    image: externalYouTubeImageLoader(data.videoId),
    link: data.videoId,
  };
};

const BestVideoList = ({ categoryNumbers }: { categoryNumbers: number[] }) => {
  const startDate = useStartDate();
  const endDate = useEndDate();

  const { data } = useGetCategoryVideo({
    categoryNumbers: categoryNumbers,
    limit: 4,
    startDate,
    endDate,
  });

  console.log(data);

  return (
    <div className="flex justify-between gap-[20px] ">
      {data?.data.data?.map((item, index, array) => {
        const mediaData = formatYoutubeForMediaProps(item);
        return (
          <SelectedMediaCard
            key={mediaData.title + index}
            mediaType={'youtube'}
            title={mediaData.title}
            provider={mediaData.provider}
            element={mediaData.element}
            uploadDate={mediaData.uploadDate}
            image={mediaData.image}
            link={mediaData.link}
          />
        );
      })}

      {Array.from({
        length: Math.max(0, 4 - (data?.data.data.length || 0)),
      }).map((_, i) => (
        <SelectedMediaCard.skeleton key={i} />
      ))}
    </div>
  );
};

export default BestVideoList;
