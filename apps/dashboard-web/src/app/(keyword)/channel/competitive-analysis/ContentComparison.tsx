import Image from 'next/image';
import { useEffect } from 'react';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetAnalysisChannel from '@/hooks/react-query/query/useGetAnalysisChannel';
import useGetChannelContentsList from '@/hooks/react-query/query/useGetChannelContentsList';

import ContentCard from './ContentCard';
import { useVideoUseTextContext } from './VideoUseTextContext';

const ContentComparison = () => {
  const { data } = useGetAnalysisChannel();

  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  const { keywordsCounts, topKeywords, setTopKeywords } =
    useVideoUseTextContext('ContentComparison');

  useEffect(() => {
    if (!keywordsCounts) return;
    const sortedKeywords = Object.entries(keywordsCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([keyword]) => keyword);

    setTopKeywords(sortedKeywords);
  }, [JSON.stringify(keywordsCounts)]);

  return (
    <>
      {data?.map((item, index) => (
        <div
          className="rounded-10 border-grey400 mb-5 flex gap-[10px] border p-5"
          key={item.channelId + index}
        >
          <div className="flex flex-col justify-evenly">
            <div className="mb-10 flex items-center gap-[16px] ">
              {item.channelThumbnail ? (
                <Image
                  src={item.channelThumbnail}
                  width={100}
                  height={100}
                  alt={item.channelId}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-sky h-10 w-10 rounded-full"></div>
              )}

              <p className="text-grey900 flex-1 text-center font-bold">
                {item.channelName}
              </p>
            </div>
            <div className="flex text-center">
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  구독자 수
                </p>
                <p className="text-grey900 font-bold">
                  {compactNumber.format(item.channelSubscribers)}
                </p>
              </div>

              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  평균 조회수
                </p>
                <p className="text-grey900 font-bold">
                  {item.channelAverageViews.toLocaleString('ko-kr')}
                </p>
              </div>
              <div className="w-[100px]">
                <p className="text-grey400 mb-[10px] text-[14px] font-[400]">
                  영상 수
                </p>
                <p className="text-grey900 font-bold">{'3,456'}</p>
              </div>
            </div>
          </div>
          <ContentCard channelId={item.channelId} index={index} />
        </div>
      ))}
    </>
  );
};

export default ContentComparison;
