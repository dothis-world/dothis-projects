import Image from 'next/image';
import { useEffect, useState } from 'react';

import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetAnalysisChannel from '@/hooks/react-query/query/useGetAnalysisChannel';
import useGetChannelContentsList from '@/hooks/react-query/query/useGetChannelContentsList';

import GNBSearchbar from '../../GNBSearchbar';
import ContentCard from './ContentCard';
import SearchFilterDropdown from './SearchFilterDropdown';
import { useVideoFilterContext } from './VideoFilterContext';
import VideoSearchbar from './VideoSearchbar';
import { useVideoUseTextContext } from './VideoUseTextContext';
import { useVideoUseTextFilterContext } from './VideoUseTextFilterContext';
import VideoUseTextList from './VideoUseTextList';

const ContentComparison = () => {
  const { data } = useGetAnalysisChannel();

  const { datePeriodFilter, videoSortOption } =
    useVideoFilterContext('ContentComparison');

  const [initKeywordCountTrigger, setInitKeywordCountTrigger] = useState(false);
  useEffect(
    // Filter 방식이 바뀌어서 Channel Content api 재호출할때 Channel Content data로 누적한 VideoUseTextCount의 값이 누적이 되는 현상이 발생하여 -> 초기화 코드 추가
    // 분석채널이 추가될 때도 초기화를 할 필요가 있음
    () => {
      setKeywordsCounts(null);
      setInitKeywordCountTrigger((prev) => !prev);
      // console.log('초기화');
      //초기화 시 실행 useEffect의 실행순서에 따른 문제가 발생하므로, trigger State 분리해서 임의로 부여해야한다
      // useEffect 자식 -> 부모로 진행되므로
    },
    [JSON.stringify(datePeriodFilter), JSON.stringify(videoSortOption)],
  );

  const { keywordsCounts, topKeywords, setKeywordsCounts, setTopKeywords } =
    useVideoUseTextContext('ContentComparison');

  useEffect(() => {
    if (!keywordsCounts) return;
    const sortedKeywords = Object.entries(keywordsCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([keyword]) => keyword);

    setTopKeywords(sortedKeywords);
  }, [JSON.stringify(keywordsCounts)]);

  const { searchKeyword, setFilterKeywords, setSearchKeyword } =
    useVideoUseTextFilterContext('ContentComparison');

  useEffect(() => {
    if (!topKeywords) return;

    setFilterKeywords(topKeywords);
  }, [JSON.stringify(topKeywords)]);

  const compactNumber = new Intl.NumberFormat('ko', {
    notation: 'compact',
  });

  return (
    <>
      <div className="mb-5 flex items-center gap-[20px]">
        <VideoSearchbar
          callback={(word) => {
            setSearchKeyword(word.selectedWord);
          }}
        />
        <SearchFilterDropdown />

        <VideoUseTextList />
      </div>
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
          <ContentCard
            channelId={item.channelId}
            index={index}
            initKeywordCountTrigger={initKeywordCountTrigger}
          />
        </div>
      ))}
    </>
  );
};

export default ContentComparison;
