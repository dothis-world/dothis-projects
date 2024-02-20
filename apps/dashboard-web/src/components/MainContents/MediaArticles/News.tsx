import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import ParserContent from '@/components/common/ParserContent';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import SummaryCard from './SummaryCard';

const News = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetNewsInfiniteQuery();

  const onChange = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const dataObj = scrollData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const returnData = dataObj?.map((item) => {
    return {
      title: item.title,
      category: item.category[0],
      provider: item.provider,
      date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
      image: externaImageLoader(getMainImage(item.images)),
      link: item.provider_link_page,
      hilight: item.hilight,
    };
  });

  /**
   * @mediaDataList returnData로 포맷팅을 변환한 Object[] -> 페이지네이션에 맞게끔 포맷팅을 변경합니다! (ex)[Array(5),Array(5),Array(5),Array(5),Array(5)]
   * @jsx 밑에 jsx는 mediaDataList를 이용해서 prop으로 전달하도록 수정하였습니다.
   * const mediaDataList = useMemo(() => {
    return returnData?.reduce(
      (
        result: (typeof returnData)[],
        item: (typeof returnData)[0],
        index: number,
      ) => {
        const chunkIndex: number = Math.floor(index / 5);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }

        result[chunkIndex].push(item);
        return result;
      },
      [],
    );
  }, [data]);
   */

  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        {/* <CurrentArticle.skeleton /> */}
        <ArticleList.skeleton />
      </div>
    );
  }

  if (returnData?.length === 0 || !returnData) {
    return (
      <div className="mt-10 flex flex-wrap gap-[1.25rem]">
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          해당 키워드에 대한 뉴스기사가 없습니다
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 flex  gap-[1.25rem] ">
        <div className="flex-1 ">
          <ArticleList
            articleListData={returnData}
            handleSetContentIndex={handleSetContentIndex}
            onChange={onChange}
          />
        </div>
      </div>
      {/* <SummaryCard title="뉴스 요약">
        <ParserContent content={returnData[contentIndex]?.hilight} />
      </SummaryCard> */}
    </>
  );
};

export default News;
