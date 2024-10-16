import dayjs from 'dayjs';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetChannelContentsList from '@/hooks/react-query/query/useGetChannelContentsList';

interface Props {
  channelId: string;
  index: number;
}

const ContentCard = ({ channelId, index }: Props) => {
  const { data } = useGetChannelContentsList({ channelId });

  console.log(data);
  return (
    <div className="gap-30 custom-scroll-x-box flex overflow-scroll">
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
