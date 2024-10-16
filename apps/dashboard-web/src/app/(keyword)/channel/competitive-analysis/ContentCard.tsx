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
    <div>
      {[
        {
          element: '조회수 1185만',
          image: 'https://img.youtube.com/vi/lzm-7YfBJBU/0.jpg',
          link: 'lzm-7YfBJBU',
          provider: 'FIFTY FIFTY Official',
          title: 'FIFTY FIFTY (피프티피프티) ‘Starry Night’ Official MV',
          uploadDate: '2024-08-28T15:00:00.000Z',
        },
      ].map((mediaData, index) => (
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
      ))}
    </div>
  );
};

export default ContentCard;
