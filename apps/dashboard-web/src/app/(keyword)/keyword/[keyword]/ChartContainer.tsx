'use client';

import D3Axis from '@/components/common/Charts/D3Axis';
import APIErrorBoundary from '@/components/common/Error/APIErrorBoundary';
import APILoadingBoundary from '@/components/common/Error/APILoadingBoundary';
import useGetDailyExpectedView from '@/hooks/react-query/query/useGetDailyExpectedView';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetDailyViewV2 from '@/hooks/react-query/query/useGetDailyViewV2';
import useGetNaverSearchRatio from '@/hooks/react-query/query/useGetNaverSearchRatio';
import useGetVideoUploadCount from '@/hooks/react-query/query/useGetVideoUploadCount';

import ChartSummaryCards from './ChartSummaryCards';

const ChartContainer = ({
  keyword,
  relatedKeyword,
  expectedViews,
}: {
  keyword: string;
  relatedKeyword: string | null;
  expectedViews?: boolean;
}) => {
  const dailyVeiwEnabled = !expectedViews;

  const dailyViewWithExpectedViewEnabled = expectedViews;
  const {
    isLoading: dailyViewLoading,
    isError: dailyViewError,
    isFetching: dailyViewFeching,
    refetch: dailViewRefetch,
  } = useGetDailyViewV2(
    {
      keyword: keyword,
      relword: relatedKeyword,
    },
    { enabled: dailyVeiwEnabled },
  );

  // 해당 부분을 사용하는 Page에 맞는 query를 삽입 (여기는 Combine)
  const {
    isLoading: viewsLoading,
    isError: viewsError,
    isFetching: viewFeching,
    refetch: viewsRefetch,
  } = useGetDailyExpectedView(
    {
      baseKeyword: keyword,
      relatedKeyword: relatedKeyword,
    },
    { enabled: dailyViewWithExpectedViewEnabled },
  );

  const {
    isLoading: naverSearchLoading,
    isError: naverSearchError,
    refetch: naverSearchRefetch,
  } = useGetNaverSearchRatio({
    keyword: keyword,
    relword: relatedKeyword,
  });

  // const {
  //   isLoading: videoLoading,
  //   isError: videoError,
  //   refetch: videoRefetch,
  // } = useGetVideoUploadCount({
  //   keyword: keyword,
  //   relword: relatedKeyword,
  // });

  const refetchCallback = () => {
    if (dailyViewError) dailViewRefetch();
    if (viewsError) viewsRefetch();
    if (naverSearchError) naverSearchRefetch();
    // if (videoError) videoRefetch();
  };

  // if (errorCount > 3 && (dailyViewError || naverSearchError || videoError)) {
  //   return (
  //     <div className="flex flex-1 items-center justify-center text-center text-[20px] font-bold">
  //       <h2>
  //         데이터를 불러오는 데 문제가 발생했습니다.
  //         <br />
  //         빠른 시일에 문제를 해결하도록 하겠습니다.
  //         <br />
  //         이용에 불편을 드려 죄송합니다.
  //       </h2>
  //     </div>
  //   );
  // }

  // if (dailyViewError || naverSearchError || videoError) {
  //   return <ApiErrorComponent refetch={refetchCallback} />;
  // }

  // if (dailyViewLoading || naverSearchLoading || videoLoading) {
  //   return (
  //     <BoxLoadingComponent
  //       classname={cn('absolute top-0 right-3 w-[80px] h-[80px]')}
  //     />
  //   );
  // }

  return (
    <>
      <APIErrorBoundary
        hasError={dailyViewError || viewsError || naverSearchError}
        refetchCallback={refetchCallback}
        baseKeyword={keyword}
        relatedKeyword={relatedKeyword}
      >
        <APILoadingBoundary
          isLoading={viewFeching || dailyViewFeching || naverSearchLoading}
        >
          <ChartSummaryCards
            keyword={keyword}
            relatedKeyword={relatedKeyword}
            expectedViews={expectedViews}
          />
          <D3Axis
            keyword={keyword}
            relatedKeyword={relatedKeyword}
            expectedViews={expectedViews}
          />
        </APILoadingBoundary>
      </APIErrorBoundary>
    </>
  );
};

export default ChartContainer;
