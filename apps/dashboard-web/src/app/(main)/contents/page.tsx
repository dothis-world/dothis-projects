import TabNavigation from '@/components/common/TabNavigation';
import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import KeywordAnalyticsView from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
import MediaArticlesContainer from '@/components/MainContents/MediaArticles/MediaArticlesContainer';
import MonthlyViewData from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';
import { MEDIA_TABNAV_DATA } from '@/constants/TabNav';
import relatedContentApi from '@/utils/api/mediaApis';

const MainContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle =
    (searchParams?.tab as (typeof MEDIA_TABNAV_DATA)[number]['category']) ||
    'youtube';
  const articleListData = await relatedContentApi[selectedArticle](
    '아시안게임',
  );

  const selectedMainContent = searchParams?.main || 'recomand';

  if (selectedMainContent === 'recomand') {
    return (
      <>
        <Card>
          <CardHeader title="콘텐츠 소재" />
          <div className="flex">
            <KeywordRankingList />

            <KeywordAnalyticsView />
          </div>
        </Card>
        <Card>
          <CardHeader title="월간 콘텐츠 리포트" />
          <MonthlyViewData />
        </Card>
        <Card>
          <TabNavigation
            selectedArticle={selectedArticle}
            tabNavData={MEDIA_TABNAV_DATA}
          />
          <MediaArticlesContainer
            articleListData={articleListData}
            selectedArticle={selectedArticle}
          />
        </Card>
      </>
    );
  }
  return (
    <>
      <div className="mx-[3rem] mb-[30px]">전체탭</div>
    </>
  );
};

export default MainContentPage;
