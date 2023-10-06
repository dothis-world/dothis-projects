import ContentTopic from '@/features/chart/ContentTopic';
import SocialMedia from '@/features/chart/SocialMedia';

const ChartPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <ContentTopic />
      <SocialMedia searchParams={searchParams} />
    </>
  );
};

export default ChartPage;
