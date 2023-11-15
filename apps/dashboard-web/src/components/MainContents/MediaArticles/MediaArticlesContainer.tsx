'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { MedialTabNavDataCategoryType } from '@/app/(main)/contents/page';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import {
  externaImageLoader,
  externalYouTubeImageLoader,
  getMainImage,
} from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import type { CurrentArticleProps } from './CurrentArticle';
import CurrentArticle from './CurrentArticle';

interface MainContentContainerProps {
  articleListData: CurrentArticleProps[];
  selectedArticle: MedialTabNavDataCategoryType;
}

const MediaArticlesContainer = ({
  articleListData,
  selectedArticle,
}: MainContentContainerProps) => {
  const [pageIndex, setPageIndex] = useState(4);

  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetVideoData();

  return (
    <div className="mt-10 flex gap-[1.25rem]">
      {selectedArticle === 'news' ? (
        <>
          <CurrentArticle
            title={articleListData[contentIndex].title}
            category={articleListData[contentIndex].category}
            provider={articleListData[contentIndex].provider}
            date={articleListData[contentIndex].date}
            image={articleListData[contentIndex].image}
            link={articleListData[contentIndex].link}
          />
          <ArticleList
            articleListData={articleListData}
            handleSetContentIndex={handleSetContentIndex}
          />
        </>
      ) : !isLoading ? (
        <>
          <Image
            src={externalYouTubeImageLoader(
              data[pageIndex]?.data[contentIndex]._source.video_id,
            )}
            width={640}
            height={300}
            alt="Picture of the author"
            style={{ objectFit: 'cover', layout: 'fill' }}
          />
        </>
      ) : (
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          서비스 준비중 입니다.
        </p>
      )}
    </div>
  );
};

export default MediaArticlesContainer;
