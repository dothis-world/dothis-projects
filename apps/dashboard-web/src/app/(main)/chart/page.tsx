import ChartSidebar from '@/components/Chart/ChartSidebar/ChartSidebar';
import DashBoard from '@/components/Chart/DashBoard/DashBoard';
import ContentCard from '@/components/common/ContentCard';
import ContentHeader from '@/components/common/ContentHeader';

const ChartPage = () => {
  return (
    <ContentCard className="mb-[2.25rem]">
      <ContentHeader title="콘텐츠 소재"></ContentHeader>
      <div className="flex">
        <ChartSidebar />
        <DashBoard />
      </div>
    </ContentCard>
  );
};

export default ChartPage;
